// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementsByTagName("button")[0];
    button.addEventListener("click", function(event) {
        event.preventDefault();
        checkData();
    });
});
