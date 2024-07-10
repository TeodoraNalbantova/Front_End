using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace WebDriverWikiTest
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //create new Chrome browser
            WebDriver driver = new ChromeDriver();
            //navigate to Wikipedia page
            driver.Url = "https://www.wikipedia.org/";

            //find  the search field
            var searchInput = driver.FindElement(By.Id("searchInput"));


            //click on the field
            searchInput.Click();


            //type Quality assurance 
            searchInput.SendKeys("Quality Assurance" + Keys.Enter);

            //Get the page Title
            var currentPageTitle = driver.Title;

            Console.Write("The current page title is:" + currentPageTitle);


            // close browser
            driver.Quit();

        }
    }
}
