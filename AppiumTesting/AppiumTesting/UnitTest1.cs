using OpenQA.Selenium.Appium;
using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Appium.Service;
using OpenQA.Selenium.Chromium;

namespace AppiumTesting
{
    public class Tests
    {
        private AndroidDriver driver;
        private AppiumLocalService service;
        [SetUp]
        public void Setup()
        {
            service = new AppiumServiceBuilder()
                .WithIPAddress ("127.0.0.1")
                .UsingPort(4723)
                .Build();

            AppiumOptions options = new AppiumOptions();
            options.App = @"C:\Users\User\Downloads\com.example.androidappsummator.apk";
            options.PlatformName = "Android";
            options.DeviceName = "Pixel_7";
            options.AutomationName = "UiAutomator2";

            driver = new AndroidDriver(service, options);
        }
        [TearDown]
        public void TearDown()
        {
           driver.Quit();
           service.Dispose();
           driver.Dispose();
        }

        [Test]
        public void TestValidSubmition()
        {
           var firsInput =  driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/editText1"));
            firsInput.SendKeys("2");

            var secondInput = driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/editText2"));
            secondInput.SendKeys("3");

            var calculateBtn = driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/buttonCalcSum"));
            calculateBtn.Click();

            var resultField = driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/editTextSum"));

            Assert.That(resultField.Text, Is.EqualTo("5"), "submition is incorect");

        }


        [Test]
        public void TestInvalidSubmition()
        {
            var firsInput = driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/editText1"));
            firsInput.SendKeys("2");

            var secondInput = driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/editText2"));
            secondInput.SendKeys("");

            var calculateBtn = driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/buttonCalcSum"));
            calculateBtn.Click();

            var resultField = driver.FindElement(MobileBy.Id("com.example.androidappsummator:id/editTextSum"));

            Assert.That(resultField.Text, Is.EqualTo("error"), "submition is incorect");

        }
    }
}