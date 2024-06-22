const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const host = 'http://localhost:3000';

let browser;
let context;
let page;

let user = {
    email: '',
    password: '123456',
    confirmPassword: '123456',
};

describe("e2e tests", () => {
    beforeAll(async () => {
        browser = await chromium.launch();
    });

    afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });

    describe('authentication', () => {
        test('register makes correct API calls', async () => {
            // Arrange
            await page.goto(host);

            let random = Math.floor(Math.random() * 1000);
            user.email = `abv${random}@abv.bg`;

            // Act
            await page.click("text=Register");
            await page.waitForSelector('form');

            await page.locator("#email").fill(user.email);
            await page.locator("#register-password").fill(user.password);
            await page.locator("#confirm-password").fill(user.confirmPassword);

            const [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/register') && response.status() === 200),
                page.click('[type="submit"]')
            ]);

            const userData = await response.json();

            // Assert
            expect(response.ok()).toBeTruthy();
            expect(userData.email).toBe(user.email);
            expect(userData.password).toBe(user.password);
        });

        test("register does not work with empty fields", async() => {
            // Arrange
            await page.goto(host);

            // Act
            await page.click("text=Register");
            await page.waitForSelector('form');
            await page.click('[type="submit"]');

            // Assert
            expect(page.url()).toBe(`${host}/register`);
        });

        test("login makes correct API call", async () => {
            // Arrange
            await page.goto(host);
            await page.click('text=Login');
            await page.waitForSelector("form");

            // Act
            await page.locator('#email').fill(user.email);
            await page.locator('#login-password').fill(user.password);
            
            const [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/login') && response.status() === 200),
                page.click('[type="submit"]')
            ]);

            const userData = await response.json();

            // Assert
            expect(response.ok()).toBeTruthy();
            expect(userData.email).toBe(user.email);
            expect(userData.password).toBe(user.password);
        });

        test("login with empty fields", async () => {
            // Arrange
            await page.goto(host);

            // Act
            await page.click('text=Login');
            await page.click('[type="submit"]');

            // Assert
            expect(page.url()).toBe(`${host}/login`);
        });

        test("logout makes correct API call", async () => {
            // Arrange
            await page.goto(host);
            await page.click('text=Login');
            await page.waitForSelector("form");
            await page.locator('#email').fill(user.email);
            await page.locator('#login-password').fill(user.password);
            await page.click('[type="submit"]');

            // Act
            const [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/logout') && response.status() === 204),
                page.click('text=Logout')
            ]);

            await page.waitForSelector('text=Login');

            // Assert
            expect(response.ok()).toBeTruthy();
            expect(page.url()).toBe(`${host}/`);
        });
    });

    describe('navigation bar', () => {
        beforeEach(async () => {
            context = await browser.newContext();
            page = await context.newPage();
        });

        afterEach(async () => {
            await page.close();
            await context.close();
        });

        test("logged in user should see correct navigation buttons", async () => {
            // Arrange
            await page.goto(host);
            
            // Act
            await page.click('text=Login');
            await page.waitForSelector("form");
            await page.locator('#email').fill(user.email);
            await page.locator('#login-password').fill(user.password);

            await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/login') && response.status() === 200),
                page.click('[type="submit"]')
            ]);

            // Assert
            await page.waitForSelector('text=Logout'); // Ensure that the Logout button appears
            const logoutButton = await page.locator('text=Logout');
            expect(await logoutButton.isVisible()).toBeTruthy();

            const loginButton = await page.locator('text=Login');
            expect(await loginButton.isVisible()).toBeFalsy(); // Ensure that the Login button is hidden
        });


        test("guest user should see correct navigation buttons", async () => {
            // act
            await page.goto(host);
            
            // Act
            await page.click('text=Login');
            await page.waitForSelector("form");
            await page.locator('#email').fill(user.email);
            await page.locator('#login-password').fill(user.password);

            // Assert

            await expect(page.locator('nav >> text=All games')).toBeVisible();
            await expect(page.locator('nav >> text=Create Games')).toBeHidden();
            await expect(page.locator('nav >> text=Logout')).toBeHidden();
            await expect(page.locator('nav >> text=Login')).toBeVisible();
            await expect(page.locator('nav >> text=register')).toBeVisible();

        });

    });

    describe('Games functionality', () => {
      beforeEach(async () => {
            await page.goto(host);
            await page.click('text=Login');
            await page.waitForSelector('form');
            await page.locator("#email").fill(user.email);
            await page.locator("#login-password").fill(user.password);
            await page.click('[type="submit"]')
      })

      test('create does not work with empty fields', async () => {
        await page.click('text=Create Game');
        await page.waitForSelector('form');
        await page.click('[type="submit"]');

        expect(page.url()).toBe(host + '/create');
        })


    test('create makes correct API call for logged in user', async () => {
            await page.click('text=Create Game');
            await page.waitForSelector('form');

            await page.fill('[name="title"]', "Random title");
            await page.fill('[name="category"]', "Random category");
            await page.fill('[name="maxLevel"]', "12");
            await page.fill('[name="imageUrl"]', "https://jpeg.org/images/jpeg-home.jpg");
            await page.fill('[name="summary"]', "Random summary...");

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/data/games") && response.status() === 200),
                page.click('[type="submit"]')
            ]);

            await expect(response.ok()).toBeTruthy();
            let gameData = await response.json();
            
            expect(gameData.title).toEqual('Random title');
            expect(gameData.category).toEqual('Random category');
            expect(gameData.maxLevel).toEqual('12');
            expect(gameData.summary).toEqual('Random summary...');
        });

     test('details show edint/delete buttons for owner', async() => {
        await page.goto(host + "/catalog");

        await page.click(`.allGames .allGames-info:has-text("Random title") .details-button`);

        // assert
        await expect(page.locator('text="Delete"')).toBeVisible();
        await expect(page.locator('text="Edit"')).toBeVisible();
     })

     test('non-owner does NOT see delete and edit buttons', async () => {
        await page.goto(host + "/catalog");
        await page.click(`.allGames .allGames-info:has-text("MineCraft") >> .details-button`);

        await expect(page.locator('text="Delete"')).toBeHidden();
        await expect(page.locator('text="Edit"')).toBeHidden();
    });

    test('edit makes correct API call', async () => {
        
        await page.goto(host + "/catalog");

        await page.click(`.allGames .allGames-info:has-text("Random title") .details-button`);
        await page.click('text=Edit');

        await page.waitForSelector('form');

        await page.locator('[name="title"]').fill( 'Random title_edit');

        let [response] = await Promise.all([
            page.waitForResponse(response => response.url().includes("/data/games") && response.status() === 200),
            page.click('[type="submit"]')
        ]);

        let gameData = await response.json()
        
        expect(gameData.title).toEqual('Random title_edit');
        expect(gameData.category).toEqual('Random category');
        expect(gameData.maxLevel).toEqual('12');
        expect(gameData.summary).toEqual('Random summary...');
    })

    test ('delete makes correct API call for owner', async() => {


        await page.goto(host + "/catalog");

        await page.click(`.allGames .allGames-info:has-text("Random title_edit") .details-button`);
 //прихващаме response 
        let [response] = await Promise.all([
            page.waitForResponse(response => response.url().includes("/data/games") && response.status() === 200),
            await page.click('text=Delete')
        ]);

        expect(response.ok()).toBeTruthy();


    })

      
    })

    describe ('Home page' , () => {
        test("homepage has correct data", async () => {
            await page.goto(host);

            await expect(page.locator('.welcome-message h2')).toHaveText("ALL new games are");
            await expect(page.locator('.welcome-message h3')).toHaveText("Only in GamesPlay");
            expect(page.locator('#home-page h1')).toHaveText("Latest Games");


            const games = await page.locator('#home-page .game').all();

            expect(games.length).toBeGreaterThan(3);
        })
    })
});
