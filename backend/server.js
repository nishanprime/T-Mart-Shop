import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoute from "./routes/userRoutes.js";
import orderRoute from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
dotenv.config();
connectDB();
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use("/api/orders", orderRoute);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoute);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(
    `Server is up and running in ${process.env.NODE_ENV}, in the port ${PORT}`
  )
);
