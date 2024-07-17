using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using Selenium_WebDriver_POM;

namespace CalculatorPOM
{
    public class Tests
    {
        public IWebDriver driver;
        [SetUp]
        public void Setup()
        {
            driver = new ChromeDriver();
        }

        [TearDown]
        public void TearDown()
        {
            driver.Quit();
            driver.Dispose();
        }

        [Test]
        public void Test_AddTwoNumbers_ValidInput()
        {
            var calculatorPage = new SumNumberPage(driver);

            calculatorPage.OpenPage();
            string result = calculatorPage.AddNumbers("1", "2");

            Assert.AreEqual("Sum: 3", result);

        }

        [Test]
        public void Test_AddTwoNumbers_InvalidInput()
        {
            
            SumNumberPage sumNumberPage = new SumNumberPage(driver);
            sumNumberPage.OpenPage();

            
            string result = sumNumberPage.AddNumbers("1", "t");

            Assert.AreEqual("Sum: invalid input", result);

        }


        [Test]
        public void Test_FormReset()
        {

            SumNumberPage sumNumberPage = new SumNumberPage(driver);
            sumNumberPage.OpenPage();


            string result = sumNumberPage.AddNumbers("1", "2");

            Assert.AreEqual("Sum: 3", result);

            sumNumberPage.ResetForm();

            Assert.True(sumNumberPage.IsFormEmpty());

        }
    }
}