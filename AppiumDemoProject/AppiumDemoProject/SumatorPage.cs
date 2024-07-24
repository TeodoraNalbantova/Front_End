using NUnit.Framework.Constraints;
using OpenQA.Selenium.Appium;
using OpenQA.Selenium;
using OpenQA.Selenium.Appium.Android;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppiumDemoProject
{
    public class SumatorPage
    {
        private readonly AndroidDriver _driver;

        public SumatorPage(AndroidDriver driver)
        {
                _driver = driver;
        }

        IWebElement field1 => _driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/editText1"));

        IWebElement field2 =>  _driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/editText2"));

        IWebElement calcBtn => _driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/buttonCalcSum"));

        IWebElement resultField => _driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/editTextSum"));

        public string Calculate( string num1, string num2) 
        { 
            ClearFields();

            field1.SendKeys(num1);
            field2.SendKeys(num2) ;

            calcBtn.Click();

            return resultField.Text;
        }

        public void ClearFields()
        {
            field1.Clear();
            field2.Clear();
        }


    }
}
