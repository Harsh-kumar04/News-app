import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./modules/v1/auth/routes/routes.js";
import cityRoutes from "./modules/v1/city/routes/routes.js";
import newsRoutes from "./modules/v1/news/routes/newsroutes.js";
import likeRoutes from "./modules/v1/like/routes/routes.js";
import commentRoutes from "./modules/v1/comment/routes/routes.js";
import profileRoutes from "./modules/v1/profile/routes/profileroutes.js";
import reportRoutes from "./modules/v1/Reporter/routes/routes.js";
import db from "./modules/v1/auth/model/index.js";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
// import { setupSwagger } from "./swagger.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", userRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/news", newsRoutes);
app.use("/api", likeRoutes);
app.use("/api", commentRoutes);
app.use("/api/", profileRoutes);
app.use("/api/", reportRoutes);

// Swagger UI setup
const swaggerPath = path.resolve("document/v1/swagger.json");
let swaggerSpec = {};
try {
  swaggerSpec = JSON.parse(fs.readFileSync(swaggerPath, "utf8"));
} catch (err) {
  console.error("Error loading swagger.json:", err.message);
  swaggerSpec = {
    openapi: "3.0.0",
    info: {
      title: "Swagger Error",
      version: "1.0.0",
      description: err.message,
    },
    paths: {},
  };
}
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

console.log("Swagger UI available at http://localhost:5000/api-docs");
// DB sync and server start
const PORT = process.env.PORT || 5001;

db.sequelize
  .sync() // safe sync
  .then(() => {
    console.log("✅ All tables ready");

    app.listen(PORT, async () => {
      console.log(`Server running on port ${PORT}`);

      try {
        await db.sequelize.authenticate();
        console.log("Database connected successfully!");
      } catch (err) {
        console.error("Unable to connect to DB:", err);
      }
    });
  })
  .catch((err) => console.error("DB sync error:", err));
