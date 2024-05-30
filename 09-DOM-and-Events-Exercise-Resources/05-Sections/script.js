function create(words) {

let divContent = document.getElementById("content"); // selects the div with the ID content where new elements will be added.

for (let i = 0; i < words.length; i++) // iterates over each word in the words array. 
{
   let newDiv = document.createElement("div"); //creates a new div element.
   let newParagraph = document.createElement("p"); // creates a new p (paragraph) element.
   newParagraph.textContent = words[i]; //sets the text of the paragraph to the current word.
   newParagraph.style.display = "none"; //hides the paragraph by default.

   newDiv.appendChild(newParagraph); //adds the paragraph to the new div.
   divContent.appendChild(newDiv); // adds the new div to the content div.


   newDiv.addEventListener('click', function()
   //adds a click event listener to the new div.
   { 
newParagraph.style.display = "";
   }) //makes the paragraph visible when the div is clicked.
   
}

}