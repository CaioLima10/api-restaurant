import { TablesController } from "@/controllers/tables-controller";
import { Router } from "express";

const tablesRoutes = Router()

const tablesControllers = new TablesController()

tablesRoutes.get("/", tablesControllers.index)
tablesRoutes.post("/", tablesControllers.create)

export { tablesRoutes }