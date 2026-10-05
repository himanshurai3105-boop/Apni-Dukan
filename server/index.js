const express = require("express")
const cors = require("cors")
const path = require("path")

require("dotenv").config()

require("./db-connect")

const Router = require("./routes")

const allowedOrigins = [
    'http://localhost:5173',
    'https://apni-dukan-2omydy8dv-himanshu1212345.vercel.app',
    process.env.CLIENT_URL
].filter(Boolean)

var corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use("/public", express.static("./public"))
app.use(express.static(path.join(__dirname, 'dist')))
app.use("/api", Router)

let port = process.env.PORT || 8000
app.listen(port, console.log(`Server is Running at http://localhost:${port}`))