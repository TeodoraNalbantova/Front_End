using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Interactions;
using static System.Net.Mime.MediaTypeNames;
using static System.Net.WebRequestMethods;

namespace RevueCraftersSeleniumWebDriverTests
{
    public class Tests
    {
        private IWebDriver driver;
        private Actions actions;
        private static string lastCreatedRevueTitle;
        private static string lastCreatedRevueDescription;

        private static string BaseUrl = "https://d3s5nxhwblsjbi.cloudfront.net";
        [OneTimeSetUp]
        public void OneTimeSetup()
        {

            var chromeOptions = new ChromeOptions();
            chromeOptions.AddUserProfilePreference("profile.password_manager_enabled", false);
            chromeOptions.AddArgument("--disable-search-engine-choice-screen");


            driver = new ChromeDriver(chromeOptions);


            driver.Navigate().GoToUrl(BaseUrl);
            driver.Manage().Window.Maximize();

            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);

            // Log in to the application
            driver.Navigate().GoToUrl($"{BaseUrl}/Users/Login");
            var loginForm = driver.FindElement(By.Id("loginForm"));

            // Scroll to the login form using Actions class
            actions = new Actions(driver);
            actions.ScrollToElement(loginForm).Perform();


            driver.FindElement(By.Id("form3Example3")).SendKeys("teddy@abv.bg");
            driver.FindElement(By.Id("form3Example4")).SendKeys("123456");

            driver.FindElement(By.CssSelector(".btn")).Click();



        }

        [OneTimeTearDown] public void OneTimeTearDown() 
        { 
            driver.Dispose();
            driver.Close();

        }

        [Test, Order(1)]
        public void CreateRevueWithInvalidDataTest()
        {
            driver.Navigate().GoToUrl($"{BaseUrl}/Revue/Create");

            var formCard = driver.FindElement(By.CssSelector(".card-body"));
            actions.ScrollToElement(formCard).Perform();

            var titleInput = driver.FindElement(By.Id("form3Example1c"));
            titleInput.Click();
            titleInput.SendKeys("");

            var descriptionInput = driver.FindElement(By.Id("form3Example4cd"));
            descriptionInput.Click();
            descriptionInput.SendKeys("");

          
            driver.FindElement(By.CssSelector(".btn.btn-lg.btn-primary")).Click();

            var currentUrl = driver.Url;
            Assert.That(currentUrl, Is.EqualTo($"{BaseUrl}/Revue/Create"), "The page should remain on the creation page with invalid data.");

            var errorMesage = driver.FindElement(By.XPath("//li[contains(.,'Unable to create new Revue!')]"));

            Assert.That(errorMesage.Text, Is.EqualTo("Unable to create new Revue!"), "The error message for invalid message is not correct or present!");

            var titleErrorMesage = driver.FindElement(By.XPath("(//span[contains(@class,'text-danger field-validation-error')])[1]"));

            Assert.That(titleErrorMesage.Text, Is.EqualTo("The Title field is required."), "The title error message for invalid message is not correct or present!");

            var descriptionErrorMesage = driver.FindElement(By.XPath("/html//section[@id='createRevue']/div[@class='container h-100']/div//div[@class='card text-black']//form[@method='post']//span[.='The Description field is required.']"));

            Assert.That(descriptionErrorMesage.Text, Is.EqualTo("The Description field is required."), "The description error message for invalid message is not correct or present!");


        }


        [Test, Order(2)]
        public void CreateRevueWithValidDataTest()
        {
            lastCreatedRevueTitle = "Revue N: " + GenerateRandomString(5);
            lastCreatedRevueDescription = "Revue Description: " + GenerateRandomString(10);

            driver.Navigate().GoToUrl($"{BaseUrl}/Revue/Create");

            var formCard = driver.FindElement(By.CssSelector(".card-body"));
            actions.ScrollToElement(formCard).Perform();

            var titleInput = driver.FindElement(By.Id("form3Example1c"));
            titleInput.Click();
            titleInput.SendKeys(lastCreatedRevueTitle);

            var descriptionInput = driver.FindElement(By.Id("form3Example4cd"));
            descriptionInput.Click();
            descriptionInput.SendKeys(lastCreatedRevueDescription);

            driver.FindElement(By.CssSelector("button.btn.btn-primary.btn-lg")).Click();

            var currentUrl = driver.Url;
            Assert.That(currentUrl, Is.EqualTo($"{BaseUrl}/Revue/MyRevues"), "TThe page should redirect to My Revues.");

            var revues = driver.FindElements(By.CssSelector(".card.mb-4"));
            var lastRevueTitleElement = revues.Last().FindElement(By.CssSelector(".text-muted"));  


            string actualRevueTitle = lastRevueTitleElement.Text.Trim();

            Assert.That(actualRevueTitle, Is.EqualTo(lastCreatedRevueTitle), "The last created revue title does not match the expected value.");

        }

