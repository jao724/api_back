import { Router } from "express";
import  { authRequire }  from "../middelwares/validateToken.js";
import { createTasks, deleteTask, getTask, getTasks, upDateTask } from "../controlers/task.Controler.js";
import { validateSchema } from "../middelwares/validatorMiddelware.js";
import { taskSchema } from "../schemas/taskSchema.js";

const router = Router();

router.get('/tasks', authRequire, getTasks)

router.get('/tasks/:id', authRequire, getTask)

router.post('/tasks', authRequire, validateSchema(taskSchema), createTasks)

router.delete('/tasks/:id', authRequire, deleteTask)

router.put('/tasks/:id', authRequire, validateSchema(taskSchema), upDateTask)

export default router;