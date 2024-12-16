import { AppError } from "@/utils/app-error"
import { NextFunction, Response, Request } from "express"

function errorHandline(error: any, request: Request, response: Response, _next: NextFunction) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message })
  }

  return response.status(500).json({ message: error.message })
}

export { errorHandline }