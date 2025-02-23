// This file contains the main JavaScript for the love letter website, handling DOM manipulation and event listeners.

document.addEventListener("DOMContentLoaded", function() {
    const expressButton = document.getElementById("express-button");
    const letterForm = document.getElementById("letter-form");
    const letterOutput = document.getElementById("letter-output");

    expressButton.addEventListener("click", function() {
        const feelings = document.getElementById("feelings-input").value;
        if (feelings) {
            letterOutput.innerHTML = `<p>Your feelings: ${feelings}</p>`;
            letterOutput.classList.add("fade-in");
            letterForm.reset();
        } else {
            alert("Please express your feelings before submitting!");
        }
    });

    const loadingScreen = document.getElementById("loading-screen");
    const container = document.querySelector(".container");
    setTimeout(() => {
        loadingScreen.style.display = "none";
        container.style.display = "block";
    }, 15000); // Adjust the timeout duration to 15 seconds
});