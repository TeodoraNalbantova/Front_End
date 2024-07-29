using OpenQA.Selenium;
using OpenQA.Selenium.Appium;
using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Appium.Service;

namespace DragdAndDrop
{
    public class DragAndDrop
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
        public void DragAndDropTest()
        {
            var views = _driver.FindElement(MobileBy.AccessibilityId("Views"));
            views.Click();

            var dragDrop = _driver.FindElement(MobileBy.AccessibilityId("Drag and Drop"));
            dragDrop.Click();

            var drag = _driver.FindElement(By.Id("drag_dot_1"));
            var drop = _driver.FindElement(By.Id("drag_dot_2"));


            // Perform the drag and drop action using JavaScript ExecutScript (mobile: dragGesture)

            var scriptArgs = new Dictionary<string, object>
            {
                { "elementId", drag.Id },
                { "endX", drop.Location.X + (drop.Size.Width / 2) },
                { "endY", drop.Location.Y + (drop.Size.Height / 2) },
                { "speed", 2500 }

            };

            _driver.ExecuteScript("mobile: dragGesture", scriptArgs);

            var droppedMessage = _driver.FindElement(By.Id("drag_result_text"));

            Assert.That(droppedMessage.Text, Is.EqualTo("Dropped!"), "The drag and drop action did not complete successfully.");

        }
    }
}