# Server Counter

Link to demo: https://server-counter.roar123.repl.co

## Code for HTTP Server
Comments and explanations at `index.js`.
```js
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
```

## Code for Client Making Requests to HTTP Server
Comments and explanations at `/public/script.js`.

```js
document.addEventListener("DOMContentLoaded", () => {
    const incrementButton = document.getElementById("increment-button")
    const countText = document.getElementById("count-text")
    const incrementInput = document.getElementById("increment-input")

    fetch("/count", { method: "GET" })
        .then((data) => data.json())
        .then((count) => countText.innerText = count)
    
    incrementButton.addEventListener("click", async () => {
        console.log(incrementInput.value)
        const data = await fetch("/increment", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ increment: incrementInput.value })
        })
        countText.innerText = await data.json()
    })
})
```