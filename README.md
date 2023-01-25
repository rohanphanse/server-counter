# Server Counter

Link to demo: https://server-counter.roar123.repl.co

## Code for HTTP Server
```js
// Server-side code

// Express.js library allows you to build HTTP servers with Node.js
const express = require("express")
const path = require("path")
// Initialize the server
const app = express()
// Use middleware to support JSON-format HTTP requests
app.use(express.json())
// Host all the files in the public directory 
app.use(express.static(path.join(__dirname, "public")))
// Global counter
let count = 0
// Handle POST requests to /increment for changing the value of the counter
app.post("/increment", (req, res) => {
    // Server logic
    // Use the given increment unless it is not a number, then use a default increment of 1
    let increment = isFinite(req.body.increment) ? +req.body.increment : 1
    // Clamp the increment between -1000 and 1000
    increment = Math.max(-1000, Math.min(increment, 1000))
    count += increment
    // Send the HTTP response back to the client
    res.send(`${count}`)
})

// Handle GET requests to /count for retrieving the count
app.get("/count", (req, res) => {
    res.send(`${count}`)
})

// Servers listen for requests on specific ports
const PORT = 3000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
```

### Code for Client Making Requests to HTTP Server

```js
// Client-side script
document.addEventListener("DOMContentLoaded", () => {
    // HTML elements
    const incrementButton = document.getElementById("increment-button")
    const countText = document.getElementById("count-text")
    const incrementInput = document.getElementById("increment-input")
    // Make GET request to /count to retrieve the count stored in the server
    fetch("/count", { method: "GET" })
        .then((data) => data.json())
        .then((count) => countText.innerText = count)
    // When the increment button is clicked, make a POST request to /increment to increase the count by the specified increment
    incrementButton.addEventListener("click", async () => {
        console.log(incrementInput.value)
        const data = await fetch("/increment", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // The increment data is serialized as a JSON string and sent to the server through an HTTP POST request
            body: JSON.stringify({ increment: incrementInput.value })
        })
        // Update the displayed count with the server's response
        countText.innerText = await data.json()
    })
})
```