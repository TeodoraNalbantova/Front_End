// Деклариране на асинхронната функция fetchData
async function fetchData() {
    // Извикване на fetch, за да изпрати HTTP заявка до дадения URL адрес
    const response = await fetch("https://swapi.dev/api/people/1");

    // Извличане и преобразуване на отговора от HTTP заявката в JSON формат
    const data = await response.json();

    // Извеждане на данните в конзолата
    console.log(data);
}
