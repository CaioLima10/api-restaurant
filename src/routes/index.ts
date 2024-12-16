import { Router } from "express";
import { ProductsRoutes } from "./products-routes";

const routes = Router()

routes.use("/products", ProductsRoutes)

export { routes }