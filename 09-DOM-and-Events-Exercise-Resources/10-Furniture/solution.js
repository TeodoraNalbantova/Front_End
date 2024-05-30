function solve() {
  const [input, output] = document.getElementsByTagName("textarea");

  //document.getElementsByTagName("textarea") retrieves all <textarea> elements in the document and returns them as an HTMLCollection (a collection of elements).
  //The destructuring assignment [input, output] extracts the first two elements from this HTMLCollection and assigns them to the variables input and output, respectively.
  //input will hold the first <textarea> element found in the document.
//output will hold the second <textarea> element found in the document.

  const [generateButton, buyButton] = document.getElementsByTagName("button");

  //document.getElementsByTagName("button") retrieves all <button> elements in the document and returns them as an HTMLCollection.
//The destructuring assignment [generateButton, buyButton] extracts the first two elements from this HTMLCollection and assigns them to the variables generateButton and buyButton, respectively.
//generateButton will hold the first <button> element found in the document.
//buyButton will hold the second <button> element found in the document.

  const tableBody = document.getElementsByTagName("tbody")[0];
  //document.getElementsByTagName("tbody") retrieves all <tbody> elements in the document and returns them as an HTMLCollection.
// The [0] index accesses the first <tbody> element in the collection and assigns it to the variable tableBody.





  //добавяме функционалнсот на копчетата 
  generateButton.addEventListener('click', generateRow);
  buyButton.addEventListener('click', buyItems);


function generateRow(){
  //The generateRow function reads the input JSON, parses it, and iterates over each item. For each item, it creates a new table row (<tr>) and adds columns for the image, name, price, decoration factor, and a checkbox. Each column is appended to the table row, and the row is appended to the table body.The generateRow function reads the input JSON, parses it, and iterates over each item.For each item, it creates a new table row (<tr>) and adds columns for the image, name, price, decoration factor, and a checkbox.Each column is appended to the table row, and the row is appended to the table body.


let items = JSON.parse(input.value);

for (let i = 0; i < items.length; i++) {
  let tableRow = document.createElement('tr');


  //add tableData for the image
  let imageTableData = document.createElement('td'); // Create a New Table Cell (<td>) Element
  //document.createElement('td') creates a new HTML <td> element, which represents a table cell.
  let image = document.createElement('img'); // Create a New Image (<img>) Element
  //document.createElement('img') creates a new HTML <img> element, which represents an image.
  image.src = items[i].img; // Set the Image Source
  //items[i].img accesses the img property of the i-th item in the items array.
  //This value is assigned to the src attribute of the <img> element, specifying the URL of the image to be displayed.
  imageTableData.appendChild(image);   //  Append the Image to the Table Cell:
  //imageTableData.appendChild(image) appends the <img> element as a child of the <td> element.
  //Now, imageTableData contains an <img> element, so it looks something like this in HTML: <td><img src="image_url"></td>.
  tableRow.appendChild(imageTableData); // Append the Table Cell to the Table Row:
//tableRow.appendChild(imageTableData) appends the <td> element (which now contains the image) as a child of the <tr> element (the table row).
//This means that tableRow now includes a cell with the image, adding this cell to the entire row of data.




  //add table data for name column
  let nameTableData = document.createElement('td');
  let nameParagraph = document.createElement('p');
  nameParagraph.textContent = items[i].name;
  nameTableData.appendChild(nameParagraph);
  tableRow.appendChild(nameTableData);


  // add table data fpr the price column 
  let priceTableData = document.createElement('td');
  let priceParagraph = document.createElement('p');
  priceParagraph.textContent = items[i].price;
  priceTableData.appendChild(priceParagraph);
  tableRow.appendChild(priceTableData);

 // add table data for the decoration factor column 
 let decorationTableData = document.createElement('td');
 let decorationParagraph = document.createElement('p');
 decorationParagraph.textContent = items[i].decFactor;
 decorationTableData.appendChild(decorationParagraph);
 tableRow.appendChild(decorationTableData);


//add table data for the check box column
let markTableData = document.createElement('td');
let markInput = document.createElement('input')
markInput.type = 'checkbox';
markTableData.appendChild(markInput);
tableRow.appendChild(markTableData);

tableBody.appendChild(tableRow) //is responsible for adding the newly created table row (<tr>) to the table body (<tbody>)



}

}


function buyItems() {
//The buyItems function initializes arrays and counters to store selected items, total price, and average decoration factor.
//It loops through the table rows (skipping the header row).
//For each checked row, it updates the furniture list, total price, and decoration factor.
//It calculates the average decoration factor and constructs the result string.
//The result is then displayed in the output textarea.



  let furniture = [];
  let price = 0;
  let averageDecorationFactor = 0;
  let checkedItemsCount = 0;
  let tableRows =  document.getElementsByTagName('tr');

  for (let i = 1; i < tableRows.length; i++) {
     let isMarkedChecked = tableRows[i].children[4].children[0].checked;

     if (isMarkedChecked)
{
  checkedItemsCount += 1;
  furniture.push(tableRows[i].children[1].children[0].textContent);
  price += Number(tableRows[i].children[2].children[0].textContent);
  averageDecorationFactor += Number(tableRows[i].children[3].children[0].textContent);

}
  }

  const result = `Bought furniture: ${furniture.join(', ')}                                                    
  Total price: ${price.toFixed(2)}                      
  Average decoration factor: ${averageDecorationFactor/checkedItemsCount}`;

  output.textContent = result;
}

}