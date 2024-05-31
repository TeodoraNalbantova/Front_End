function allPromise() {
    const p1 = new Promise(resolve => setTimeout(() => resolve("1 second"), 1000));

    const p2 = new Promise(resolve => setTimeout(() => resolve("2 seconds"), 2000));

    const p3 = new Promise(resolve => setTimeout(() => resolve("3 seconds"), 3000));
    
    Promise.all([p1, p2, p3]).then(console.log);
}

// Тази функция allPromise() създава три промиса p1, p2 и p3, като всеки от тях ще бъде решен след определено време, зададено с setTimeout(). p1 ще бъде решен след 1 секунда, p2 след 2 секунди, а p3 след 3 секунди.

// След това функцията извиква Promise.all(), която приема масив от промиси като аргумент. Тук това са [p1, p2, p3]. Promise.all() връща нов промис, който ще бъде решен, когато всички промиси от масива бъдат успешно решени или поне един от тях бъде отхвърлен.

// Когато всички три промиса (p1, p2 и p3) бъдат успешно решени, тяхните резултати ще бъдат събрани в масив и този масив ще бъде подаден на .then() метода. В нашия случай, резултатът ще бъде масивът ["1 second", "2 seconds", "3 seconds"].