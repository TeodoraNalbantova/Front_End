// Асинхронна функция, която използва промис за получаване на вход от потребителя чрез прозорец за въвеждане (prompt)
async function getUserInput(promptMessage) {
    return new Promise((resolve) => {
        // Показва прозорец за въвеждане и съхранява въведения от потребителя текст в променлива
        const input = prompt(promptMessage);
        // Разрешава промиса с въведения текст като резултат
        resolve(input);
    });
}

// Асинхронна функция, която стартира обратното броене
async function startCountdown() {
    // Взема вход от потребителя чрез getUserInput и изчаква резултата
    const userInput = await getUserInput("Enter the number of seconds for the countdown:");
    // Преобразува въведения текст в цяло число
    let timeLeft = parseInt(userInput);

    // Проверява дали въведения текст е валидно число и дали е по-голямо от 0
    if (isNaN(timeLeft) || timeLeft <= 0) {
        console.log("Please enter a valid number of seconds.");
        return; // Спира изпълнението, ако входът е невалиден
    }

    console.log(`Countdown started from ${timeLeft} seconds`);

    // Задава интервал, който ще намалява timeLeft на всяка секунда
    const countdownInterval = setInterval(async () => {
        console.log(`Time left: ${timeLeft} seconds`);
        timeLeft--; // Намалява оставащото време с 1 секунда

        // Ако времето изтече
        if (timeLeft == 0) {
            clearInterval(countdownInterval); // Спира интервала
            console.log("Countdown finished");
            // Изчаква функцията saveRemainingTime да завърши, преди да продължи
            await saveRemainingTime(timeLeft);
        }
    }, 1000); // Интервалът е настроен на 1000 милисекунди (1 секунда)
}

// Функция, която симулира запазване на оставащото време (в този случай 0 секунди)
function saveRemainingTime(time) {
    return new Promise((resolve) => {
        // Изчаква 500 милисекунди преди да изпълни кода в setTimeout
        setTimeout(() => {
            console.log(`Remaining time saved: ${time} seconds`);
            resolve(); // Разрешава промиса, сигнализирайки, че операцията е завършена
        }, 500); // 500 милисекунди (0.5 секунда) забавяне
    });
}

// Прави функцията startCountdown достъпна глобално, така че да може да бъде извикана чрез бутон или друг HTML елемент
window.startCountdown = startCountdown;
