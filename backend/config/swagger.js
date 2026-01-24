import swaggerJsdoc from "swagger-jsdoc";

const SERVER_URL =
  process.env.SWAGGER_SERVER_URL || "http://localhost:4000";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Prescripto Doctor Appointment API",
      version: "1.0.0",
      description:
        "Doctor Appointment Booking System – Monolithic Backend API with Event-Driven Microservices",
    },
    servers: [
      {
        url: SERVER_URL,
        description:
          process.env.NODE_ENV === "production"
            ? "Production server"
            : "Local server",
      },
    ],
    components: {
      securitySchemes: {
        UserAuth: {
          type: "apiKey",
          in: "header",
          name: "token",
        },
        DoctorAuth: {
          type: "apiKey",
          in: "header",
          name: "dtoken",
        },
        AdminAuth: {
          type: "apiKey",
          in: "header",
          name: "atoken",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

export default swaggerJsdoc(swaggerOptions);
