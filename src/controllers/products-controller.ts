import { AppError } from "@/utils/app-error"
import { NextFunction, Request, Response } from "express"

import z from "zod"

import { knex } from "../knex"


// os metodos do controller
class ProductsController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {

      const productsAll = await knex<ProductRepository>("products")
        .select()
        .orderBy("name")

      return response.status(200).json(productsAll)
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

      await knex<ProductRepository>("products").insert({ name, price })

      return response.status(201).json()
    } catch (error) {
      next(error)
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z.string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "O id deve ser numero!" })
        .parse(request.params.id)

      const product = await knex<ProductRepository>("products")
        .select()
        .where({ id })
        .first()

      if (!product) {
        throw new AppError("produto não foi encontrado!")
      }

      const BodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0)
      })

      const { name, price } = BodySchema.parse(request.body)

      await knex<ProductRepository>("products")
        .update({ name, price, updated_at: knex.fn.now() })
        .where({ id })

      return response.json()

    } catch (error) {
      return next(error)
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z.string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "O id deve ser numero!" })
        .parse(request.params.id)


      const product = await knex<ProductRepository>("products")
        .select()
        .where({ id })
        .first()

      if (!product) {
        throw new AppError("id não encontrado!")
      }

      await knex<ProductRepository>("products").delete().where({ id })

      return response.json()
    } catch (error) {
      next(error)
    }
  }
}

export { ProductsController }