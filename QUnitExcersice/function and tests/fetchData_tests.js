const { fetchData } = require("./async_test_functions.js");

QUnit.module("fetchData function tests", () => {
    QUnit.test("fetch data from correct url", async function(assert) {
        const data = await fetchData("https://api.zippopotam.us/bg/8000");
        
        // Adding logging to understand the structure of data
        console.log(data);

        assert.ok(data.hasOwnProperty('post code'), "Checking for specific property");
        assert.equal(data['post code'], '8000', "Post code should be 8000");

        assert.ok(data.hasOwnProperty('country'), "Checking for specific property");
        assert.equal(data['country'], 'Bulgaria', "Country should be Bulgaria");

        assert.ok(data.hasOwnProperty('country abbreviation'), "Checking for specific property");
        assert.equal(data['country abbreviation'], 'BG', "Country abbreviation should be BG");

        assert.ok(Array.isArray(data.places), "Checking if places is an array");
        assert.equal(data.places.length, 1, "There should be exactly one place");

        const place = data.places[0]; // Correcting from data.place[0] to data.places[0]
        assert.ok(place.hasOwnProperty('place name'), "Checking for specific property");
        assert.equal(place['place name'], 'Бургас / Burgas', "Place name should be 'Бургас / Burgas'");

        assert.ok(place.hasOwnProperty('longitude'), "Checking for specific property");
        assert.equal(place['longitude'], '27.4667', "Longitude should be '27.4667'");

        assert.ok(place.hasOwnProperty('state'), "Checking for specific property");
        assert.equal(place['state'], 'Бургас / Burgas', "State should be 'Бургас / Burgas'");

        assert.ok(place.hasOwnProperty('state abbreviation'), "Checking for specific property");
        assert.equal(place['state abbreviation'], 'BGS', "State abbreviation should be 'BGS'");

        assert.ok(place.hasOwnProperty('latitude'), "Checking for specific property");
        assert.equal(place['latitude'], '42.5', "Latitude should be '42.5'");
    });

    QUnit.test("fetch data with invalid post code", async function(assert) {
        const error = await fetchData("https://api.zippopotam.us/bg/8000999");
        assert.equal(error, "Network response was not ok", "Should receive error message for invalid post code");
    });

    QUnit.test("fetch data with wrong URL", async function(assert) {
        const error = await fetchData("https://wwww.zippopotam.us/bg/8000");
        assert.equal(error, "fetch failed");
    });
});
