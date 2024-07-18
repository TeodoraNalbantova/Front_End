using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POMExercise.Tests
{
    public class CartTests : BaseTest
    {
        [SetUp]
        public void Setup()
        {

            Login("standard_user", "secret_sauce");
            inventoryPage.AddToCartByIndex(1);
            inventoryPage.ClickCartLink();
        }

        [Test]
        public void TestCartItemDisplayed()
        {
            Assert.True(cartPage.IsCartItemDisplayed(), "There were no products in the cart");
        }

        [Test]
        public void TestClickCheckout()
        {
            cartPage.ClickCheckOutButton();

            Assert.True(checkOutPage.IsPageLoades(), "Not navigated to the checkout page");

        }
    }
}
