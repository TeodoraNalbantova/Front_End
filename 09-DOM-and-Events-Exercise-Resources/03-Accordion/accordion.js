function toggle() {
   let textDiv = document.getElementById('extra');
   let button = document.getElementsByClassName('button')[0];

   if (button.textContent == "More"){
    //If the button's text is "More", it sets the display style of textDiv to block, making it visible.It then changes the button's text to "Less".
    //Когато елементът има display: block, той се показва като блоков елемент. Това означава, че заема цялата ширина на родителския контейнер и започва на нов ред.
    textDiv.style.display = "block"
    button.textContent = "Less"
   } else {
    //If the button's text is not "More" (implicitly, it would be "Less"), it sets the display style of textDiv to none, hiding it.It then changes the button's text back to "More".

    textDiv.style.display = "none"
    button.textContent = "More"
   }
}