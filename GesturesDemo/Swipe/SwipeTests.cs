using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Appium.Service;
using OpenQA.Selenium.Appium;
using OpenQA.Selenium;
using System;
using OpenQA.Selenium.Interactions;

namespace Swipe
{
    public class SwipeTests
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

            var andoidOptions = new AppiumOptions()
            {
                PlatformName = "Android",
                AutomationName = "UiAutomator2",
                PlatformVersion = "14",
                DeviceName = "Pixel 7",
                App = "D:\\TEDDY'S\\SOFT UNI\\QA\\FRONT-END\\Front-End Test Automation - ўыш 2024\\AppForTesting\\ApiDemos-debug.apk"
            };

            _driver = new AndroidDriver(_appiumLocalService, andoidOptions);

            _driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            _driver?.Quit();
            _driver?.Dispose();
            _appiumLocalService?.Dispose();
        }

        [Test]
        public void SwipeTest()
        {
            var views = _driver.FindElement(MobileBy.AccessibilityId("Views"));
            views.Click();


            var gallery = _driver.FindElement(MobileBy.AccessibilityId("Gallery"));
            gallery.Click();

            var photos = _driver.FindElement(MobileBy.AccessibilityId("1. Photos"));
            photos.Click();

            var pic1 = _driver.FindElements(By.ClassName("android.widget.ImageView"))[0];

            // Perform swipe action using Actions

            var action = new Actions(_driver);

            var swipe = action.ClickAndHold(pic1)
                .MoveByOffset(-200, 0)
                .Release()
                .Build();
            swipe.Perform();

            var thirdImage = _driver.FindElements(By.ClassName("android.widget.ImageView"))[2];

            Assert.That(thirdImage, Is.Not.Null);




        }
    }
}