using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.DevTools.V124.Emulation;
using OpenQA.Selenium.Support.UI;

namespace Handling_Form_Input
{
    public class HandlingFormInputTests
    {
        WebDriver driver;
        [SetUp]
        public void Setup()
        {
            driver = new ChromeDriver();
            driver.Navigate().GoToUrl("https://practice.bpbonline.com/");
            
        }

        [TearDown]
        public void TearDown()
        {
            driver.Quit();
            driver.Dispose();
        }

        [Test]
        public void HandlingFormInputs()
        {
            //click on my account button
            var myAccountButton = driver.FindElements(By.XPath("//span[@class='ui-button-text']"))[2];
            myAccountButton.Click();

            //click continue button
            driver.FindElement(By.LinkText("Continue")).Click();

            //click male radio button
            driver.FindElement(By.XPath("//input[@type='radio'][@value='m']")).Click();

            //fill first name and last name 
            driver.FindElement(By.XPath("//td[@class='fieldValue']//input[@name=\"firstname\"]")).SendKeys("Toni");

            driver.FindElement(By.XPath("//td[@class='fieldValue']//input[@name=\"lastname\"]")).SendKeys("Montana");
           
            //fill in data field
            driver.FindElement(By.Id("dob")).SendKeys($"07/01/1997");

            //build random email address
            Random random = new Random();
            int randomNumber = random.Next(0, 9999);
            string email = "toni" + randomNumber.ToString() + "@abv.bg";

            //fill email field
            driver.FindElement(By.Name("email_address")).SendKeys(email);

            //fill company name
            driver.FindElement(By.Name("company")).SendKeys("SuperStar");

            //fill address
            driver.FindElement(By.XPath("//td[@class='fieldValue']//input[@name='street_address']")).SendKeys("str.Topli dol 11");

            driver.FindElement(By.XPath("//td[@class='fieldValue']//input[@name='suburb']")).SendKeys("Sofia");

            driver.FindElement(By.XPath("//td[@class='fieldValue']//input[@name='postcode']")).SendKeys("1000");

            driver.FindElement(By.XPath("//td[@class='fieldValue']//input[@name='city']")).SendKeys("Sofia");

            driver.FindElement(By.XPath("//td[@class='fieldValue']//input[@name='state']")).SendKeys("Sofia");

            //select from country dropdown

            new SelectElement(driver.FindElement(By.Name("country"))).SelectByText("Bulgaria");

            // fill telephone field
            driver.FindElement(By.XPath("//td[@class='fieldValue']//input[@name='telephone']")).SendKeys("0883405122");

            //click newsletter checkbox
            driver.FindElement(By.XPath("//input[@name='newsletter']")).Click();


            //fill password

            driver.FindElement(By.XPath("//td[@class='fieldValue']//input[@name='password']")).SendKeys("123456");

            driver.FindElement(By.XPath("//td[@class='fieldValue']//input[@name='confirmation']")).SendKeys("123456");

            // click button continue 

            driver.FindElements(By.XPath("//span[@class='ui-button-icon-primary ui-icon ui-icon-person']//following-sibling::span"))[1].Click();

            //assert message for success
            Assert.AreEqual(driver.FindElement(By.XPath("//*[@id=\"bodyContent\"]/h1")).Text,"Your Account Has Been Created!");

            //click log off 
            driver.FindElement(By.XPath("//*[@id=\"tdb4\"]/span")).Click();

            //click continue button
            driver.FindElement(By.LinkText("Continue")).Click();

            Console.WriteLine("User Created Successfully!");

        }
    }
}