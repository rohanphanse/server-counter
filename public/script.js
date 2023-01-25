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