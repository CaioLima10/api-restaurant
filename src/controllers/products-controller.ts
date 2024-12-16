import { AppError } from "@/utils/app-error"
import { NextFunction, Request, Response } from "express"


// os metodos do controller
class ProductsController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {

      throw new AppError("teste de error")

      return response.json({ message: "OK" })
    } catch (error) {
      next(error)
    }
  }
}

export { ProductsController }