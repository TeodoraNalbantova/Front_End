import { test, expect } from '@playwright/test';

// Navigation

test('Verify "All Books" link is visible', async ({ page }) => {
    await page.goto('http://localhost:3000');
  
    await page.waitForSelector('nav.navbar');
  
    const allBooksLink = await page.$('a[href="/catalog"]');
  
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
  });
  
  test('Verify "Login" button is visible', async ({ page }) => {
    await page.goto('http://localhost:3000');
  
    await page.waitForSelector('nav.navbar');
  
    const loginButton = await page.$('a[href="/login"]');
  
    const isLoginButtonVisible = await loginButton.isVisible();
  
    expect(isLoginButtonVisible).toBe(true);
  });

  test('Verify "Register" button is visible', async ({ page }) => {
    await page.goto('http://localhost:3000');
  
    await page.waitForSelector('nav.navbar');
  
    const registerButton = await page.$('a[href="/register"]');
  
    const isRegisterButtonVisible = await registerButton.isVisible();
  
    expect(isRegisterButtonVisible).toBe(true);
    
  });

  test('Verify That the "All Books" Link Is Visible after user login.', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const allBooksLink = await page.$('a[href="/catalog"]');
    const isAllBooksLinkVisible = await allBooksLink.isVisible();

    expect(isAllBooksLinkVisible).toBe(true);

  });

  test('Verify That the "My Books" Link Is Visible after user login.', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const myBooksLink = await page.$('a[href="/profile"]');
    const isMyBooksLinkVisible = await myBooksLink.isVisible();

    expect(isMyBooksLinkVisible).toBe(true);

  });

  test('Verify That the "Add Books" Link Is Visible after user login.', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const addBooksLink = await page.$('a[href="/create"]');
    const isAddBooksLinkVisible = await addBooksLink.isVisible();

    expect(isAddBooksLinkVisible).toBe(true);

  });

  test('Verify That user  email address is visible after user login.', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const emailAddress = await page.$('span:has-text("Welcome, peter@abv.bg")');

    const isEmailAddressVisible = await emailAddress.isVisible();

    expect(isEmailAddressVisible).toBe(true);

  });

  // Login form test

  test('Login with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
  
    await page.click('input[type="submit"]');
  
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog');
  });

  test('Login with empty credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.click('input[type="submit"]');
  
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!')
        await dialog.accept()
    } );

    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');

  });

  test('Login with empty email field', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
  
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!')
        await dialog.accept()
    } );
    
    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');

  });


  test('Login with empty password field', async ({ page }) => {
    
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.click('input[type="submit"]');
  
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!')
        await dialog.accept()
    } );
    
    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');

  });

  //test Register page
  test('Register with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
  
    await page.fill('input[name="email"]', 'teddyto@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456');
  
    await page.click('input[type="submit"]');
  
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog');
  });

  test('Register with empty credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.click('input[type="submit"]');
  
    page.on('dialog', async dialog => {  // page.on е метод, който слуша за събития на страницата. dialog е събитие, което се изпраща, когато се появи диалогов прозорец (като alert, confirm или prompt).
 // async dialog => { ... } е асинхронна стрелкова функция, която приема обекта dialog и изпълнява действията в тялото на функцията.

        expect(dialog.type()).toContain('alert'); // dialog.type() връща типа на диалоговия прозорец (в този случай очакваме да е 'alert'). .toContain('alert') проверява дали типът на диалога съдържа 'alert'.

        expect(dialog.message()).toContain('All fields are required!') // dialog.message() връща съобщението на диалоговия прозорец.toContain('All fields are required!') проверява дали съобщението съдържа текста 'All fields are required!'.


        await dialog.accept() // dialog.accept() затваря диалоговия прозорец, като натиска "OK" или какъвто е подходящият бутон за потвърждение. await се използва, за да се изчака затварянето на диалога преди продължаване на изпълнението на кода.
    } );

    await page.$('a[href="/register"]'); //'a[href="/register"]' е CSS селектор, който търси линк (<a> таг) със href атрибут, чиято стойност е "/register".
    expect(page.url()).toBe('http://localhost:3000/register');

  });

  test('Register with empty email and valid password', async ({ page }) => {
    await page.goto('http://localhost:3000/register');

    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');
  
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!')
        await dialog.accept()
    } );

    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');

  });

  test('Register with empty password and valid email', async ({ page }) => {
    await page.goto('http://localhost:3000/register');

    await page.fill('input[name="email"]', 'teddy@abv.bg');

    await page.click('input[type="submit"]');
  
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!')
        await dialog.accept()
    } );

    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');

  });

  test('Register with empty confirm password and valid email and password', async ({ page }) => {
    await page.goto('http://localhost:3000/register');

    await page.fill('input[name="email"]', 'teddy@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await page.click('input[type="submit"]');
  
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!')
        await dialog.accept()
    } );

    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');

  });


  // Register with different confirm password and valid email and password
  test('Register with different confirm password and valid email and password', async ({ page }) => {
      await page.goto('http://localhost:3000/register');
  
      await page.fill('input[name="email"]', 'teddy@abv.bg');
      await page.fill('input[name="password"]', '123456');
      await page.fill('input[name="confirm-pass"]', '789456');
  
      // Set up the dialog handler before the action that will trigger it
      page.on('dialog', async dialog => {
          expect(dialog.type()).toBe('alert');
          expect(dialog.message()).toContain('Passwords don\'t match!');
          await dialog.accept();
      });
  
      await page.click('input[type="submit"]');
  
      // Assert that the page is still the register page (meaning the registration failed)
      await page.waitForURL('http://localhost:3000/register');
      expect(page.url()).toBe('http://localhost:3000/register');
  
  
    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');

  });

  //test Add book page
  test('Add book with correct data', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'), 
        page.waitForURL('http://localhost:3000/catalog')
      ]);

      await page.click('a[href="/create"]');

      await page.waitForSelector('#create-form');

      await page.fill('#title', 'Test Book');
      await page.fill('#description', 'Test description');
      await page.fill('#image', 'https://example.com/book-image.jpg');
      await page.selectOption('#type', 'Fiction');

      await page.click('#create-form input[type="submit"]');

      await page.waitForURL('http://localhost:3000/catalog');

      expect(page.url()).toBe('http://localhost:3000/catalog')


  });  


  test('Add book with empty title field', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'), 
        page.waitForURL('http://localhost:3000/catalog')
      ]);

      await page.click('a[href="/create"]');

      await page.waitForSelector('#create-form');

      await page.fill('#description', 'Test description');
      await page.fill('#image', 'https://example.com/book-image.jpg');
      await page.selectOption('#type', 'Fiction');

      await page.click('#create-form input[type="submit"]');

      page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain("All fields are required!")
        await dialog.accept();
              })

      await page.$('a[href="/create"]');
      expect(page.url()).toBe('http://localhost:3000/create');

  });  
  
  // Login and Test All Books Page

  test('Login and verify all books are displayed', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
  
    await Promise.all([
      page.click('input[type="submit"]'), 
      page.waitForURL('http://localhost:3000/catalog') 
    ]);

    await page.waitForSelector('.dashboard');

    const bookElements = await page.$$('.other-books-list li');

    expect(bookElements.length).toBeGreaterThan(0);

});

