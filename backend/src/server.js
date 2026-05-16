const app = require("./app");
const { connectRabbitMQ } = require("./queue/rabbitmq");
const { connectRedis } = require("./services/cacheService");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`H-News API is running on port ${port}`);
  connectRabbitMQ();
  connectRedis();
});
