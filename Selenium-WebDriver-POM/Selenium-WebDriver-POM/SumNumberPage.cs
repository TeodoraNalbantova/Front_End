using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Selenium_WebDriver_POM
{
    public class SumNumberPage
    {

        private readonly IWebDriver driver;

        public SumNumberPage(IWebDriver driver)
        {
            this.driver = driver;
            TimeSpan.FromSeconds(5);
        }

        public const string PageUrl = "https://2ea06822-e005-4a40-bf0a-e909ba25e879-00-2kmrafzp9je1p.riker.replit.dev/";

        public IWebElement FieldNum1 => driver.FindElement(By.XPath("//input[@id='number1']"));

        public IWebElement FieldNum2 => driver.FindElement(By.XPath("//input[@id='number2']"));

        public IWebElement CalcButton => driver.FindElement(By.XPath("//input[@id='calcButton']"));

        public IWebElement ResetButton => driver.FindElement(By.XPath("//input[@id='resetButton']"));

        public IWebElement ResultDiv => driver.FindElement(By.XPath("//div[@id='result']"));



        public void OpenPage()
        {
            driver.Navigate().GoToUrl(PageUrl);
        }

        public void ResetForm()
        {
            ResetButton.Click();
        }

        public bool IsFormEmpty()
        {
            return FieldNum1.Text + FieldNum2.Text + ResultDiv.Text == "";
        }

        public string AddNumbers(string number1, string number2)
        {
            FieldNum1.SendKeys(number1);
            FieldNum2.SendKeys(number2);
            CalcButton.Click(); 

            return ResultDiv.Text;
        }

    }
}
