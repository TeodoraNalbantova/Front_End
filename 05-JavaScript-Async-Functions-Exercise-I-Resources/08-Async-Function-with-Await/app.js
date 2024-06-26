async function simplePromiseAsync() {
await new Promise(resolve => setTimeout(resolve,200))
console.log("Async/Await is awesome!")
}
// Тази функция simplePromiseAsync() е асинхронна функция, маркирана с ключовата дума async. Това означава, че вътре в нея можем да използваме ключовата дума await, за да изчакаме завършването на асинхронни операции.

// В тялото на функцията се създава нов промис с new Promise(), който изчаква 200 милисекунди (0.2 секунди), преди да бъде разрешен. Това става чрез функцията setTimeout(), която промиса се подава като аргумент на await.

// await забавя изпълнението на следващия ред код в тялото на функцията, докато промисът не бъде разрешен. Така че след await, изчакваме 200 милисекунди, преди да продължим напред.

// След като промисът е разрешен, изпълнението продължава и се изпълнява console.log("Async/Await is awesome!"), където се извежда съобщението "Async/Await is awesome!" в конзолата.

// Така че, в резултат, когато се извика simplePromiseAsync(), ще изчакаме 200 милисекунди, след което ще видим съобщението "Async/Await is awesome!" в конзолата.





