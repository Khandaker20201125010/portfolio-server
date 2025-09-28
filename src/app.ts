import compression from "compression";
import cors from "cors";
import express from "express";
import { AuthRoutes } from "./modules/auth/auth.routes";

const app = express();

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", AuthRoutes);
// app.use('/api/blogs', blogRoutes);
// app.use('/api/projects', projectRoutes);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/", (_req, res) => {
  res.send("API is running");
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
