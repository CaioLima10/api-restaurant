import { Response, Request, NextFunction } from "express";
import { knex } from "../knex"
import z from "zod";

class TablesController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const tablesAll = await knex<TablesRepository>("tables").select().orderBy("table_number", "asc")

      return response.status(200).json(tablesAll)
    } catch (error) {
      next(error)
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {

      const bodySchema = z.object({
        table_number: z.number()
      })

      const { table_number } = bodySchema.parse(request.body)

      await knex<TablesRepository>("tables").insert({ table_number })


      return response.status(201).json()
    } catch (error) {
      next(error)
    }
  }
}

export { TablesController }