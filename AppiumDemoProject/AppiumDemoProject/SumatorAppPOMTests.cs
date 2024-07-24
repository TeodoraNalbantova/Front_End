using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Appium.Service;
using OpenQA.Selenium.Appium;
using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppiumDemoProject
{
    public class SumatorAppPOMTests
    {

        private AndroidDriver _driver;

        private AppiumLocalService _appiumLocalService;

        private SumatorPage _sumatorPage;

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
                App = @"D:\TEDDY'S\SOFT UNI\QA\FRONT-END\Front-End Test Automation - юли 2024\ApksFortesting\com.example.androidappsummator.apk",
                PlatformVersion = "14"

            };

            _driver = new AndroidDriver(_appiumLocalService, androidOptions);

            _sumatorPage = new SumatorPage(_driver);

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
            var result = _sumatorPage.Calculate("1", "2");

            Assert.That(result, Is.EqualTo("3"));


        }


        [Test]
        public void Test_InValidData()
        {

            _sumatorPage.ClearFields();

            var result = _sumatorPage.Calculate("", "p");

            

            Assert.That(result, Is.EqualTo("error"));


        }

    }
}