// test('Login and verify no books are displayed', async ({ page }) => {
//     await page.goto('http://localhost:3000/login');
  
//     await page.fill('input[name="email"]', 'peter@abv.bg');
//     await page.fill('input[name="password"]', '123456');
  
//     await Promise.all([
//       page.click('input[type="submit"]'), 
//       page.waitForURL('http://localhost:3000/catalog') 
//     ]);

//     await page.waitForSelector('.dashboard');

//     const noBooksMessage = await page.textContent('.no-books');

//     expect(noBooksMessage).toBe('No books in database!');

// });

// test details page
test('Login and navigate to Details page', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
  
    await Promise.all([
      page.click('input[type="submit"]'), 
      page.waitForURL('http://localhost:3000/catalog')
    ]);
  
    await page.click('a[href="/catalog"]');

    await page.waitForSelector('.otherBooks');

  await page.click('.otherBooks a.button');

  await page.waitForSelector('.book-information');

  const detailsPageTitle = await page.textContent('.book-information h3');
  expect(detailsPageTitle).toBe('Test Book'); 
});

// Verify That Guest User Sees Details Button and Button Works Correctly
test('Login as guest and navigate to Details page', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  
    await page.fill('input[name="email"]', 'teddy@abv.bg');
    await page.fill('input[name="password"]', '123456');
  
    await Promise.all([
      page.click('input[type="submit"]'), 
      page.waitForURL('http://localhost:3000/catalog')
    ]);
  
    await page.click('a[href="/catalog"]');

    await page.waitForSelector('.otherBooks');

  await page.click('.otherBooks a.button');

  await page.waitForSelector('.book-information');

  const detailsPageTitle = await page.textContent('.book-information h3');
  expect(detailsPageTitle).toBe('Test Book'); 
});

