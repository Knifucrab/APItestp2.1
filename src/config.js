import { config } from "dotenv";

config(); //esto sirve para traer las variables de entorno que hay en el archivo .env

export default {
  host: process.env.HOST || "", // trae de .env la variable HOST
  database: process.env.DATABASE || "",
  user: process.env.USER || "",
  password: process.env.PASSWORD || "",
};
