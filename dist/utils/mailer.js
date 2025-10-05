"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = sendMail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // true for 465
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
async function sendMail({ to, subject, html, }) {
    try {
        const info = await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.SMTP_FROM}>`,
            to,
            subject,
            html,
        });
        console.log("✅ Email sent:", info.messageId);
        return info;
    }
    catch (err) {
        console.error("❌ Email sending error:", err);
        throw new Error("Email sending failed");
    }
}