// Verify That All Info Is Displayed Correctly - Only the creator of a book must be able to see the [Edit] and [Delete] buttons. Think how to write a test to verify the app logic.
test('Verify that all info is displayed correctly and only creator sees [Edit] and [Delete] buttons', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
  
    await Promise.all([
      page.click('input[type="submit"]'), 
      page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('.otherBooks a.button'); // Navigate to the book details page
    await page.waitForSelector('.book-information');

    const editButton = await page.$('a:has-text("Edit")');
    const deleteButton = await page.$('a:has-text("Delete")');

    const isEditButtonVisible = await editButton.isVisible();
    const isDeleteButtonVisible = await deleteButton.isVisible();

    expect(isEditButtonVisible).toBe(true);
    expect(isDeleteButtonVisible).toBe(true);
});

// Verify If Edit and Delete Buttons Are Not Visible for Non-Creator
test('Verify that Edit and Delete buttons are not visible for non-creator', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  
    await page.fill('input[name="email"]', 'john@abv.bg');
    await page.fill('input[name="password"]', '123456');
  
    await Promise.all([
      page.click('input[type="submit"]'), 
      page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('.otherBooks a.button'); // Navigate to the book details page
    await page.waitForSelector('.book-information');

    const editButton = await page.$('a:has-text("Edit")');
    const deleteButton = await page.$('a:has-text("Delete")');

    expect(editButton).toBeNull();
    expect(deleteButton).toBeNull();
});



//Verify If Like Button Is Not Visible for Creator
test('Verify that Like button is not visible for creator', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
  
    await Promise.all([
      page.click('input[type="submit"]'), 
      page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('.otherBooks a.button'); // Navigate to the book details page
    await page.waitForSelector('.book-information');

    const likeButton = await page.$('a:has-text("Like")');

    expect(likeButton).toBeNull();
});



//Verify If Like Button Is Visible for Non-Creator
test('Verify that Like button is visible for non-creator', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  
    await page.fill('input[name="email"]', 'john@abv.bg');
    await page.fill('input[name="password"]', '123456');
  
    await Promise.all([
      page.click('input[type="submit"]'), 
      page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('.otherBooks a.button'); // Navigate to the book details page
    await page.waitForSelector('.book-information');

    const likeButton = await page.$('a:has-text("Like")');
    const isLikeButtonVisible = await likeButton.isVisible();

    expect(isLikeButtonVisible).toBe(true);
});


// Log out

test('Verify visibility of Logout button after user login', async ({page}) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const logoutLink = await page.$('a[id="logoutBtn"]');

    const isLogoutLinkVisible = await logoutLink.isVisible();

  expect(isLogoutLinkVisible).toBe(true);

})

test('Verify redirection of Logout link after user login', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
  
    const logoutLink = await page.$('a[id="logoutBtn"]');
    await logoutLink.click();
  
    const redirectedURL = page.url(); // Retrieves the current URL after clicking the logout link.

    expect(redirectedURL).toBe('http://localhost:3000/catalog');
  });
