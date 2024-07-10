// Generated by Selenium IDE
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Remote;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium.Interactions;
using NUnit.Framework;
[TestFixture]
public class TC02AdditemtotheshoppingcartTest {
  private IWebDriver driver;
  public IDictionary<string, object> vars {get; private set;}
  private IJavaScriptExecutor js;
  [SetUp]
  public void SetUp() {
    driver = new ChromeDriver();
    js = (IJavaScriptExecutor)driver;
    vars = new Dictionary<string, object>();
  }
  [TearDown]
  protected void TearDown() {
    driver.Quit();
  }
  [Test]
  public void tC02Additemtotheshoppingcart() {
    // Test name: TC02 - Add item to the shopping cart
    // Step # | name | target | value
    // 1 | open | / | 
    driver.Navigate().GoToUrl("https://www.saucedemo.com//");
    // 2 | click | css=*[data-test="username"] | 
    driver.FindElement(By.CssSelector("*[data-test=\"username\"]")).Click();
    // 3 | type | css=*[data-test="username"] | standard_user
    driver.FindElement(By.CssSelector("*[data-test=\"username\"]")).SendKeys("standard_user");
    // 4 | click | css=*[data-test="password"] | 
    driver.FindElement(By.CssSelector("*[data-test=\"password\"]")).Click();
    // 5 | type | css=*[data-test="password"] | secret_sauce
    driver.FindElement(By.CssSelector("*[data-test=\"password\"]")).SendKeys("secret_sauce");
    // 6 | click | css=*[data-test="login-button"] | 
    driver.FindElement(By.CssSelector("*[data-test=\"login-button\"]")).Click();
    // 7 | click | css=*[data-test="add-to-cart-sauce-labs-fleece-jacket"] | 
    driver.FindElement(By.CssSelector("*[data-test=\"add-to-cart-sauce-labs-fleece-jacket\"]")).Click();
    // 8 | click | xpath=//div[@id='shopping_cart_container']/a | 
    driver.FindElement(By.XPath("//div[@id=\'shopping_cart_container\']/a")).Click();
    // 9 | click | css=.header_secondary_container | 
    driver.FindElement(By.CssSelector(".header_secondary_container")).Click();
    // 10 | assertText | css=.title | Your Cart
    Assert.That(driver.FindElement(By.CssSelector(".title")).Text, Is.EqualTo("Your Cart"));
    // 11 | assertElementPresent | css=*[data-test="continue-shopping"] | 
    var elements = driver.FindElements(By.CssSelector("*[data-test=\"continue-shopping\"]"));
    Assert.True(elements.Count > 0);
    // 12 | assertElementPresent | css=*[data-test="checkout"] | 
    var elements = driver.FindElements(By.CssSelector("*[data-test=\"checkout\"]"));
    Assert.True(elements.Count > 0);
  }
}
