import axios from "axios";

const NOTIFICATION_SERVICE_URL =
  process.env.NOTIFICATION_SERVICE_URL || "http://localhost:5001";

const AUDIT_SERVICE_URL =
  process.env.AUDIT_SERVICE_URL || "http://localhost:5002";

export const publishEvent = async (eventType, data) => {
  try {
    await axios.post(`${NOTIFICATION_SERVICE_URL}/events`, {
      eventType,
      ...data,
    });

    await axios.post(`${AUDIT_SERVICE_URL}/events`, {
      eventType,
      ...data,
    });
  } catch (error) {
    console.error("Event publish failed:", error.message);
  }
};
