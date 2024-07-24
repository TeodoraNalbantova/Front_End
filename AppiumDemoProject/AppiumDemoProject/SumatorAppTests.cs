using OpenQA.Selenium;
using OpenQA.Selenium.Appium;
using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Appium.Enums;
using OpenQA.Selenium.Appium.Service;

namespace AppiumDemoProject
{
    public class SumatorAppTests

    {
        private AndroidDriver _driver;

        private AppiumLocalService _appiumLocalService;




        [OneTimeSetUp]
        public void Setup()
        {
            _appiumLocalService = new AppiumServiceBuilder()
                .WithIPAddress("127.0.0.1")
                .UsingPort(4723)
                .Build();

            _appiumLocalService.Start();

            var androidOptions = new AppiumOptions
            {
                PlatformName = "Android",
                AutomationName = "UIAutomator2",
                DeviceName = "Pixel 7",
                App = @"D:\TEDDY'S\SOFT UNI\QA\FRONT-END\Front-End Test Automation - ўыш 2024\ApksFortesting\com.example.androidappsummator.apk",
                PlatformVersion = "14"

            };

            _driver = new AndroidDriver(_appiumLocalService,androidOptions);

        }
        [OneTimeTearDown]
        public void TearDown()
        {
            _driver?.Quit();
            _driver?.Dispose();
            _appiumLocalService?.Dispose();
        }

        [Test]
        public void Test_ValidData()
        {
            IWebElement field1 = _driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/editText1"));
            field1.Clear();
            field1.SendKeys("1");

            IWebElement field2 = _driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/editText2"));
            field2.Clear();
            field2.SendKeys("2");

            IWebElement calcBtn = _driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/buttonCalcSum"));
            calcBtn.Click();

            IWebElement resultField = _driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/editTextSum"));
            
            Assert.That(resultField.Text,Is.EqualTo("3"));


        }


        [Test]
        public void Test_InValidData()
        {
            IWebElement field1 = _driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/editText1"));
            field1.Clear();
            field1.SendKeys("");

            IWebElement field2 = _driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/editText2"));
            field2.Clear();
            field2.SendKeys("p");

            IWebElement calcBtn = _driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/buttonCalcSum"));
            calcBtn.Click();

            IWebElement resultField = _driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/editTextSum"));

            Assert.That(resultField.Text, Is.EqualTo("error"));


        }



    }
}