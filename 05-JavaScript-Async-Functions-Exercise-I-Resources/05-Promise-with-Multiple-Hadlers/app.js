function promiseWithMultipleHandlers() {
    new Promise((resolve) => {
        setTimeout(() => resolve("Hello World"),2000)
    })
    .then ((message) => {
console.log(message)
return message;
    })
    .then ((message)=>{
        console.log(message)
    })
}

// Тази функция promiseWithMultipleHandlers() създава нов промис, който ще бъде изпълнен след две секунди с помощта на функцията resolve. След това промисът е обработен с две последователни вериги от метода .then().
// В първата верига от .then(), когато промисът бъде изпълнен успешно (resolve), се извиква функция, която приема един аргумент message. Тази функция просто извежда съобщението в конзолата с помощта на console.log()
// Във втората верига от .then(), отново се извиква функция с един аргумент message, която също извежда съобщението в конзолата. Тук message няма да бъде дефиниран, защото не е върнат от предишния .then().
// По този начин, след като промисът бъде изпълнен успешно, "Hello World" ще бъде изведено два пъти в конзолата, веднага след изтичането на първата секунда и отново веднага след изтичането на втората секунда.





