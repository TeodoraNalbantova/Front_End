using OpenQA.Selenium;
using OpenQA.Selenium.Appium;
using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Appium.Service;

namespace Scroll
{
    public class ScrollTests
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
        public void Test1()
        {
            IWebElement viewsButton = _driver.FindElement(MobileBy.AccessibilityId("Views"));

            viewsButton.Click();
            ScrollToText("Lists");

            var lists = _driver.FindElement(MobileBy.AccessibilityId("Lists"));

            Assert.That(lists, Is.Not.Null, "The 'Lists' element was not found after scrolling.");

            lists.Click();

            var elementInList = _driver.FindElement(MobileBy.AccessibilityId("10. Single choice list"));

            Assert.That(elementInList, Is.Not.Null, "The expected element in the list was not found.");



        }

        private void ScrollToText(string text)
        {
            _driver.FindElement(MobileBy.AndroidUIAutomator(
                "new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text(\"" + text + "\"))"));
        }
    }
}