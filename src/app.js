import express from "express";
import morgan from "morgan";
//Routes
import personaRoutes from "./routes/personas.routes";

const app = express();

//Settings
app.set("port", 4000);

//Middlewares
app.use(morgan("dev")); //morgan imprime en pantalla erorres de node
app.use(express.json()); //para que la app pueda entender y procesar json

//Routes
app.use("/api/personas", personaRoutes);

export default app;
