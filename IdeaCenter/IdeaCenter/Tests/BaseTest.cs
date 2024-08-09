using IdeaCenter.Pages;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace IdeaCenter.Tests
{
    public class BaseTest
    {

        public IWebDriver driver;
        public LoginPage loginPage;
        public CreateIdeaPage createIdeaPage;
        public MyIdeasPage myIdeasPage;
        public IdeasReadPage ideasReadPage;
        public IdeasEditPagecs ideasEditPage;
        
        
        [OneTimeSetUp]
        public void OneTimeSetUp()
        {
            var chromeOptions = new ChromeOptions();
            chromeOptions.AddUserProfilePreference("profile.password_manager_enabled", false);
            chromeOptions.AddArgument("--disable-search-engine-choice-screen");

            driver = new ChromeDriver(chromeOptions);
            driver.Manage().Window.Maximize();
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);


            loginPage = new LoginPage(driver);

            createIdeaPage = new CreateIdeaPage(driver);

            myIdeasPage = new MyIdeasPage(driver);

            ideasReadPage = new IdeasReadPage(driver);

            ideasEditPage = new IdeasEditPagecs(driver);


            loginPage.OpenPage();
            loginPage.Login("teodora_vladimirova88@abv.bg", "Parola123");
        }

        [OneTimeTearDown] public void OneTimeTearDown()
        {
            driver.Quit();
            driver.Dispose();
                
        }

        public string GenerateRandomString(int length)
        {
            const string chars = "gdfkjlmnvc";
            var random = new Random();
            return new string (Enumerable.Repeat(chars, length).Select(s => s[random.Next(s.Length)]).ToArray());
        }
        
    }
}