using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IdeaCenter.Pages
{
    public class LoginPage : BasePage
    {
        public LoginPage(IWebDriver driver) : base(driver) 
        {
            
        }

        public string Url = BaseUrl + "/Users/Login";

        public IWebElement EmailInput => driver.FindElement(By.XPath("//input[@id='typeEmailX-2']"));

        public IWebElement PasswordInput => driver.FindElement(By.XPath("//input[@id='typePasswordX-2']"));

        public IWebElement SignInButton => driver.FindElement(By.XPath("//button[contains(@class,'btn btn-primary btn-lg btn-block')]"));

        public void Login(string email, string password)
        {
            EmailInput.SendKeys(email);
            PasswordInput.SendKeys(password);
            SignInButton.Click();
        }

        public void OpenPage()
        {
            driver.Navigate().GoToUrl(Url);
        }
    }
}
