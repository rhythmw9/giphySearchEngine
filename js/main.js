// Placeholder strings for search bar
const placeholders = [
    "Search for something magical...",
    "Need a dancing banana gif?",
    "Try 'confused cat'",
    "What's your mood today?",
    "GIF me something good...",
    "Feeling lucky? Type anything!",
    "Type a vibe... like 'happy cat'"
];

// function to set the placeholder randomly when the page loads/reloads
function setRandomPlaceholder(){
    const lastIndex = localStorage.getItem("lastPlaceholderIndex"); // get previous index
    let newIndex; // local variable for new index

    do {
        newIndex = Math.floor(Math.random() * placeholders.length); // calculate a random index within the length of the placeholders array
    } while (placeholders.length > 1 && newIndex == lastIndex); // keep selecting a new index until it's different than the last

    const input = document.getElementById("search-input"); // grab the search bar input 
    input.placeholder = placeholders[newIndex]; // set the selected placeholder string to the default search bar value

    localStorage.setItem("lastPlaceholderIndex", newIndex); // store new index in local storage to be checked next time the page loads
}

window.addEventListener("DOMContentLoaded", setRandomPlaceholder); // run the function as soon as the DOM is loaded



