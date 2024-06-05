const { fake_delay } = require("./async_test_functions.js");

QUnit.module("Fake_dealy function tests", ()=>{
    QUnit.test("test with 1 sec", async function(assert){
        const start = Date.now();

        await fake_delay(1000);

        const end = Date.now();

        const difference = end - start;

        assert.ok(difference >= 1000, "Delay is at east 1000 mileseconds")
    })
})