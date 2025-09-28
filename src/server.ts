import http, { Server } from "http";
import app from "./app";
import dotenv from "dotenv";
import { prisma } from "./config/db";
import { seedSuperAdmin } from "./utils/seedAdmin";

dotenv.config();

let server: Server | null = null;

async function connectToDB() {
  try {
    await prisma.$connect();
    console.log("*** DB connection successfull!!");
  } catch (error) {
    console.log("*** DB connection failed!");
    process.exit(1);
  }
}

async function startServer() {
  try {
    await connectToDB();
    await seedSuperAdmin();
    server = http.createServer(app);
    server.listen(process.env.PORT, () => {
      console.log(`Yoo Server is running on port ${process.env.PORT}`);
    });

    handleProcessEvents();
  } catch (error) {
    console.error("Yoo Error during server startup:", error);
    process.exit(1);
  }
}

async function gracefulShutdown(signal: string) {
  console.warn(`🔄 Received ${signal}, shutting down gracefully...`);

  if (server) {
    server.close(async () => {
      console.log("Yoo HTTP server closed.");

      try {
        console.log("Yoo Server shutdown complete.");
      } catch (error) {
        console.error("Yoo Error during shutdown:", error);
      }

      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

function handleProcessEvents() {
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));

  process.on("uncaughtException", (error) => {
    console.error("💥 Uncaught Exception:", error);
    gracefulShutdown("uncaughtException");
  });

  process.on("unhandledRejection", (reason) => {
    console.error("💥 Unhandled Rejection:", reason);
    gracefulShutdown("unhandledRejection");
  });
}

// Start the application
startServer();
