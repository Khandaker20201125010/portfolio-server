"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const seedAdmin_1 = require("./utils/seedAdmin");
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
let server = null;
async function connectToDB() {
    try {
        await db_1.prisma.$connect();
        console.log("*** DB connection successfull!!");
    }
    catch (error) {
        console.log("*** DB connection failed!");
        process.exit(1);
    }
}
async function startServer() {
    try {
        await connectToDB();
        await (0, seedAdmin_1.seedSuperAdmin)();
        server = http_1.default.createServer(app_1.default);
        server.listen(process.env.PORT, () => {
            console.log(`Yoo Server is running on port ${process.env.PORT}`);
        });
        handleProcessEvents();
    }
    catch (error) {
        console.error("Yoo Error during server startup:", error);
        process.exit(1);
    }
}
async function gracefulShutdown(signal) {
    console.warn(`🔄 Received ${signal}, shutting down gracefully...`);
    if (server) {
        server.close(async () => {
            console.log("Yoo HTTP server closed.");
            try {
                console.log("Yoo Server shutdown complete.");
            }
            catch (error) {
                console.error("Yoo Error during shutdown:", error);
            }
            process.exit(0);
        });
    }
    else {
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
