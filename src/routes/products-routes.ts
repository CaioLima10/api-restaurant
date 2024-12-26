import { ProductsController } from "@/controllers/products-controller";
import { Router } from "express";

const ProductsRoutes = Router()

const productsController = new ProductsController()

ProductsRoutes.get("/", productsController.index)
ProductsRoutes.post("/", productsController.create)
ProductsRoutes.put("/:id", productsController.update)
ProductsRoutes.delete("/:id", productsController.remove)

export { ProductsRoutes }