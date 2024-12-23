import express from "express"
import { errorHandline } from "./middlewares/error-handling"

import { routes } from "./routes"

const PORT = 4000
const app = express()
app.use(express.json())

app.use(errorHandline)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))  