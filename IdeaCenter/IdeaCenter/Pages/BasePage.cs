using OpenQA.Selenium;
using OpenQA.Selenium.DevTools.V125.Storage;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;

namespace IdeaCenter.Pages
{
    public  class BasePage
    {
        protected IWebDriver driver;
        protected WebDriverWait wait;
        protected static readonly string BaseUrl = "http://softuni-qa-loadbalancer-2137572849.eu-north-1.elb.amazonaws.com:83";

        public BasePage(IWebDriver driver)
        {
            this.driver = driver;
            wait = new WebDriverWait(driver,TimeSpan.FromSeconds(10));
        }

        public IWebElement HomeLink => driver.FindElement(By.XPath("//img[@class='rounded-circle']"));

        public IWebElement MyProfileLink => driver.FindElement(By.XPath("//a[@class='nav-link'][contains(.,'My Profile')]"));

        public IWebElement MyIdeasLink => driver.FindElement(By.XPath("//div[@id='navbarButtonsExample']/ul//a[@href='/Ideas/MyIdeas']"));


        public IWebElement CreateIdeaLink => driver.FindElement(By.XPath("//div[@id='navbarButtonsExample']/ul//a[@href='/Ideas/Create']"));

        public IWebElement LogoutButton => driver.FindElement(By.XPath("//div[@id='navbarButtonsExample']//a[@href='/Users/Logout']"));

        public IWebElement LoginButton => driver.FindElement(By.XPath("//div[@id='navbarButtonsExample']//a[@href='/Users/Login']"));

    }
}