        [Test, Order(3)]
        public void SearchRevueByTitleTest()
        {

            driver.Navigate().GoToUrl($"{BaseUrl}/Revue/MyRevues");

            var searchField = driver.FindElement(By.Id("keyword"));
            actions.ScrollToElement(searchField).Perform();

            searchField.SendKeys(lastCreatedRevueTitle);
            driver.FindElement(By.Id("search-button")).Click();

            var searchResutRevueTitle = driver.FindElement(By.CssSelector(".text-muted")).Text;
            Assert.That(searchResutRevueTitle, Is.EqualTo(lastCreatedRevueTitle), "The search resulting Revue is not present on the screen.");


        }
        [Test, Order(4)]
        public void EditLastCreatedRevueTitleTest()
        {
           

            driver.Navigate().GoToUrl($"{BaseUrl}/Revue/MyRevues");

            
            var revues = driver.FindElements(By.CssSelector(".card.mb-4"));


            Assert.IsTrue(revues.Count > 0, "No revues were found on the page.");


            var lastRevue = revues.Last();
            actions.ScrollToElement(lastRevue).Perform();


            var editButton = lastRevue.FindElement(By.CssSelector("a[href*='/Revue/Edit']"));
            editButton.Click();

            var editForm = driver.FindElement(By.CssSelector("div.card-body.p-md-5"));
            actions.MoveToElement(editForm).Perform();

            var titleInput =driver.FindElement(By.Id("form3Example1c"));
            string newTitle = "Changed Title -" + lastCreatedRevueTitle;

            titleInput.Clear();
            titleInput.SendKeys(newTitle);

            var saveChagesButton = driver.FindElement(By.CssSelector(".btn.btn-lg.btn-primary"));
            saveChagesButton.Click();

            string currentUrl = driver.Url;
            Assert.That(currentUrl, Is.EqualTo($"{BaseUrl}/Revue/MyRevues"), "The page should redirect to My Revues.");

            revues = driver.FindElements(By.CssSelector("div.card.mb-4.box-shadow"));
            var lastRevueTitleElement = revues.Last().FindElement(By.CssSelector("div.text-muted.text-center"));

            string actualRevueTitle = lastRevueTitleElement.Text.Trim();

            Assert.That(actualRevueTitle, Is.EqualTo(newTitle), "The last created revue title does not match the expected value.");

        }


        [Test, Order(5)]
        public void DeleteLastCreatedRevueTitleTest()
        {
            driver.Navigate().GoToUrl($"{BaseUrl}/Revue/MyRevues#myRevues");

            var revues = driver.FindElements(By.CssSelector("div.card.mb-4.box-shadow"));
            Assert.IsTrue(revues.Count > 0, "No revues were found on the page.");

            var lastRevueElement = revues.Last();
            actions.MoveToElement(lastRevueElement).Perform();

            var deleteButton = lastRevueElement.FindElement(By.CssSelector("a[href*='/Revue/Delete']"));
            deleteButton.Click();

            string currentUrl = driver.Url;
            Assert.That(currentUrl, Is.EqualTo($"{BaseUrl}/Revue/MyRevues"), "The page should be My Revues.");

            var revuesResult = driver.FindElements(By.CssSelector("div.card.mb-4.box-shadow"));
            Assert.That(revuesResult.Count(), Is.LessThan(revues.Count), "The number of Revues did not change.");

            var lastRevueTitle = revuesResult.Last().FindElement(By.CssSelector(".text-muted")).Text;
            Assert.That(lastRevueTitle, !Is.EqualTo(lastCreatedRevueTitle));
        }


        [Test, Order(6)]
        public void TestNonExistingRevue()
        {
            driver.Navigate().GoToUrl($"{BaseUrl}/Revue/MyRevues#myRevues");

            var searchField = driver.FindElement(By.CssSelector(".input-group.mb-xl-5"));
            actions.MoveToElement(searchField).Perform();

            var searchInput = driver.FindElement(By.Name("keyword"));
            searchInput.SendKeys(lastCreatedRevueTitle);

            var searchButton = driver.FindElement(By.Id("search-button"));
            searchButton.Click();

            // Assert that the message "No Revues yet!" is displayed
            var noRevuesMessage = driver.FindElement(By.CssSelector(".col-12.text-muted"));
            Assert.That(noRevuesMessage.Text.Trim(), Is.EqualTo("No Revues yet!"), "The 'No Revues yet!' message is not displayed as expected.");



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