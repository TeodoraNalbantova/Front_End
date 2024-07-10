using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

namespace SeleniumWebDriverTests
{
    public class DataDrivenTest
    { 
        WebDriver driver;
        IWebElement textBoxNumber1;
        IWebElement textBoxNumber2;
        IWebElement dropdownOperations;
        IWebElement calcButton;
        IWebElement resetButton;
        IWebElement divResult;

        [OneTimeSetUp]
        public void OneTimeSetup()
        {
            driver = new ChromeDriver();
            driver.Navigate().GoToUrl("http://softuni-qa-loadbalancer-2137572849.eu-north-1.elb.amazonaws.com/number-calculator/");
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
        }
  [SetUp]
        public void Setup()
        {
            

            textBoxNumber1 = driver.FindElement(By.Id("number1"));
            textBoxNumber2 = driver.FindElement(By.Id("number2"));
            dropdownOperations = driver.FindElement(By.Id("operation"));
            calcButton = driver.FindElement(By.Id("calcButton"));
            resetButton = driver.FindElement(By.Id("resetButton"));
            divResult = driver.FindElement(By.Id("result"));


        }

        [OneTimeTearDown]
        public void TearDown() 
        { 
            driver.Close();
            driver.Dispose();
        }


        public void PerformTestLogic(string firstNumber, string secondNumber, string operation, string expected)
        {
            resetButton.Click();

            if(!string.IsNullOrEmpty(firstNumber))
            {
                textBoxNumber1.SendKeys(firstNumber);
            }

            if(!string.IsNullOrEmpty(secondNumber))
            {
                textBoxNumber2.SendKeys(secondNumber);
            }

            if (!string.IsNullOrEmpty(operation))
            {
                new SelectElement(dropdownOperations).SelectByText(operation);
            }

            calcButton.Click();
            
         
            Assert.That(divResult.Text, Is.EqualTo(expected));

        }



        [Test]
        [TestCase("5", "+ (sum)", "10", "Result: 15")]
        [TestCase("5", "+ (sum)", "5", "Result: 10")]
        [TestCase("5", "+ (sum)", "7", "Result: 12")]


        public void Test(string firstNumber, string operation, string secondName, string expected)
        {
            PerformTestLogic(firstNumber, secondName, operation, expected); 
        }
    }
}