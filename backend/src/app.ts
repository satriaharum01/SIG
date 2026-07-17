import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(morgan("dev"));

app.get("/", (_, res) => {

    res.json({
        success: true,
        message: "Gangguan API Running"
    });

});

app.use("/api/auth", authRoutes);

export default app;