using OpenQA.Selenium;
using POMExercise.Pages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POMExcercise.Pages
{
    public class InventoryPage : BasePage
    {
        protected readonly By cartLink = By.CssSelector(".shopping_cart_link");
        protected readonly By productsPageTittle = By.ClassName("title");
        protected readonly By productItems = By.CssSelector(".inventory_item");
        
        public InventoryPage(IWebDriver driver) : base(driver) 
        { 
        }

        public void AddToCartByIndex (int itemIndex)
        {
            var itemByIndexButton = By.CssSelector($".inventory_item:nth-child({itemIndex + 1}) .btn_inventory");

            Click(itemByIndexButton);   
        }

        public void AddToCartByName(string name)
        {
            var itemByNameButton = By.XPath($"//div[text()='{name}']" +
                $"/ancestor::div[@class='inventory_item']//button[contains(@class, 'btn_inventory')]");

            Click(itemByNameButton);
        }

        public void ClickCartLink()
        {
            Click(cartLink);
        }

        public bool IsInventoryPageHasItemsDisplayed()
        {
            return FindElements(productItems).Any();
        }

        public bool IsInventoryPageLoaded()
        {
            return GetText(productsPageTittle) == "Products" && driver.Url.Contains("inventory.html");
        }
    }
}
