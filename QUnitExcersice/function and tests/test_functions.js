function sum(a,b){
    return a + b;
}

function isEven(number) {
    return number % 2 === 0;
}

function factorial(n) {

    //това е с рекурсия, но може и с for цикъл
    if(n === 0 || n === 1 || n < 0){
        return 1;
    }
     return n * factorial(n -1);
}

function isPalindrome(str) {
    if (str === '') {
        return false;
    }

    // Clean the string: remove non-word characters and convert to lowercase
    let cleanStr = str.toLowerCase().replace(/[\W_]/g, '');
    // Reverse the cleaned string
    let reversedStr = cleanStr.split('').reverse().join('');

    // Check if cleaned string is equal to the reversed string
    return cleanStr === reversedStr;
}

function fibonacci(n) {

    if(n === 0){
        return [];
    }

    if ( n === 1){
        return [0];
    }

    let sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i-1] + sequence[i-2])
        
    }

    return sequence;
    
}


function nthPrime(n) {
    let count = 0; // Counter for prime numbers found
    let num = 2;   // Starting number to check for primes

    // Loop until we find the nth prime
    while (count < n) {
        if (isPrime(num)) {
            count++; // Increment count if the number is prime
        }
        num++; // Move to the next number
    }

    return num - 1; // The last incremented number is the nth prime
}

function isPrime(num) {
    // Check if num is less than or equal to 1
    if (num <= 1) {
        return false;
    }

    // Check if num is 2 or 3
    if (num <= 3) {
        return true;
    }

    // Eliminate multiples of 2 and 3
    if (num % 2 === 0 || num % 3 === 0) {
        return false;
    }

    // Check for factors from 5 onwards
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) {
            return false;
        }
    }

    return true;
}

function pascalsTriangle(rows) {
    let triangle = [];

    for (let i = 0; i < rows; i++) {
        triangle[i] = [];
        triangle[i][0] = 1;

        for (let j = 1; j < i; j++) {
            triangle[i][j] = triangle [i-1][j-1] + triangle [i-1][j];

            
        }
        triangle [i][i] = 1;

    }
    return triangle;
}

function isPerfectSquare(number){
    return Math.sqrt(number) % 1 === 0;
}

module.exports = {
    sum,
    isEven,
    factorial,
    isPalindrome,
    fibonacci,
    nthPrime,
    pascalsTriangle,
    isPerfectSquare
};