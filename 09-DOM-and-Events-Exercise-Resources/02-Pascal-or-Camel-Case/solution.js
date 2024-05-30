function solve() {
let textInput = document.getElementById("text").value.toLowerCase();
let namingConvention = document.getElementById("naming-convention").value;
let resultField = document.getElementById("result");


let splittedText = textInput.split(' ');
let resultText = '';

if (namingConvention == "Camel Case"){

resultText += splittedText[0];
// така се обработват буквите на отделните думи след първата
for (let i = 1; i < splittedText.length; i++) { 
  resultText += splittedText[i][0].toUpperCase() +  splittedText[i].slice(1, splittedText[i].length);
  resultField.textContent = resultText;

}

}

else if (namingConvention == "Pascal Case"){
  // така се прави  първата буква на първата дума главна
resultText += splittedText[0][0].toUpperCase() +  splittedText[0].slice(1, splittedText[0].length);

// сега обработваме и останалите думи докрая.

for (let i = 1; i < splittedText.length; i++) {
  resultText += splittedText[i][0].toUpperCase() +  splittedText[i].slice(1, splittedText[i].length);
  resultField.textContent = resultText;

}


}
else 
{
  resultField.textContent = "Error!";
}

}