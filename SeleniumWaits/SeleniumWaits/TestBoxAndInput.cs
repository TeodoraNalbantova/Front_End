
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using SeleniumExtras.WaitHelpers;

namespace SeleniumWaits
{
    public class TestBoxAndInput
    {
        IWebDriver driver;
        [SetUp]
        public void Setup()
        {
            driver = new ChromeDriver();
            

        }
        [TearDown]
        public void Teardown()
        {
            driver.Quit();
            driver.Dispose();
           
        }

        [Test]
        public void redBoxInteraction()
        {
            driver.Navigate().GoToUrl("https://www.selenium.dev/selenium/web/dynamic.html");

            driver.FindElement(By.XPath("//input[@id='adder']")).Click();

            var redBoxDiv = driver.FindElement(By.XPath("//input[@id='box0']"));

            Assert.True(redBoxDiv.Displayed);
        }
        
        [Test]
        public void InputFieldInteraction()
        {
            driver.Navigate().GoToUrl("https://www.selenium.dev/selenium/web/dynamic.html");

            driver.FindElement(By.XPath("//input[@id='reveal']")).Click();

            var revealedinput = driver.FindElement(By.XPath("//input[@id='revealed']"));

            Assert.True(revealedinput.Displayed);
        }

        [Test]
        public void ExplicitWait_ElementCreated_ButNotVisible() 
        {
            driver.Navigate().GoToUrl("https://the-internet.herokuapp.com/dynamic_loading/1");


            driver.FindElement(By.XPath("//div[@class='example']//div[@id='start']//button")).Click();

            WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));

            IWebElement finishDiv = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//div[@class='example']//div[@id='finish']")));
            
            Assert.True(finishDiv.Displayed);

        }

        [Test]
        public void ImplicitWait_ElementNotCreated_ButNotVisible()
        {
            driver.Navigate().GoToUrl("https://the-internet.herokuapp.com/dynamic_loading/2");

            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);

            driver.FindElement(By.XPath("//div[@class='example']//div[@id='start']//button")).Click();

            var finishDiv = driver.FindElement(By.XPath("//div[@class='example']//div[@id='finish']"));

            Assert.True(finishDiv.Displayed);


        }

        [Test]
        public void PageLoadTimeout()
        {
            driver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(10);

            driver.Navigate().GoToUrl("https://the-internet.herokuapp.com/dynamic_loading/2");

            var startButton = driver.FindElement(By.XPath("//div[@class='example']//div[@id='start']//button"));

            Assert.True(startButton.Displayed);


        }

        [Test]
        public void JavaScriptTimeoutsTest()
        {
            
            driver.Manage().Timeouts().AsynchronousJavaScript = TimeSpan.FromSeconds(60);

            string script = @"const start = new Date().getTime();
const delay = 45000;
while(new Date().getTime() < start + delay)
{
// do something while waiting 45 seconds
}
console.log(""45 seconds of execution"")";

            IJavaScriptExecutor jsExecuter = (IJavaScriptExecutor)driver;
            jsExecuter.ExecuteScript(script);

        }

        [Test]
        public void FluentWait_ElementCreated_ButNotVisible()
        {
            driver.Navigate().GoToUrl("https://the-internet.herokuapp.com/dynamic_loading/1");


            driver.FindElement(By.XPath("//div[@class='example']//div[@id='start']//button")).Click();

            DefaultWait<IWebDriver> fluentWait = new DefaultWait<IWebDriver>(driver);


            fluentWait.Timeout = TimeSpan.FromSeconds(10);

            fluentWait.PollingInterval = TimeSpan.FromMilliseconds(50);

            IWebElement finishDiv = fluentWait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//div[@class='example']//div[@id='finish']")));

            Assert.True(finishDiv.Displayed);


        }


        [Test]
        public void IgnoreException_With_FluentWait()
        {
            driver.Navigate().GoToUrl("https://the-internet.herokuapp.com/dynamic_loading/2");

            driver.FindElement(By.XPath("//button[contains(.,'Start')]")).Click();

            DefaultWait<IWebDriver> fluentWait = new DefaultWait<IWebDriver> (driver);

            fluentWait.Timeout = TimeSpan.FromSeconds(10);
            fluentWait.PollingInterval= TimeSpan.FromMilliseconds(50);

            fluentWait.IgnoreExceptionTypes(typeof(NoSuchElementException));

            IWebElement finishDiv = fluentWait.Until(ExpectedConditions.ElementExists(By.XPath("//*[@id=\"finish\"]")));

            Assert.True(finishDiv.Displayed);


        }

    }

}