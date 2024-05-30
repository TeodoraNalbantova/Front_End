function subtract() {
   let firstInput = document.getElementById("firstNumber");
   let secondInput = document.getElementById("secondNumber"); 
   let resultDiv = document.getElementById("result");

   let value1 = Number(firstInput.value);
   let value2 = Number(secondInput.value);

  let finalResult = value1 - value2;

  resultDiv.textContent = finalResult;



} 