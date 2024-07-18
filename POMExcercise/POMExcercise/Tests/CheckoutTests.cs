using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POMExercise.Tests
{
    public class CheckoutTests : BaseTest
    {
        [SetUp]
        public void Setup()
        {

            Login("standard_user", "secret_sauce");
            inventoryPage.AddToCartByIndex(1);
            inventoryPage.ClickCartLink();

            cartPage.ClickCheckOutButton();
        }

        [Test]
        public void TestCheckoutPageLoaded()
        {
            Assert.True(checkOutPage.IsPageLoades(), "Checkout page not loaded");
        }

        [Test]
        public void TestContinueToNextStep()
        {

            checkOutPage.FillFirstName("Teodora");
            checkOutPage.FillLastName("Nalbantova");
            checkOutPage.fillPostalCode("1000");
            
checkOutPage.ClickContinueButton();


            Assert.That(driver.Url.Contains("checkout-step-two.html"),Is.True, "Not navigated to the correct checkout page.");
        }


        [Test]
        public void TestCompleteOrder()
        {

            checkOutPage.FillFirstName("Teodora");
            checkOutPage.FillLastName("Nalbantova");
            checkOutPage.fillPostalCode("1000");

            checkOutPage.ClickContinueButton();

            checkOutPage.ClickFinishButton();


            Assert.True(checkOutPage.IsCheckOutColpete(), "Checkout was not completed.");
        }

    }
}
