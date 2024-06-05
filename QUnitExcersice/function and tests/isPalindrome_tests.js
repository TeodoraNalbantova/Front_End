const{ isPalindrome } = require("./test_functions.js")

QUnit.module("IsPalindrome function tests", () =>{

    QUnit.test("single palindrome word", function(assert){
        assert.ok(isPalindrome("racecar"),"single palindrom word")
    })

    QUnit.test("multi words palindrome", function(assert){
        assert.ok(isPalindrome("A man, a plan, a canal, Panama!"),"multi words palindrome")
    })

    QUnit.test("single not palindrome word", function(assert){
        assert.notOk(isPalindrome("hello"),"single not palindrom word")
    })

    QUnit.test("empty string as input", function(assert){
        assert.notOk(isPalindrome(""),"empty string as input")
    })



})