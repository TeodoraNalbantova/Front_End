using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POMExercise.Tests
{
    public  class InventoryTests : BaseTest
    {
        [SetUp]
        public void Setup()
        {
            Login("standard_user", "secret_sauce");
        }
        [Test]
    public void TestInventoryDisplay() 
        {

            Assert.That(inventoryPage.IsInventoryPageHasItemsDisplayed(), Is.True, "Inventory page has no items displayed.");

        }

        [Test] 
        public void TestAddCartByIndex()
        {
            inventoryPage.AddToCartByIndex(1);
            inventoryPage.ClickCartLink();

            Assert.That(cartPage.IsCartItemDisplayed(), Is.True, "Cart Item was not added to the cart");

        }


        [Test]
        public void TestAddCartByName()
        {
            inventoryPage.AddToCartByName("Sauce Labs Bike Light");
            inventoryPage.ClickCartLink();

            Assert.That(cartPage.IsCartItemDisplayed(), Is.True, "Cart Item was not added to the cart");

        }

        [Test]
        public void TestPageTitle()
        {
            Assert.That(inventoryPage.IsInventoryPageLoaded(), Is.True, "Inventory page not loaded correctly.");

        }
    }
}
