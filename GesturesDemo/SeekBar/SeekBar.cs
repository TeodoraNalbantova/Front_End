using OpenQA.Selenium;
using OpenQA.Selenium.Appium;
using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Appium.Service;
using OpenQA.Selenium.Interactions;
using System.Drawing;

namespace SeekBar
{
    public class SeekBar
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
                App = "D:\\TEDDY'S\\SOFT UNI\\QA\\FRONT-END\\Front-End Test Automation - ��� 2024\\AppForTesting\\ApiDemos-debug.apk"
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
        private void ScrollToText(string text)
        {
            _driver.FindElement(MobileBy.AndroidUIAutomator(
                       "new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text(\"" + text + "\"))"));

        }

        

        [Test]
        public void SeekBarTest()
        {
            var views = _driver.FindElement(MobileBy.AccessibilityId("Views"));
            views.Click();

            ScrollToText("Seek Bar");

            var seekBarOption = _driver.FindElement(MobileBy.AccessibilityId("Seek Bar"));
            seekBarOption.Click();

            // Use the exact coordinates from Appium Inspector
            MoveSeekBarWithInspectorCoordinates(542, 231, 1042, 234);

            var seekBarValueElement = _driver.FindElement(By.Id("io.appium.android.apis:id/progress"));

            var seekBarValueText = seekBarValueElement.Text;
            Assert.That(seekBarValueText, Is.EqualTo("100 from touch=true"), "SeekBar did not move to the expected value.");

        }

        private void MoveSeekBarWithInspectorCoordinates(int startX, int startY, int endX, int endY)
        {
            var finger = new PointerInputDevice(PointerKind.Touch);
            var start = new Point(startX, startY);
            var end = new Point(endX, endY);
            var swipe = new ActionSequence(finger);
            swipe.AddAction(finger.CreatePointerMove(CoordinateOrigin.Viewport, start.X, start.Y, TimeSpan.Zero));
            swipe.AddAction(finger.CreatePointerDown(MouseButton.Left));
            swipe.AddAction(finger.CreatePointerMove(CoordinateOrigin.Viewport, end.X, end.Y, TimeSpan.FromMilliseconds(1000)));
            swipe.AddAction(finger.CreatePointerUp(MouseButton.Left));
            _driver.PerformActions(new List<ActionSequence> { swipe });
        }
    }
}