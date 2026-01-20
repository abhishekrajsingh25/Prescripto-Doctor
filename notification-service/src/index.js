import dotenv from "dotenv";
dotenv.config(); // MUST be first

import express from "express";
import cors from "cors";

import connectDB from "./config/mongodb.js";
import Notification from "./models/notificationModel.js";
import { sendEmail } from "./services/emailService.js";

import { appointmentBookedEmail } from "./emails/appointmentBooked.js";
import { appointmentCancelledEmail } from "./emails/appointmentCancelled.js";
import { paymentSuccessEmail } from "./emails/paymentSuccess.js";

import { retryFailedEmails } from "./workers/emailRetryWorker.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Notification Service Running");
});

// Event receiver
app.post("/events", async (req, res) => {
  try {
    const { eventType, entityId, userId, doctorId, payload } = req.body;

    if (!eventType) {
      return res
        .status(400)
        .json({ success: false, message: "eventType is required" });
    }

    const notification = await Notification.create({
      eventType,
      entityId,
      userId,
      doctorId,
      payload,
    });

    // Appointment Booked
    if (eventType === "APPOINTMENT_BOOKED") {
      try {
        const email = appointmentBookedEmail(payload);

        await sendEmail({
          to: payload.userEmail,
          subject: email.subject,
          html: email.html,
        });

        notification.status = "SENT";
        await notification.save();
      } catch (err) {
        console.error("Booking email failed:", err.message);
        notification.status = "FAILED";
        await notification.save();
      }
    }

    // Appointment Cancelled
    if (eventType === "APPOINTMENT_CANCELLED") {
      try {
        const email = appointmentCancelledEmail(payload);

        await sendEmail({
          to: payload.userEmail,
          subject: email.subject,
          html: email.html,
        });

        notification.status = "SENT";
        await notification.save();
      } catch (err) {
        console.error("Cancel email failed:", err.message);
        notification.status = "FAILED";
        await notification.save();
      }
    }

    //Payment Done
    if (eventType === "PAYMENT_SUCCESS") {
      try {
        const email = paymentSuccessEmail(payload);

        await sendEmail({
          to: payload.userEmail,
          subject: email.subject,
          html: email.html,
        });

        notification.status = "SENT";
        await notification.save();
      } catch (err) {
        console.error("Payment email failed:", err.message);
        notification.status = "FAILED";
        await notification.save();
      }
    }

    res.json({ success: true, notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

connectDB();

setInterval(() => {
  retryFailedEmails();
}, 2 * 60 * 1000);

app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});
