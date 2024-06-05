const{ isEven } = require("./test_functions.js")

QUnit.module("IsEven function tests", () =>{
    QUnit.test("Even numbers", function(assert){
        assert.ok(isEven(2),"even numbers passed")
    })

    QUnit.test("Odd numbers", function(assert){
        assert.notOk(isEven(3),"odd numbers passed")
    })

    
    QUnit.test("Zero as input", function(assert){
        assert.ok(isEven(0),"zero number passed")
    })

    QUnit.test("Negative Odd numbers", function(assert){
        assert.notOk(isEven(-3),"Negative odd numbers passed")
    })

    QUnit.test("Negative Even numbers", function(assert){
        assert.ok(isEven(-2),"Negative even numbers passed")
    })
})