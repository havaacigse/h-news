const amqp = require("amqplib");

const rabbitMQUrl = process.env.RABBITMQ_URL || "amqp://localhost:5672";
const queueName = process.env.RABBITMQ_QUEUE || "h_news_events";

let connection = null;
let channel = null;
let isConnected = false;

async function connectRabbitMQ() {
  try {
    connection = await amqp.connect(rabbitMQUrl);
    channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    isConnected = true;

    connection.on("close", () => {
      isConnected = false;
      channel = null;
      connection = null;
      console.warn("RabbitMQ connection closed. Event publishing is disabled.");
    });

    connection.on("error", (error) => {
      isConnected = false;
      console.warn("RabbitMQ connection error:", error.message);
    });

    console.log(`RabbitMQ connected. Queue: ${queueName}`);
  } catch (error) {
    isConnected = false;
    channel = null;
    connection = null;
    console.warn(`RabbitMQ disabled: ${error.message}`);
  }
}

function publishEvent(eventType, payload = {}) {
  if (!isConnected || !channel) {
    console.warn(`RabbitMQ disabled. Event skipped: ${eventType}`);
    return;
  }

  const event = {
    eventType,
    payload,
    timestamp: new Date().toISOString()
  };

  try {
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(event)), {
      persistent: true
    });
  } catch (error) {
    console.warn(`RabbitMQ publish failed for ${eventType}:`, error.message);
  }
}

function getRabbitMQStatus() {
  return isConnected ? "enabled" : "disabled";
}

module.exports = {
  connectRabbitMQ,
  publishEvent,
  getRabbitMQStatus
};
