import { Router } from "express";
import { methods as personaController } from "../controllers/persona.controller";

const router = Router();

router.get("/", personaController.getPersonas);
router.post("/", personaController.addPersona);
router.get("/:id", personaController.getPersona);
router.delete("/:id", personaController.deletePersona);
router.put("/:id", personaController.updatePersona);

export default router;
