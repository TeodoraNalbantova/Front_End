const{ sum } = require("./test_functions.js")

QUnit.module("sum function tests", () =>{
    QUnit.test("Adding two positive numbers", function(assert){
        assert.equal(sum(2,3),5, "Adding two positive numbers.")
    })

    QUnit.test("Adding  positive and negative numbers", function(assert){
        assert.equal(sum(5,-3),2, "Adding positive and negative numbers.")
    })

    QUnit.test("Adding  two negative numbers", function(assert){
        assert.equal(sum(-5,-3),-8, "Adding two negative numbers.")
    })

    QUnit.test("Adding two real numbers", function(assert){
        assert.equal(Math.floor(sum(0.2,0.3)*10),5, "Adding two real numbers.")
    })
})

