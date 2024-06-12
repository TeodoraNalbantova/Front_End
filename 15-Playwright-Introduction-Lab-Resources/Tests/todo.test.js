const { test, expect } = require("@playwright/test");

//verify user can add task
test('user can add task', async({ page }) => {
    // Arrange
    await page.goto('http://localhost:3000');

    // Act
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task'); // Use the correct selector for the button

    // Assert
    const taskText = await page.textContent('.task');
    expect(taskText).toContain('Test Task');
});

// verify user can delete task
test('user can delete task', async ({ page }) => {
    //add a task
    await page.goto('http://localhost:3000');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');

    //delete the task
    await page.click('.task .delete-task');

    const tasks = await page.$$eval('.task', tasks => tasks.map(
        task => task.textContent
    ))
    expect(tasks).not.toContain('Test Task')
})

//Verify if a user can mark a task as complete 

test('user can mark a task as complete', async ({ page }) => {
    // Arrange: Navigate to the application and add a task
    await page.goto('http://localhost:3000');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
  
    // Act: Mark the task as complete
    await page.click('.task .task-complete');
  
    // Assert: Verify the task has been marked as complete
    const completedTask = await page.$('.task.completed');
    expect(completedTask).not.toBeNull();
  });

  //Verify if a user can filter task  

test('user can filter task', async ({ page }) => {
//add a task
    await page.goto('http://localhost:3000');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
//mark the task as complete
    await page.click('.task .task-complete');
// filter task
    await page.selectOption('#filter','Completed');
// assert
    const incompleteTasks = await page.$('.task:not(.completed)');
    expect(incompleteTasks).toBeNull();
});

//В Playwright, символът $ се използва като кратка нотация за методи, които избират елементи от страницата. Има две основни версии на този метод:
//page.$(selector): Намира първия елемент, който отговаря на дадения CSS селектор. Връща ElementHandle или null, ако не съществува такъв елемент.
//page.$$(selector): Намира всички елементи, които отговарят на дадения CSS селектор. Връща масив от ElementHandle.

  

