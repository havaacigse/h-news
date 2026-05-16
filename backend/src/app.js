require("dotenv").config();

const express = require("express");
const cors = require("cors");
const newsRoutes = require("./routes/newsRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const offlineRoutes = require("./routes/offlineRoutes");
const { getRabbitMQStatus } = require("./queue/rabbitmq");
const { getRedisStatus } = require("./services/cacheService");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "H-News API is running",
    services: {
      rabbitmq: getRabbitMQStatus(),
      redis: getRedisStatus()
    }
  });
});

app.use("/api/news", newsRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/offline", offlineRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

module.exports = app;
