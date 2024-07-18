using POMExcercise.Pages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POMExercise.Tests
{
    public class LoginTests : BaseTest
    {
        [Test]
        public void TestLoginWithValidCredentials()
        {
            Login("standard_user", "secret_sauce");

            

            Assert.That(inventoryPage.IsInventoryPageLoaded(), Is.True, "The inventory page did not load after login with valid credentials.");

        }

        [Test]
        public void TestLoginWithInvalidCredentials()
        {
            Login("invalid_user", "invalid_password");

           
            string error = loginPage.GetErrorMessage();

            Assert.That(error, Contains.Substring("Epic sadface: Username is required"));
        }

        [Test]
        public void TestLoginWithLockedOutUser()
        {
            Login("locked_out_user", "secret_sauce");

         
            string error = loginPage.GetErrorMessage();

            Assert.That(error, Contains.Substring("Epic sadface: Sorry, this user has been locked out."));
        }
    }
}
