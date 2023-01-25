const express = require("express")
const path = require("path")

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

let count = 0
app.post("/increment", (req, res) => {
    let increment = isFinite(req.body.increment) ? +req.body.increment : 1
    increment = Math.max(-1000, Math.min(increment, 1000))
    count += increment
    res.send(`${count}`)
})

app.get("/count", (req, res) => {
    res.send(`${count}`)
})

const PORT = 3000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))