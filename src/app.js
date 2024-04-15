import express from "express";
import morgan from "morgan";
//Routes
import personaRoutes from "./routes/personas.routes";
import usuarioRoutes from "./routes/usuarios.routes";

const app = express();

//Settings
app.set("port", 4002);

//Middlewares
app.use(morgan("dev")); //morgan imprime en pantalla erorres de node
app.use(express.json()); //para que la app pueda entender y procesar json

//Routes
app.use("/api/personas", personaRoutes);
app.use("/api/usuarios", usuarioRoutes);

export default app;
