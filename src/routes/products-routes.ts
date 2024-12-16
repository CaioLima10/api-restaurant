import { ProductsController } from "@/controllers/products-controller";
import { Router } from "express";

const ProductsRoutes = Router()

const productsControler = new ProductsController()

ProductsRoutes.get("/", productsControler.index)

export { ProductsRoutes }