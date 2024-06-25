const baseUrl = 'http://localhost:3030/';

let user = {
    email: '',
    password: '123456',
};

let token = '';
let userId = '';

let lastCreatedEventId = "";
let myEvent = {
    author: 'Random author',
    date: "25.06.2024",
    title : "",
    description : "",
    imageUrl : "/images/Moulin-Rouge!-The-Musical.jpg"
};

QUnit.config.reorder = false;

QUnit.module("User functionality", () => {
    QUnit.test("User registration", async(assert) => {
// arrange
         let path = 'users/register';

        let random = Math.floor(Math.random() * 10000)
        let email = `abv${random}@abv.bg`;

        user.email = email;
//act
        let response = await fetch(baseUrl + path, {
            method : 'POST',
            headers : { 
                'content-type' : 'application/json'
             },
            body : JSON.stringify(user)
        });

        let json = await response.json();


        //console.log(json);
   

        // assert

        assert.ok(response.ok, "successful response");
        assert.ok(json.hasOwnProperty('email'), "email exist");
        assert.equal(json['email'], user.email, "expected mail");
        assert.strictEqual(typeof json.email, 'string', 'Property "email" is a string');

        assert.ok(json.hasOwnProperty('password'), "password exist");
        assert.equal(json['password'], user.password, "expected password");
        assert.strictEqual(typeof json.password, 'string', 'Property "password" is a string');


        assert.ok(json.hasOwnProperty('_createdOn'), "_createdOn exist");
        assert.strictEqual(typeof json._createdOn, 'number', 'Property "_createdOn" is a number');

        assert.ok(json.hasOwnProperty('_id'), "id exist");
        assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');

        assert.ok(json.hasOwnProperty('accessToken'), "accessToken exist");
        assert.strictEqual(typeof json.accessToken, 'string', 'Property "accessToken" is a string');


        token = json['accessToken']; //get token
        userId = json['_id']; //get id
        sessionStorage.setItem('event-user', JSON.stringify(user)); //set token to session store in browser

    })

    QUnit.test("Login registration", async(assert) => {

        let path = 'users/login';

        let response = await fetch(baseUrl + path, {
            method : 'POST',
            headers : { 
                'content-type' : 'application/json'
             },
            body : JSON.stringify({
                email: user.email,
                password: user.password
            })

        });

        assert.ok(response.ok, "successful response");

        let json = await response.json();

        assert.ok(json.hasOwnProperty('email'), "email exist");
        assert.equal(json['email'], user.email, "expected mail");
        assert.strictEqual(typeof json.email, 'string', 'Property "email" is a string');

        assert.ok(json.hasOwnProperty('password'), "password exist");
        assert.equal(json['password'], user.password, "expected password");
        assert.strictEqual(typeof json.password, 'string', 'Property "password" is a string');


        assert.ok(json.hasOwnProperty('accessToken'), "accessToken exist");
        assert.strictEqual(typeof json.accessToken, 'string', 'Property "accessToken" is a string');

        assert.ok(json.hasOwnProperty('_id'), "id exist");
        assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');

        userId = json['_id']; //get id
        token = json['accessToken']; //get token
        sessionStorage.setItem('meme-user', JSON.stringify(user)); //set token to session store in browser
        
    })
})

