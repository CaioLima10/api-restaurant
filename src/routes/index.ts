import { Router } from "express";
import { ProductsRoutes } from "./products-routes";
import { tablesRoutes } from "./tables-routes";

const routes = Router()

routes.use("/products", ProductsRoutes)
routes.use("/tables", tablesRoutes)

export { routes }