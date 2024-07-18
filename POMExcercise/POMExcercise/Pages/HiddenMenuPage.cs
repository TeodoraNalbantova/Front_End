using OpenQA.Selenium;
using POMExercise.Pages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace POMExcercise.Pages
{
    public class HiddenMenuPage : BasePage
    {
        protected readonly By hamburgerMenuButton = By.Id("react-burger-menu-btn");
        protected readonly By logoutButton = By.XPath("/html//a[@id='logout_sidebar_link']");

        public HiddenMenuPage(IWebDriver driver) : base(driver)
        {
            
        }

        public void ClickHamburgerMenuButton()
        {
            Click(hamburgerMenuButton);
        }

        public void ClickLogout()
        {
            Click(logoutButton);
        }

        public bool IsMenuOpen()
        {
            return FindElement(logoutButton).Displayed;

        }


    }
}
