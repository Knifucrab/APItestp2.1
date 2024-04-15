import { Router } from "express";
import { methods as usuarioController } from "../controllers/usuario.controller";
const router = Router();

router.post("/login", usuarioController.login);
router.post("/registro", usuarioController.registro);

export default router;
