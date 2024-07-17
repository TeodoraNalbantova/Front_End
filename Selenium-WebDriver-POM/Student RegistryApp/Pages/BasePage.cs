using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Student_RegistryApp.Pages
{
    public class BasePage
    {
        protected readonly IWebDriver driver;
        public virtual string PageURL { get; }

        public BasePage(IWebDriver driver)
        {
            this.driver = driver;
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(5);
            
        }

        public IWebElement HomeLink => driver.FindElement(By.XPath("//a[@href='/']"));

        public IWebElement ViewStudentLink => driver.FindElement(By.XPath("//a[@href='/students']"));

        public IWebElement AddStudentLink => driver.FindElement(By.XPath("//a[@href='/add-student']"));

        public IWebElement PageHeading => driver.FindElement(By.CssSelector("body > h1"));

        public void OpenPage()
        {
            driver.Navigate().GoToUrl(PageURL);

        }
        public bool IsPageOpen()
        {
            return driver.Url == this.PageURL;

        }
        public string GetPageTitle()
        {
            return driver.Title;
        }

        public string GetPageHeading()
        {
            return PageHeading.Text;
        }


    }
}