QUnit.module("Event functionality", () => {

    QUnit.test("Get all events", async(assert) => {
        //arrange
        let path = 'data/theaters';
        let queryParam = '?sortBy=_createdOn%20desc&distinct=title'
        //act
        let response = await fetch(baseUrl + path + queryParam);
        let json = await response.json();

        //assert
        assert.ok(response.ok, "successful response");

        assert.ok(Array.isArray(json), 'response is array');

        json.forEach(jsonData => {
            
            //console.log(jsonData)

           
            assert.ok(jsonData.hasOwnProperty('author'), 'Property author exists');
            assert.strictEqual(typeof jsonData.author, 'string', 'Property author is a string');


            assert.ok(jsonData.hasOwnProperty('date'), 'Property date exists');
            assert.strictEqual(typeof jsonData.date, 'string', 'Property date is a string');

            assert.ok(jsonData.hasOwnProperty('description'), 'Property description exists');
            assert.strictEqual(typeof jsonData.description, 'string', 'Property description is a string');

            assert.ok(jsonData.hasOwnProperty('imageUrl'), 'Property "imageUrl" exists');
            assert.strictEqual(typeof jsonData.imageUrl, 'string', 'Property "imageUrl" is a string');

            assert.ok(jsonData.hasOwnProperty('title'), 'Property "title" exists');
            assert.strictEqual(typeof jsonData.title, 'string', 'Property "title" is a string');

            assert.ok(jsonData.hasOwnProperty('_createdOn'), 'Property "_createdOn" exists');
            assert.strictEqual(typeof jsonData._createdOn, 'number', 'Property "_createdOn" is a number');

            assert.ok(jsonData.hasOwnProperty('_id'), 'Property "_id" exists');
            assert.strictEqual(typeof jsonData._id, 'string', 'Property "_id" is a string');

            assert.ok(jsonData.hasOwnProperty('_ownerId'), 'Property "_ownerId" exists');
            assert.strictEqual(typeof jsonData._ownerId, 'string', 'Property "_ownerId" is a string');

        });

    })

    QUnit.test("Create event", async(assert) => {
      //assert
        let path = 'data/theaters'

        let random = Math.floor(Math.random() * 10000)
       
        myEvent.title = `Random event title ${random}`;
        myEvent.description = `Description ${random}`;
 // act
        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body: JSON.stringify(myEvent)

        });
        
        let jsonData = await response.json();

        //assert

        assert.ok(response.ok, 'successful response')
        

        assert.ok(jsonData.hasOwnProperty('author'), 'Property author exists');
        assert.strictEqual(jsonData.author, myEvent.author, "Author is expected")
        assert.strictEqual(typeof jsonData.author, 'string', 'Property author is a string');


        assert.ok(jsonData.hasOwnProperty('date'), 'Property date exists');
        assert.strictEqual(jsonData.date, myEvent.date, "Date is expected")
        assert.strictEqual(typeof jsonData.date, 'string', 'Property date is a string');

        assert.ok(jsonData.hasOwnProperty('description'), 'Property description exists');
        assert.strictEqual(jsonData.description, myEvent.description, "Description is expected")
        assert.strictEqual(typeof jsonData.description, 'string', 'Property description is a string');

        assert.ok(jsonData.hasOwnProperty('imageUrl'), 'Property "imageUrl" exists');
        assert.strictEqual(jsonData.imageUrl, myEvent.imageUrl, "ImgURL is expected")
        assert.strictEqual(typeof jsonData.imageUrl, 'string', 'Property "imageUrl" is a string');

        assert.ok(jsonData.hasOwnProperty('title'), 'Property "title" exists');
        assert.strictEqual(jsonData.title, myEvent.title, "title is expected")
        assert.strictEqual(typeof jsonData.title, 'string', 'Property "title" is a string');

        assert.ok(jsonData.hasOwnProperty('_createdOn'), 'Property "_createdOn" exists');
        assert.strictEqual(typeof jsonData._createdOn, 'number', 'Property "_createdOn" is a number');

        assert.ok(jsonData.hasOwnProperty('_id'), 'Property "_id" exists');
        assert.strictEqual(typeof jsonData._id, 'string', 'Property "_id" is a string');

        assert.ok(jsonData.hasOwnProperty('_ownerId'), 'Property "_ownerId" exists');
        assert.strictEqual(typeof jsonData._ownerId, 'string', 'Property "_ownerId" is a string');

        lastCreatedEventId = jsonData._id;
        
    })

    QUnit.test("Edit event", async(assert) => {
        //arrange

        let path = 'data/theaters';

        let random = Math.floor(Math.random() * 100000);
        myEvent.title = `Edited event title_${random}`;

        //act
        let response = await fetch(baseUrl + path + `/${lastCreatedEventId}`, {
            method : 'PUT',
            headers : {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body : JSON.stringify(myEvent)
        });

        let jsonData = await response.json();

// assert
        assert.ok(response.ok, "successful response");

        
             

        assert.ok(jsonData.hasOwnProperty('author'), 'Property author exists');
        assert.strictEqual(jsonData.author, myEvent.author, "Author is expected")
        assert.strictEqual(typeof jsonData.author, 'string', 'Property author is a string');


        assert.ok(jsonData.hasOwnProperty('date'), 'Property date exists');
        assert.strictEqual(jsonData.date, myEvent.date, "Date is expected")
        assert.strictEqual(typeof jsonData.date, 'string', 'Property date is a string');

        assert.ok(jsonData.hasOwnProperty('description'), 'Property description exists');
        assert.strictEqual(jsonData.description, myEvent.description, "Description is expected")
        assert.strictEqual(typeof jsonData.description, 'string', 'Property description is a string');

        assert.ok(jsonData.hasOwnProperty('imageUrl'), 'Property "imageUrl" exists');
        assert.strictEqual(jsonData.imageUrl, myEvent.imageUrl, "ImgURL is expected")
        assert.strictEqual(typeof jsonData.imageUrl, 'string', 'Property "imageUrl" is a string');

        assert.ok(jsonData.hasOwnProperty('title'), 'Property "title" exists');
        assert.strictEqual(jsonData.title, myEvent.title, "title is expected")
        assert.strictEqual(typeof jsonData.title, 'string', 'Property "title" is a string');

        assert.ok(jsonData.hasOwnProperty('_createdOn'), 'Property "_createdOn" exists');
        assert.strictEqual(typeof jsonData._createdOn, 'number', 'Property "_createdOn" is a number');

        assert.ok(jsonData.hasOwnProperty('_id'), 'Property "_id" exists');
        assert.strictEqual(typeof jsonData._id, 'string', 'Property "_id" is a string');

        assert.ok(jsonData.hasOwnProperty('_ownerId'), 'Property "_ownerId" exists');
        assert.strictEqual(typeof jsonData._ownerId, 'string', 'Property "_ownerId" is a string');

        lastCreatedEventId = jsonData._id;
        
    })

    QUnit.test("Delete event", async(assert) => {
        let path = 'data/theaters';


        let response = await fetch(baseUrl + path + `/${lastCreatedEventId}`, {
            method : 'DELETE',
            headers : {
                'X-Authorization' : token
            }
        });

        assert.ok(response.ok, "successful response");

    })

})

