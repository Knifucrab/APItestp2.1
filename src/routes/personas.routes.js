import { Router } from "express";
import { methods as personaController } from "../controllers/persona.controller";
import { methods as usuarioController } from "../controllers/usuario.controller";
const router = Router();

router.get(
  "/",
  usuarioController.verificarToken,
  personaController.getPersonas
);
router.post(
  "/",
  usuarioController.verificarToken,
  personaController.addPersona
);
router.get(
  "/:id",
  usuarioController.verificarToken,
  personaController.getPersona
);
router.delete(
  "/:id",
  usuarioController.verificarToken,
  personaController.deletePersona
);
router.put(
  "/:id",
  usuarioController.verificarToken,
  personaController.updatePersona
);
router.post("/login", usuarioController.login);
router.post("/registro", usuarioController.registro);

export default router;
