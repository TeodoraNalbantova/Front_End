using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POMExercise.Tests
{
    public class HiddenMenuTests : BaseTest
    {
        [SetUp]
        public void Setup()
        {
            Login("standard_user", "secret_sauce");
        }

        [Test]
        public void TestOpenMenu() 
        { 
            hiddenMenuPage.ClickHamburgerMenuButton();


            Assert.True(hiddenMenuPage.IsMenuOpen(), "Hidden menu was not open.");
        
        }

        [Test]
        public void TestLogOut()
        {
            hiddenMenuPage.ClickHamburgerMenuButton();
            hiddenMenuPage.ClickLogout();


            Assert.True(driver.Url.Equals("https://www.saucedemo.com/"), "User was not logged out");

        }
    }
}
