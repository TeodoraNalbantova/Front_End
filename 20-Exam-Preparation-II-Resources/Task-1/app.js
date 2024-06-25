window.addEventListener('load', solution);

function solution() {
  // Initial element map 
  let addButtonElement = document.getElementById('add-btn');
  let employeeElement = document.getElementById('employee');
  let categoryElement = document.getElementById('category');
  let urgencyElement = document.getElementById('urgency');
  let teamElement = document.getElementById('team');
  let descriptionElement = document.getElementById('description');

  let previewElement = document.querySelector('.preview-list');
  let pendingElement = document.querySelector('.pending-list');
  let resolvedElement = document.querySelector('.resolved-list');

  // Add Listener to the add button
  addButtonElement.addEventListener('click', onNext);

  function onNext(e) {
    e.preventDefault();
    // If some of the fields are empty, should not allow submit
    if (
      employeeElement.value === '' || 
      categoryElement.value === '' || 
      urgencyElement.value === '' || 
      teamElement.value === '' || 
      descriptionElement.value === ''
    ) {
      return;
    }

    // Build elements to add into the UL for the preview list
    let liElement = document.createElement('li');
    liElement.setAttribute('class', 'problem-content');

    let articleElement = document.createElement('article');

    let fromParagraph = document.createElement('p');
    fromParagraph.textContent = `From: ${employeeElement.value}`;

    let categoryParagraph = document.createElement('p');
    categoryParagraph.textContent = `Category: ${categoryElement.value}`;

    let urgencyParagraph = document.createElement('p');
    urgencyParagraph.textContent = `Urgency: ${urgencyElement.value}`;

    let assignedParagraph = document.createElement('p');
    assignedParagraph.textContent = `Assigned to: ${teamElement.value}`;

    let descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = `Description: ${descriptionElement.value}`;

    let editButton = document.createElement('button');
    editButton.setAttribute('class', 'edit-button');
    editButton.textContent = 'Edit';

    let continueButton = document.createElement('button');
    continueButton.setAttribute('class', 'continue-button');
    continueButton.textContent = 'Continue';

    // Append all children to articleElement
    articleElement.appendChild(fromParagraph);
    articleElement.appendChild(categoryParagraph);
    articleElement.appendChild(urgencyParagraph);
    articleElement.appendChild(assignedParagraph);
    articleElement.appendChild(descriptionParagraph);

    // Append all children to liElement - articleElement and the buttons 
    liElement.appendChild(articleElement);
    liElement.appendChild(editButton);
    liElement.appendChild(continueButton);

    // Append our li to the ul
    previewElement.appendChild(liElement);

    // Clear the input fields
    employeeElement.value = '';
    categoryElement.value = '';
    urgencyElement.value = '';
    teamElement.value = '';
    descriptionElement.value = '';
    addButtonElement.disabled = true;

    // Add event listeners for edit and continue buttons
    editButton.addEventListener('click', function () {
      onEdit(liElement, articleElement, fromParagraph, categoryParagraph, urgencyParagraph, assignedParagraph, descriptionParagraph);
    });

    continueButton.addEventListener('click', function () {
      onContinue(liElement, articleElement);
    });
  }

  function onEdit(liElement, articleElement, fromParagraph, categoryParagraph, urgencyParagraph, assignedParagraph, descriptionParagraph) {
    // Load information back into the input fields
    employeeElement.value = fromParagraph.textContent.replace('From: ', '');
    categoryElement.value = categoryParagraph.textContent.replace('Category: ', '');
    urgencyElement.value = urgencyParagraph.textContent.replace('Urgency: ', '');
    teamElement.value = assignedParagraph.textContent.replace('Assigned to: ', '');
    descriptionElement.value = descriptionParagraph.textContent.replace('Description: ', '');

    // Remove the list item from the preview list
    liElement.remove();

    // Enable the add button
    addButtonElement.disabled = false;
  }

  function onContinue(liElement, articleElement) {
    // Create and append the resolved button
    const resolvedButton = document.createElement('button');
    resolvedButton.setAttribute('class', 'resolve-btn');
    resolvedButton.textContent = 'Resolved';

    // Remove edit and continue buttons
    liElement.querySelector('.edit-button').remove();
    liElement.querySelector('.continue-button').remove();

    // Append resolved button to the liElement
    liElement.appendChild(resolvedButton);

    // Append to pending list
    pendingElement.appendChild(liElement);

    // Add event listener for resolved button
    resolvedButton.addEventListener('click', function () {
      onResolve(liElement, articleElement);
    });
  }

  function onResolve(liElement, articleElement) {
    // Create and append the clear button
    const clearButton = document.createElement('button');
    clearButton.setAttribute('class', 'clear-btn');
    clearButton.textContent = 'Clear';

    // Remove resolved button
    liElement.querySelector('.resolve-btn').remove();

    // Append clear button to the liElement
    liElement.appendChild(clearButton);

    // Append to resolved list
    resolvedElement.appendChild(liElement);

    // Add event listener for clear button
    clearButton.addEventListener('click', function () {
      liElement.remove();
    });
  }
}
