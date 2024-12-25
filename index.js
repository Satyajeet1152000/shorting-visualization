import { animationIntialization } from "./animate.js";

// const arr = [23, 12, 32, 56, 25, 67, 3, 69, 78, 34, 9];

document.getElementById("array-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const arr = e.target.arrayInput.value.split(",").map(Number);

    const submitButton = e.target.querySelector("button");

    // Disable the button
    submitButton.disabled = true;

    // Wait for the animation initialization to complete
    await animationIntialization(arr, arr.length);

    // Re-enable the button after the animation is done
    submitButton.disabled = false;
});
