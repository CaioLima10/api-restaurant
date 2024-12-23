import { AppError } from "@/utils/app-error"
import { NextFunction, Request, Response } from "express"

import z from "zod"


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

  async create(request: Request, response: Response, next: NextFunction) {
    try {

      const bodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0)
      })

      const { name, price } = bodySchema.parse(request.body)

      return response.status(201).json({ name, price })
    } catch (error) {
      next(error)
    }
  }
}

export { ProductsController }