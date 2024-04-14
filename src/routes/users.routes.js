import { Router } from "express";
import { methods as userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getUsers);
router.post("/", userController.addUser);
router.get("/:id", userController.getUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);

export default router;
