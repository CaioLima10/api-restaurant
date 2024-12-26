import { AppError } from "@/utils/app-error"
import { NextFunction, Response, Request } from "express"

import { ZodError } from "zod"

function errorHandline(error: any, request: Request, response: Response, _next: NextFunction) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message })
  }

  if (error instanceof ZodError) {
    return response.status(400).json({ message: "validation error", issues: error.format() })
  }

  return response.status(500).json({ message: error.message })
}

export { errorHandline }