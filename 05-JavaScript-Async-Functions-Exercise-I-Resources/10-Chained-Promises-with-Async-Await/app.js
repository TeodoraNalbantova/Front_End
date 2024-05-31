async function chainedPromisesAsync() {
    const p1 = await new Promise(resolve => setTimeout(() => resolve("First"), 1000));
    
    const p2 = await new Promise(resolve => setTimeout(() => resolve("Second"), 2000));
    
    const p3 = await new Promise(resolve => setTimeout(() => resolve("Third"), 3000));


    console.log(p1, p2, p3);
}
// Тези промиси се изчакват последователно с помощта на оператора await, който временно спира изпълнението на функцията, докато съответният промис се разреши.

// След като всички три промиса се разрешат последователно, техните резултати (съответно "First", "Second" и "Third") се изпращат като аргументи на console.log(), където се извеждат в конзолата.