function asyncGenerator(generatorFunc) {
    // Създава нов инстанс на генератора, извиквайки го със зададената функция за генератор
    const generator = generatorFunc();

    // Функция, която обработва следващата стъпка в генератора
    function handle(result) {
        // Проверява дали генераторът е приключил
        if (result.done) return Promise.resolve(result.value);
        // Обработва следващата стъпка в генератора
        return Promise.resolve(result.value).then(
            // Ако стъпката е успешна, продължава със следващата
            res => handle(generator.next(res)),
            // Ако стъпката е неуспешна, хвърля грешката
            err => handle(generator.throw(err))
        );
    }

    // Изпълнява първата стъпка в генератора
    try {
        return handle(generator.next());
    } catch (err) {
        // Ако има грешка при изпълнението на генератора, я хвърля
        return Promise.reject(err);
    }
}

// Функция, която стартира асинхронния генератор
function startAsyncGenerator() {
    // Изпълнява асинхронния генератор, като подава анонимна генераторна функция
    asyncGenerator(function* () {
        // Очаква завършване на първата асинхронна операция
        const data1 = yield new Promise(resolve => setTimeout(() => resolve("Task 1 done"), 1000));
        console.log(data1); // Извежда резултата на конзолата
        // Очаква завършване на втората асинхронна операция
        const data2 = yield new Promise(resolve => setTimeout(() => resolve("Task 2 done"), 1500));
        console.log(data2); // Извежда резултата на конзолата
        // Очаква завършване на третата асинхронна операция
        const data3 = yield new Promise(resolve => setTimeout(() => resolve("Task 3 done"), 500));
        console.log(data3); // Извежда резултата на конзолата
    }).catch(console.error); // Обработва грешки, ако има такива
}

// Прикрепя функцията за стартиране на асинхронния генератор към глобалния обект window, за да може да се извиква от HTML документа
window.startAsyncGenerator = startAsyncGenerator;
