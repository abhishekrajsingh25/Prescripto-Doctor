import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import "./config/redis.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

//App Config
const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

//Middlewares
app.use(express.json());
app.use(cors());

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ INLINE Swagger (Vercel-safe)
app.get("/api-docs", (req, res) => {
  const html = swaggerUi.generateHTML(swaggerSpec, {
    explorer: true,
    swaggerOptions: { persistAuthorization: true },
  });
  res.status(200).setHeader("Content-Type", "text/html").end(html);
});

//api endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
