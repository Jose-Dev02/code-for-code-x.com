import { Router } from "express";
import { authAssistant } from "../middlewares/assistant_modify_auth";
import Assistant from "../controllers/assistant";

const router = Router();

router.post("/create-assistant", authAssistant, Assistant.createAssistant);
router.put("/update-assistant/:id", authAssistant, Assistant.updateAssistant);
router.get("/get-all-assistants", authAssistant, Assistant.getAllAssistant);
router.get("/get-assistant/:id", authAssistant, Assistant.getByIdAssistant);
router.delete("delete-assistant/:id", authAssistant, Assistant.deleteAssistant);

export default router;
