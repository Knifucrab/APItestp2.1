import { Router } from "express";
import { methods as personaController } from "../controllers/persona.controller";
import { methods as usuarioController } from "../controllers/usuario.controller";
const router = Router();

router.get(
  "/",

  personaController.getPersonas
);
router.post("/", personaController.addPersona);
router.get("/:id", personaController.getPersona);
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

export default router;
