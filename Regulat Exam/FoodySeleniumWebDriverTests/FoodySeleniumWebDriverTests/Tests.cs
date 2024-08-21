using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Interactions;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace FoodySeleniumWebDriverTests
{
    public class Tests
    {
        protected IWebDriver driver;
        private Actions actions;
        private static readonly string BaseUrl = "http://softuni-qa-loadbalancer-2137572849.eu-north-1.elb.amazonaws.com:85/";
        private static string? lastCreatedFoodTitle;
        private static string? lastCreatedFoodDescription;

        [OneTimeSetUp]
        public void OneTimeSetup()
        {
            var chromeOptions = new ChromeOptions();
            chromeOptions.AddUserProfilePreference("profile.password_manager_enabled", false);
            chromeOptions.AddArgument("--disable-search-engine-choice-screen");

            driver = new ChromeDriver(chromeOptions);
            driver.Manage().Window.Maximize();
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);

            // Initialize Actions instance
            actions = new Actions(driver);

            // Log in to the application
            driver.Navigate().GoToUrl(BaseUrl);
            var loginBtn = driver.FindElement(By.XPath("//a[@href='/User/Login']"));

            // Click the login button
            loginBtn.Click();

            // Fill in login details
            driver.FindElement(By.Id("username")).SendKeys("Ted");
            driver.FindElement(By.Id("password")).SendKeys("123456");
            driver.FindElement(By.XPath("//button[@type='submit']")).Click();

        }
        [OneTimeTearDown]
        public void OneTimeTearDown()
        {

            driver.Quit();
            driver.Close();
        }

        [Test, Order(1)]
        public void AddFoodWithInvalidDataTest()
        {
            driver.Navigate().GoToUrl($"{BaseUrl}Food/Add");


            string invalidTitle = "";
            string invalidDescription = "";

            var titleField = driver.FindElement(By.Id("name"));
            titleField.Clear();
            titleField.SendKeys(invalidTitle);

            var descriptionField = driver.FindElement(By.Id("description"));
            descriptionField.Clear();
            descriptionField.SendKeys(invalidDescription);

            var addButton = driver.FindElement(By.XPath("//button[contains(@type,'submit')]"));
            addButton.Click();


            var currentUrl = driver.Url;
            Assert.That(currentUrl, Is.EqualTo($"{BaseUrl}Food/Add"), "The page should remain on the creation page.");

            var errorMessage = driver.FindElement(By.XPath("//li[contains(.,'Unable to add this food revue!')]"));

            Assert.That(errorMessage.Text, Is.EqualTo("Unable to add this food revue!"), "The error message for invalid message is not correct or present!");


            var titleErrorMessage = driver.FindElement(By.XPath("//span[@class='text-danger field-validation-error'][contains(.,'The Name field is required.')]"));

            Assert.That(titleErrorMessage.Text, Is.EqualTo("The Name field is required."), "The title error message for invalid message is not correct or present!");

            var descriptionErrorMessage = driver.FindElement(By.XPath("//span[@class='text-danger field-validation-error'][contains(.,'The Description field is required.')]"));

            Assert.That(descriptionErrorMessage.Text, Is.EqualTo("The Description field is required."), "The description error message for invalid message is not correct or present!");

        }


        [Test, Order(2)]
        public void AddFoodWithValidDataTest()
        {
            driver.Navigate().GoToUrl($"{BaseUrl}Food/Add");

            string lastCreatedFoodTitle = "Food " + GenerateRandomString(5);
            string lastCreatedFoodDescription = "Description: " + GenerateRandomString(10);

            var titleField = driver.FindElement(By.Id("name"));
            titleField.Clear();
            titleField.SendKeys(lastCreatedFoodTitle);

            var descriptionField = driver.FindElement(By.Id("description"));
            descriptionField.Clear();
            descriptionField.SendKeys(lastCreatedFoodDescription);

            var addButton = driver.FindElement(By.XPath("//button[contains(@type,'submit')]"));
            addButton.Click();

            var currentUrl = driver.Url;
            Assert.That(currentUrl, Is.EqualTo($"{BaseUrl}"), "The page should redirect to Home Page");

            var foods = driver.FindElements(By.XPath("(//div[@class='p-5'])"));
            var lastFoodTitle = foods.Last().FindElement(By.CssSelector("h2.display-4"));

            string actualFoodTitle = lastFoodTitle.Text.Trim();

            Assert.That(actualFoodTitle, Is.EqualTo(lastCreatedFoodTitle), "The last created food title does not match the expected value.");
            
        }



        [Test, Order(3)]
        public void EditLastAddedFood()
        {

            var foods = driver.FindElements(By.XPath("(//div[@class='p-5'])"));
            var lastFood = foods.Last();
            actions.MoveToElement(lastFood).Perform();

            var editButton = lastFood.FindElement(By.CssSelector("a[href*='/Food/Edit']"));
            editButton.Click();

            string newTitle = "Changed Title - " + lastCreatedFoodTitle;


            var titleField = driver.FindElement(By.Id("name"));
            titleField.Clear();
            titleField.SendKeys(newTitle);

            var addButton = driver.FindElement(By.XPath("//button[contains(@type,'submit')]"));
            addButton.Click();


            var updatedFoods = driver.FindElements(By.XPath("//div[@class='p-5']"));
            var lastFoodTitle = updatedFoods.Last().FindElement(By.CssSelector("h2.display-4"));
            string actualFoodTitle = lastFoodTitle.Text.Trim();

            Assert.That(actualFoodTitle, Is.Not.EqualTo(newTitle), "The last created food title does not change due to incomplete functionality.");

        }

        [Test, Order(4)]
        public void SearchForFoodTitleTest()
        {

            driver.Navigate().GoToUrl(BaseUrl);

            var foods = driver.FindElements(By.XPath("//div[@class='row gx-5 align-items-center']"));

            var lastFood = foods.Last();
            var lastFoodTitle = lastFood.FindElement(By.CssSelector("h2.display-4")).Text;

            var searchField = driver.FindElement(By.XPath("//input[@type='search']"));
          
            searchField.SendKeys(lastFoodTitle);

            driver.FindElement(By.XPath("//button[contains(@type,'submit')]")).Click();

            var searchResults = driver.FindElements(By.CssSelector("h2.display-4"));

            var searchResultFoodTitle = searchResults.First().Text;


            Assert.That(searchResultFoodTitle, Is.EqualTo(lastFoodTitle), "The searched food is not present on the screen.");

            Assert.That(searchResults.Count, Is.EqualTo(1), "The search did not return exactly one result.");


        }


        [Test, Order(5)]
        public void DeleteLastAddedFoodTest()
        {
            driver.Navigate().GoToUrl($"{BaseUrl}");

            var foodsBeforeDeletion = driver.FindElements(By.XPath("(//div[@class='p-5'])"));
            int initialFoodCount = foodsBeforeDeletion.Count;

            var lastFood = foodsBeforeDeletion.Last();
            actions.MoveToElement(lastFood).Perform();

            var lastFoodTitleBeforeDeletion = lastFood.FindElement(By.CssSelector(".display-4")).Text;


            var deleteButton = lastFood.FindElement(By.CssSelector("a[href*='/Food/Delete']"));
            deleteButton.Click();

            var foodsAfterDeletion = driver.FindElements(By.XPath("//div[@class='p-5']"));
            int finalFoodCount = foodsAfterDeletion.Count;
            
            var lastFoodTitleAfterDeletion = foodsAfterDeletion.Last().FindElement(By.CssSelector(".display-4")).Text;
            Assert.That(lastFoodTitleAfterDeletion, Is.Not.EqualTo(lastFoodTitleBeforeDeletion), "The last food item was not deleted successfully.");

            Assert.That(finalFoodCount, Is.LessThan(initialFoodCount), "The food item was not deleted successfully.");



        }

        [Test, Order(6)]
        public void Search_DeletedFood_Test()
        {
            driver.Navigate().GoToUrl($"{BaseUrl}");

            var searchField = driver.FindElement(By.XPath("//input[@type='search']"));

            searchField.SendKeys(lastCreatedFoodTitle);
            driver.FindElement(By.XPath("//button[contains(@type,'submit')]")).Click();


            var searchResult = driver.FindElement(By.XPath("//h2[@class='display-4']"));
            Assert.That(searchResult.Text, Is.EqualTo("There are no foods :("));

            var addButton = driver.FindElement(By.CssSelector("a.nav-link[href='/Food/Add']"));
            Assert.True(addButton.Displayed);
        }





        private string GenerateRandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

    }
}