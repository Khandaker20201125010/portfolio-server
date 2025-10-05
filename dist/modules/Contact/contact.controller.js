"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactController = void 0;
const mailer_1 = require("../../utils/mailer");
const contactController = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }
        // Prepare HTML template
        const html = `
      <h2>New Portfolio Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `;
        await (0, mailer_1.sendMail)({
            to: process.env.SMTP_FROM,
            subject: `New message from ${name}`,
            html,
        });
        return res.status(200).json({
            success: true,
            message: "Message sent successfully!",
        });
    }
    catch (error) {
        console.error("Contact form error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send message.",
        });
    }
};
exports.contactController = contactController;
