const baseUrl = 'http://localhost:3030/';

let user = {
    email : "",
    password : "123456"
};

let token = "";
let userId = "";

let lastCreatedGameId = "";
let game = {
    title : "",
    category : "",
    maxLevel : "71",
    imageUrl : "./images/ZombieLang.png",
    summary : ""
};

let gameIdForComments = "";

QUnit.config.reorder = false;

QUnit.module('user functionalities', () => {
    QUnit.test("registration", async(assert)=> {
        //arrange
        let path = 'users/register';
        let random = Math.floor(Math.random() * 10000);
        let email = `abv${random}@abv.bg`;
        user.email = email;

        //act
        let response = await fetch(baseUrl + path, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        
        let json = await response.json();

        //assert
        assert.ok(response.ok, "User registered successfully");

        assert.ok(json.hasOwnProperty('email'),"email exist");
        assert.equal(json['email'],user.email, "correct expected mail");
        assert.strictEqual(typeof json.email, 'string', "Property 'email' is a string");
       
        assert.ok(json.hasOwnProperty('password'),"password exist");
        assert.equal(json['password'],user.password, "correct expected pass");
        assert.strictEqual(typeof json.password, 'string', "Property 'password' is a string");


 
        assert.ok(json.hasOwnProperty('accessToken'),"AccessToken exist"); // check for id
        assert.strictEqual(typeof json.accessToken , 'string', "Property 'AccessToken' is a string");


        assert.ok(json.hasOwnProperty('_id'),"id exist"); // check for id
        assert.strictEqual(typeof json._id, 'string', "Property '_id' is a string");

        token = json['accessToken']; // get token
        userId = json['_id'] // get id 
        sessionStorage.setItem('game-user', JSON.stringify(user)); // set token to session store in browser

    })

    QUnit.test("login", async(assert) => {
        //arrange
        let path = 'users/login';

        //act
        let response = await fetch(baseUrl + path, {
            method: "POST",
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(user)
        })


        let json = await response.json();

        
        console.log(json)
        console.log(response)

        //assert
        assert.ok(response.ok, "User logged in correctly");

        assert.ok(json.hasOwnProperty('email'),"email exist");
        assert.equal(json['email'],user.email, "correct expected mail");
        assert.strictEqual(typeof json.email, 'string', "Property 'email' is a string");
       
        assert.ok(json.hasOwnProperty('password'),"password exist");
        assert.equal(json['password'],user.password, "correct expected pass");
        assert.strictEqual(typeof json.password, 'string', "Property 'password' is a string");

        assert.ok(json.hasOwnProperty('accessToken'),"AccessToken exist"); // check for id
        assert.strictEqual(typeof json.accessToken , 'string', "Property 'AccessToken' is a string");


        assert.ok(json.hasOwnProperty('_id'),"id exist"); // check for id
        assert.strictEqual(typeof json._id, 'string', "Property '_id' is a string");

        token = json['accessToken']; // get token
        userId = json['_id'] // get id 
        sessionStorage.setItem('game-user', JSON.stringify(user)); // set token to session store in browser
    })


})


QUnit.module("games functionality", () =>{
    QUnit.test("get all games", async (assert) =>{
        //arrange
        let path = 'data/games';

        let queryParams = '?sortBy=_createdOn%20desc';

        //act
        let response = await fetch(baseUrl + path + queryParams);
        let json =  await response.json();

        //assert
        assert.ok(response.ok, "Successful response");

        assert.ok(Array.isArray(json), "response is array");

        json.forEach(jsonData => {
            assert.ok(jsonData.hasOwnProperty('category'), 'Property "category" exists');
            assert.strictEqual(typeof jsonData.category, 'string', 'Property "category" is a string');

            assert.ok(jsonData.hasOwnProperty('imageUrl'), 'Property "imageUrl" exists');
            assert.strictEqual(typeof jsonData.imageUrl, 'string', 'Property "imageUrl" is a string');

            assert.ok(jsonData.hasOwnProperty('maxLevel'), 'Property "maxLevel" exists');
            assert.strictEqual(typeof jsonData.maxLevel, 'string', 'Property "maxLevel" is a string');

            assert.ok(jsonData.hasOwnProperty('title'), 'Property "title" exists');
            assert.strictEqual(typeof jsonData.title, 'string', 'Property "title" is a string');

            assert.ok(jsonData.hasOwnProperty('summary'), 'Property "summary" exists');
            assert.strictEqual(typeof jsonData.summary, 'string', 'Property "summary" is a string');

            assert.ok(jsonData.hasOwnProperty('_createdOn'), 'Property "_createdOn" exists');
            assert.strictEqual(typeof jsonData._createdOn, 'number', 'Property "_createdOn" is a number');

            assert.ok(jsonData.hasOwnProperty('_id'), 'Property "_id" exists');
            assert.strictEqual(typeof jsonData._id, 'string', 'Property "_id" is a string');

            assert.ok(jsonData.hasOwnProperty('_ownerId'), 'Property "_ownerId" exists');
            assert.strictEqual(typeof jsonData._ownerId, 'string', 'Property "_ownerId" is a string');
        });
    })

  QUnit.test('Create game', async(assert) => {
    //arrange
    let path = "data/games";
    let random = Math.floor(Math.random() * 10000);

    game.title = `Random game title ${random}`;
    game.category =`Random game category ${random},`
    game.summary = `Random summary ${random}`


    //act
    let response = await fetch(baseUrl + path, {
        method: "POST",
        headers: {
            'content-type': "application/json",
            'X-Authorization': token
        },
        body: JSON.stringify(game)
    });
    let json = await response.json();
    lastCreatedGameId = json._id;


    //assert
    assert.ok(response.ok, 'Successful response');

    assert.ok(json.hasOwnProperty("category"), 'Property category exists')
    assert.strictEqual(typeof json.category, 'string', 'Property "category" is a string');
    assert.strictEqual(json.category, game.category, 'Property "category" has the correct value');

    assert.ok(json.hasOwnProperty('imageUrl'), 'Property "imageUrl" exists');
    assert.strictEqual(typeof json.imageUrl, 'string', 'Property "imageUrl" is a string');
    assert.strictEqual(json.imageUrl, game.imageUrl, 'Property "imageUrl" has the correct value');

    assert.ok(json.hasOwnProperty('maxLevel'), 'Property "maxLevel" exists');
    assert.strictEqual(typeof json.maxLevel, 'string', 'Property "maxLevel" is a string');
    assert.strictEqual(json.maxLevel, game.maxLevel, 'Property "maxLevel" has the correct value');

    assert.ok(json.hasOwnProperty('summary'), 'Property "summary" exists');
    assert.strictEqual(typeof json.summary, 'string', 'Property "summary" is a string');
    assert.strictEqual(json.summary, game.summary, 'Property "summary" has the correct value');

    assert.ok(json.hasOwnProperty('title'), 'Property "title" exists');
    assert.strictEqual(typeof json.title, 'string', 'Property "title" is a string');
    assert.strictEqual(json.title, game.title, 'Property "title" has the correct value');

    assert.ok(json.hasOwnProperty('_createdOn'), 'Property "_createdOn" exists');
    assert.strictEqual(typeof json._createdOn, 'number', 'Property "_createdOn" is a number');

    assert.ok(json.hasOwnProperty('_id'), 'Property "_id" exists');
    assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');

    assert.ok(json.hasOwnProperty('_ownerId'), 'Property "_ownerId" exists');
    assert.strictEqual(typeof json._ownerId, 'string', 'Property "_ownerId" is a string');
    assert.strictEqual(json._ownerId, userId, 'Property "_ownerId" has the correct value');
  })
  
  QUnit.test('get by id functionality', async(assert) => {
 
    //arrange 
    let path = 'data/games/'

    //act
    let response = await fetch(baseUrl + path + `${lastCreatedGameId}`);
    let json = await response.json();

    //assert
    assert.ok(response.ok, 'Successful response');

    assert.ok(json.hasOwnProperty("category"), 'Property category exists')
    assert.strictEqual(typeof json.category, 'string', 'Property "category" is a string');
    assert.strictEqual(json.category, game.category, 'Property "category" has the correct value');

    assert.ok(json.hasOwnProperty('imageUrl'), 'Property "imageUrl" exists');
    assert.strictEqual(typeof json.imageUrl, 'string', 'Property "imageUrl" is a string');
    assert.strictEqual(json.imageUrl, game.imageUrl, 'Property "imageUrl" has the correct value');

    assert.ok(json.hasOwnProperty('maxLevel'), 'Property "maxLevel" exists');
    assert.strictEqual(typeof json.maxLevel, 'string', 'Property "maxLevel" is a string');
    assert.strictEqual(json.maxLevel, game.maxLevel, 'Property "maxLevel" has the correct value');

    assert.ok(json.hasOwnProperty('summary'), 'Property "summary" exists');
    assert.strictEqual(typeof json.summary, 'string', 'Property "summary" is a string');
    assert.strictEqual(json.summary, game.summary, 'Property "summary" has the correct value');

    assert.ok(json.hasOwnProperty('title'), 'Property "title" exists');
    assert.strictEqual(typeof json.title, 'string', 'Property "title" is a string');
    assert.strictEqual(json.title, game.title, 'Property "title" has the correct value');

    assert.ok(json.hasOwnProperty('_createdOn'), 'Property "_createdOn" exists');
    assert.strictEqual(typeof json._createdOn, 'number', 'Property "_createdOn" is a number');

    assert.ok(json.hasOwnProperty('_id'), 'Property "_id" exists');
    assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');

    assert.ok(json.hasOwnProperty('_ownerId'), 'Property "_ownerId" exists');
    assert.strictEqual(typeof json._ownerId, 'string', 'Property "_ownerId" is a string');
    assert.strictEqual(json._ownerId, userId, 'Property "_ownerId" has the correct value');

  })

  QUnit.test('edit game', async (assert) => {
 //arrange
 let path = 'data/games'
 let random  = Math.floor(Math.random() * 10000);
 game.title = `Updated title ${random}`
 game.category = `Updated category ${random}`
 game.summary = `updated summary ${random}`

 //act 
 let response = await fetch(baseUrl + path + `/${lastCreatedGameId}`,{
    method: 'PUT',
    headers:{
        'content-type': 'application//json',
        'X-authorization': token
    },
    body: JSON.stringify(game)
 })
let json = await response.json()

 //assert
 assert.ok(response.ok, 'Successful response');

 assert.ok(json.hasOwnProperty("category"), 'Property category exists')
 assert.strictEqual(typeof json.category, 'string', 'Property "category" is a string');
 assert.strictEqual(json.category, game.category, 'Property "category" has the correct value');

 assert.ok(json.hasOwnProperty('imageUrl'), 'Property "imageUrl" exists');
 assert.strictEqual(typeof json.imageUrl, 'string', 'Property "imageUrl" is a string');
 assert.strictEqual(json.imageUrl, game.imageUrl, 'Property "imageUrl" has the correct value');

 assert.ok(json.hasOwnProperty('maxLevel'), 'Property "maxLevel" exists');
 assert.strictEqual(typeof json.maxLevel, 'string', 'Property "maxLevel" is a string');
 assert.strictEqual(json.maxLevel, game.maxLevel, 'Property "maxLevel" has the correct value');

 assert.ok(json.hasOwnProperty('summary'), 'Property "summary" exists');
 assert.strictEqual(typeof json.summary, 'string', 'Property "summary" is a string');
 assert.strictEqual(json.summary, game.summary, 'Property "summary" has the correct value');

 assert.ok(json.hasOwnProperty('title'), 'Property "title" exists');
 assert.strictEqual(typeof json.title, 'string', 'Property "title" is a string');
 assert.strictEqual(json.title, game.title, 'Property "title" has the correct value');

 assert.ok(json.hasOwnProperty('_createdOn'), 'Property "_createdOn" exists');
 assert.strictEqual(typeof json._createdOn, 'number', 'Property "_createdOn" is a number');

 assert.ok(json.hasOwnProperty('_id'), 'Property "_id" exists');
 assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');

 assert.ok(json.hasOwnProperty('_ownerId'), 'Property "_ownerId" exists');
 assert.strictEqual(typeof json._ownerId, 'string', 'Property "_ownerId" is a string');
 assert.strictEqual(json._ownerId, userId, 'Property "_ownerId" has the correct value');

 assert.ok(json.hasOwnProperty('_updatedOn'), 'UpdatedOn "_updatedOn" exists');
 assert.strictEqual(typeof json._updatedOn, 'number', 'Property "_updatedOn" is a string');
 
  })

  QUnit.test('delete game', async (assert) => {
    
    //arrange
    let path = 'data/games';

   
  // act
  let response = await fetch(baseUrl + path + `/${lastCreatedGameId}`,{
    method: 'DELETE',
    headers: { 'X-Authorization': token }
  });
  
  //assert
  assert.ok(response.ok, 'successful delete')

  })

});

QUnit.module('comments functionalities', () => {
    QUnit.test("newly created game - no comments (empty array)", async (assert) => {

        //arrange
        let path = 'data/comments';
        
        //create new game and get Id:
        let gameId = (await fetch(baseUrl + 'data/games', {
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body : JSON.stringify(game)
        })
        .then(response => response.json()))._id;

        gameIdForComments = gameId;

        let queryParams = `?where=gameId%3D%22${gameId}%22`;

        //act
        let response = await fetch(baseUrl + path + queryParams)
        let json = await response.json();


        //assert
        assert.ok(response.ok, "successful response");
        assert.ok(Array.isArray(json), "response is array");
        assert.ok(json.length === 0, "array is empty");
    });

    QUnit.test("post new comment", async (assert) => {
        //arrange
        let path = 'data/comments';

        let random =  Math.floor(Math.random() * 1000);

        let comment = {
            gameId : gameIdForComments,
            comment  : `comment value`
        };
        //act 
        let response = await fetch(baseUrl + path, {
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body : JSON.stringify(comment)
        });
         // assert
        assert.ok(response.ok, "successful response");

        let json = await response.json();
        
        assert.ok(json.hasOwnProperty('comment'), 'Property "comment" exists');
        assert.strictEqual(typeof json.comment, 'string', 'Property "comment" is a string');
        assert.strictEqual(json.comment, comment.comment, 'Property "comment" has the correct value');

        assert.ok(json.hasOwnProperty('gameId'), 'Property "gameId" exists');
        assert.strictEqual(typeof json.gameId, 'string', 'Property "gameId" is a string');
        assert.strictEqual(json.gameId, comment.gameId, 'Property "gameId" has the correct value');

        assert.ok(json.hasOwnProperty('_createdOn'), 'Property "_createdOn" exists');
        assert.strictEqual(typeof json._createdOn, 'number', 'Property "_createdOn" is a number');

        assert.ok(json.hasOwnProperty('_id'), 'Property "_id" exists');
        assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');
    });

    QUnit.test("get comments for specific game", async (assert) => {
        
        //arrange
        let path = 'data/comments';
        
        let queryParams = `?where=gameId%3D%22${gameIdForComments}%22`;
        //act
        let response = await fetch(baseUrl + path + queryParams)
        let json = await response.json();

  // assert
        assert.ok(response.ok, "successful response");
      
        assert.ok(Array.isArray(json), "Response should be an array");

        json.forEach(comment => {
            assert.ok(comment.hasOwnProperty('_ownerId'), "Comment should have _ownerId property");
            assert.strictEqual(typeof comment._ownerId, "string", "_ownerId should be a string");
           
            assert.ok(comment.hasOwnProperty('gameId'), "Comment should have gameId property");
            assert.strictEqual(typeof comment.gameId, "string", "gameId should be a string");
            
            assert.ok(comment.hasOwnProperty('comment'), "Comment should have comment property");
            assert.strictEqual(typeof comment.comment, "string", "comment should be a string");

            assert.ok(comment.hasOwnProperty('_createdOn'), "Comment should have _createdOn property");
            assert.strictEqual(typeof comment._createdOn, "number", "_createdOn should be a number");
                
            assert.ok(comment.hasOwnProperty('_id'), "Comment should have _id property");
            assert.strictEqual(typeof comment._id, "string", "_id should be a string");
            
        })
    });


});
