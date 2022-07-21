import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { ping } from "./endpoints/ping"
import { userRegistration } from "./endpoints/userRegistration"

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 3003, () => {
    console.log(`Server running on port ${process.env.PORT || 3003}`)
})
// Endpoint for test
app.get('/ping', ping)

// Endpoint for user registration
app.post('/users', userRegistration)