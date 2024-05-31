async function throttlePromises() {
    // Масив с асинхронни задачи, които ще изпълним
    const asyncTasks = [
        () => new Promise(resolve => setTimeout(() => { console.log("Task 1 done"); resolve("Task 1 done"); }, 1000)),
        () => new Promise(resolve => setTimeout(() => { console.log("Task 2 done"); resolve("Task 2 done"); }, 1500)),
        () => new Promise(resolve => setTimeout(() => { console.log("Task 3 done"); resolve("Task 3 done"); }, 500)),
        () => new Promise(resolve => setTimeout(() => { console.log("Task 4 done"); resolve("Task 4 done"); }, 2500)),
    ];

    // Функция за гърлото, която ограничава броя на едновременните асинхронни операции
    async function throttle(tasks, limit) {
        // Масив, в който ще съхраняваме резултатите от всяка задача
        const results = [];
        // Масив, в който ще съхраняваме промисите, които в момента се изпълняват
        const executing = [];
        // Обхождаме всички задачи
        for (const task of tasks) {
            // Изпълняваме текущата задача и я добавяме към списъка с изпълняващи се задачи
            const p = task().then(result => {
                // Премахваме изпълнения промис от списъка, след като задачата е завършила
                executing.splice(executing.indexOf(p), 1);
                return result;
            });
            // Добавяме резултата в масива с резултати
            results.push(p);
            // Добавяме промиса към списъка с изпълняващи се задачи
            executing.push(p);
            // Проверяваме дали броят на изпълняващите се задачи е достигнал лимита
            if (executing.length >= limit) {
                // Ако е достигнат лимита, изчакваме най-бързо завършилия промис
                await Promise.race(executing);
            }
        }
        // Връщаме масива с резултатите от всички задачи
        return Promise.all(results);
    }

    // Изпълняваме задачите с ограничение на броя едновременно изпълнявани задачи до 2
    const results = await throttle(asyncTasks, 2);
    // Извеждаме съобщение, че всички задачи са изпълнени и техните резултати
    console.log('All tasks done:', results);
}

// Прикрепяме функцията за гърлото към глобалния обект window, за да може да бъде извикана директно от HTML документа
window.throttlePromises = throttlePromises;
