import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

//Routes
import authRoutes from "./routes/auth.routes.js";
import galleryRoutes from './routes/gallery.routes.js';
import transaksiRoutes from './routes/transaksi.routes.js';
import userRoutes from './routes/user.routes.js';
import roleRoutes from './routes/role.routes.js';

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(morgan("dev"));

app.get("/", (_, res) => {

    res.json({
        success: true,
        message: "Gadai API Running"
    });

});

app.use("/api/auth", authRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/transaksi', transaksiRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);

export default app;