// giphy API key
const APIkey = "AjRvmqBn8zjHhocxAyOP672lGgqMiWHU";

// more globals




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


// Main async function
async function handleSearchClick(event){
    event.preventDefault();
    const searchBarInput = document.getElementById("search-input").value;
    const userInput = searchBarInput.trim(); // remove any whitespace
    const errorMsg = document.getElementById("error-message");

    if(userInput === ""){
        errorMsg.textContent = "Please enter a search term.";
        errorMsg.style.display = "block";
        return;
    } else {
        errorMsg.style.display = "none";
    }

    clearResults();

    // call fetch gifs function and pass result into displayGifs function
    const gifArray = await fetchGifs(userInput);


    // call displayGifs function
    displayGifs(gifArray);

}

// Function to fetch data from API
async function fetchGifs(query){
    const encodedQuery = encodeURIComponent(query);
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${APIkey}&q=${query}&limit=10&rating=g&lang=en`;

    const response = await fetch(url); // fetch data from giphy api using the key and the query
    const json = await response.json(); // convert into json 
    return json.data; // return an array of gifs
}

// function to display gifs on the webpage
function displayGifs(gifArray){
    const gifContainer = document.getElementById("gif-results");

    for(let gif of gifArray){
        const col = document.createElement("div");
        col.className = "col-6 col-md-4 col-lg-3";

        const img = document.createElement("img");
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title;
        img.className = "img-fluid rounded shadow";

        col.appendChild(img);
        gifContainer.appendChild(col);
    }
}

// Function to clear the previous gifs from the webpage
function clearResults(){
    const gifContainer = document.getElementById("gif-results");
    gifContainer.innerHTML = "";
}






// after all function logic, add an event handler to the button to run the main function 
document.getElementById("btn").addEventListener("click", handleSearchClick);


// error message logic
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("focus", () => {
    const errorMsg = document.getElementById("error-message");
    errorMsg.style.display = "none";
})