window.addEventListener("load", solve);

function solve() {
    //Достъп до елементи на страницата чрез ID.Тези редове достъпват елементите на формата по техните ID и ги съхраняват в променливи за по-лесна работа по-нататък.

  let snowmanNameElement = document.getElementById("snowman-name");
  let snowmanHeightElement = document.getElementById("snowman-height");
  let locationElement = document.getElementById("location");
  let creatorNameElement = document.getElementById("creator-name");
  let attributeElement = document.getElementById("special-attribute");
  //Достъп до елементи на страницата чрез селектори -Тези редове достъпват други елементи на страницата чрез различни селектори (класове или ID).

  let addbtnElement = document.querySelector(".add-btn");
  let snowListElement = document.querySelector(".snowman-preview");
  let showSnowmanElement = document.querySelector(".snow-list");
  let main = document.getElementById("hero");
  let bodyElement = document.querySelector(".body");
  let backImg = document.getElementById('back-img');

  //Добавяне на слушател на събитието click към бутона "Add"

  addbtnElement.addEventListener("click", onAdd);

  function onAdd(e) {
    e.preventDefault(); //Предотвратяване на стандартното поведение на формата:Това предотвратява изпращането на формата и презареждането на страницата.



//Ако някое от полетата е празно, функцията се прекратява.

    if (
      snowmanNameElement.value == "" ||
      snowmanHeightElement.value == "" ||
      locationElement.value == "" ||
      creatorNameElement.value == "" ||
      attributeElement.value == ""
    ) {
      return;
    }
    //Създаване на нови елементи за снежния човек:

    let articleElementInfo = document.createElement("article");
    let liElementInfo = document.createElement("li");
    liElementInfo.setAttribute("class", "snowman-info");
    let btnContainer = document.createElement("div");
    btnContainer.setAttribute("class", "btn-container");

    let snowmanName = document.createElement("p"); //Този ред създава нов елемент <p> и го съхранява в променливата snowmanName.


    snowmanName.textContent = `Name: ${snowmanNameElement.value}`; //Този ред задава текстовото съдържание на елемента snowmanName. Стойността на полето за името на снежния човек, въведена във формата (snowmanNameElement.value), се включва в текстовия низ, който започва с "Name: ".



    let snowmanHeght = document.createElement("p");
    snowmanHeght.textContent = `Height: ${snowmanHeightElement.value}`;

    let location = document.createElement("p");
    location.textContent = `Location: ${locationElement.value}`;

    let creator = document.createElement("p");
    creator.textContent = `Creator: ${creatorNameElement.value}`;

    let attribute = document.createElement("p");
    attribute.textContent = `Attribute: ${attributeElement.value}`;
//Създаване на бутони за редакция и продължаване:


    let editBtn = document.createElement("button");
    editBtn.setAttribute("class", "edit-btn");
    editBtn.textContent = "Edit";

    let nextBtn = document.createElement("button");
    nextBtn.setAttribute("class", "next-btn");
    nextBtn.textContent = "Next";
//Добавяне на текстовите елементи и бутоните към контейнерите:

//Тези редове от кода се използват за изграждане на структурата на HTML елементите и за добавянето им към съответните родителски елементи. Нека разгледаме какво се случва във всеки ред:
//Тези редове добавят създадените по-рано елементи <p> (със съответните текстове) като деца на елемента articleElementInfo. Така articleElementInfo ще съдържа информация за снежния човек:
    articleElementInfo.appendChild(snowmanName);
    articleElementInfo.appendChild(snowmanHeght);
    articleElementInfo.appendChild(location);
    articleElementInfo.appendChild(creator);
    articleElementInfo.appendChild(attribute);
//Добавяне на бутони към btnContainer
//Тези редове добавят бутоните "Edit" и "Next" към контейнера btnContainer, който е елемент <div> с клас btn-container.


    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(nextBtn);

    liElementInfo.appendChild(articleElementInfo);
    liElementInfo.appendChild(btnContainer);

    //Добавяне на новосъздадените елементи към списъка:


    snowListElement.appendChild(liElementInfo);

//Запазване на текущите стойности на формата за евентуална редакция:

    let editedSnowmanName = snowmanNameElement.value;
    let editedHeght = snowmanHeightElement.value;
    let editedLocation = locationElement.value;
    let editedCreator = creatorNameElement.value;
    let editedAttribute = attributeElement.value;
//Изчистване на формата и деактивиране на бутона "Add":

    snowmanNameElement.value = "";
    snowmanHeightElement.value = "";
    locationElement.value = "";
    creatorNameElement.value = "";
    attributeElement.value = "";

    addbtnElement.disabled = true;
//Добавяне на слушател за събитието click към бутона "Edit":


    editBtn.addEventListener("click", onEdit);
//Дефиниране на функцията onEdit:


    function onEdit() {
      snowmanNameElement.value = editedSnowmanName;
      snowmanHeightElement.value = editedHeght;
      locationElement.value = editedLocation;
      creatorNameElement.value = editedCreator;
      attributeElement.value = editedAttribute;

      liElementInfo.remove();
      addbtnElement.disabled = false;
    }
//Добавяне на слушател за събитието click към бутона "Next":


    nextBtn.addEventListener("click", onNext);


//Дефиниране на функцията onNext:Тази функция премества снежния човек в списъка за потвърждение, добавя бутон "Send" и дефинира функцията onConfirm, която премахва основния елемент и добавя бутон "Back".
    function onNext() {
      let liElementconfirm = document.createElement("li");
      liElementconfirm.setAttribute("class", "snowman-content"); 
      //Този код създава нов елемент <li> и му задава клас snowman-content. Този елемент ще съдържа информацията за снежния човек и бутона "Send".

      //Създаване на нов <article> елемент и преприсвояване на articleElementInfо

      let articleElementContinue = document.createElement("article");
      articleElementContinue = articleElementInfo;
     // Първият ред създава нов <article> елемент, но веднага след това, вторият ред преприсвоява articleElementInfo към articleElementContinue. Това означава, че articleElementContinue ще реферира към вече създадения и попълнен articleElementInfo.


//Тези редове създават нов бутон <button>, задават му клас send-btn и текст "Send".
      let sendBtn = document.createElement("button");
      sendBtn.setAttribute("class", "send-btn");
      sendBtn.textContent = "Send";
      //Добавяне на бутона "Send" към articleElementContinue
      articleElementContinue.appendChild(sendBtn);
      //Добавяне на articleElementContinue към liElementconfirm
      liElementconfirm.appendChild(articleElementContinue);
//Премахване на оригиналния списъчен елемент liElementInfo

      liElementInfo.remove();

//Този ред добавя новия списъчен елемент liElementconfirm, който съдържа информацията за снежния човек и бутона "Send", към showSnowmanElement.
      showSnowmanElement.appendChild(liElementconfirm);

      sendBtn.addEventListener("click", onConfirm);
//Функцията onConfirm се изпълнява, когато потребителят натисне бутона "Send". Тази функция премахва основното съдържание на страницата и добавя бутон "Back", който позволява на потребителя да се върне към началната страница.
      function onConfirm() {
        main.remove(); //Този ред премахва елемента main, който съдържа основното съдържание на страницата. Това означава, че всички снежни човеци и формата за добавяне на нов снежен човек ще бъдат премахнати от видимата част на страницата.
        let backBtn = document.createElement("button");
        backBtn.setAttribute("class", "back-btn");
        backBtn.textContent = "Back";
        backImg.hidden = false; // Този ред прави изображението backImg видимо, като задава неговото свойство hidden на false

        bodyElement.appendChild(backBtn);

        backBtn.addEventListener("click", onBack);
        function onBack() {
          window.location.reload(); //Функцията onBack презарежда страницата, когато бутонът "Back" бъде натиснат. Това се постига чрез извикването на window.location.reload(), което рестартира текущия URL адрес и презарежда цялото съдържание на страницата.


        }
      }
    }
  }
}
