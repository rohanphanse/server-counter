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