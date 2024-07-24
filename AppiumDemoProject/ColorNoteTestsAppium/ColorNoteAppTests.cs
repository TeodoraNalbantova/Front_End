using OpenQA.Selenium;
using OpenQA.Selenium.Appium;
using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Appium.Service;

namespace ColorNoteTestsAppium
{
    public class ColorNoteAppTests
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

            var androidOptions = new AppiumOptions()
            {
                PlatformName = "Andoird",
                AutomationName = "UIAutomator2",
                DeviceName = "Pixel 7",
                App = @"D:\TEDDY'S\SOFT UNI\QA\FRONT-END\Front-End Test Automation - ўыш 2024\ApksFortesting\Notepad.apk",
                PlatformVersion = "14",


            };

            androidOptions.AddAdditionalAppiumOption("autoGrantPermissions", true);
            _driver = new AndroidDriver(_appiumLocalService, androidOptions);

            _driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);

            try
            {
                var skipTutorialButton = _driver.FindElement(MobileBy.Id("com.socialnmobile.dictapps.notepad.color.note:id/btn_start_skip"));

                skipTutorialButton.Click();
            }
            catch(NoSuchElementException)
            { 

            }

        }
        [OneTimeTearDown]
        public void Teardown() 
        {
            _driver.Quit();
            _driver.Dispose();
            _appiumLocalService.Dispose();

        }

        [Test, Order(1)]
        public void Test_CreateNewNote()
        {
            IWebElement newNoteButton = _driver.FindElement(MobileBy.Id("com.socialnmobile.dictapps.notepad.color.note:id/main_btn1"));  
            
            newNoteButton.Click();

            IWebElement createNoteText = _driver.FindElement(MobileBy.AndroidUIAutomator("new UiSelector().text(\"Text\")"));

            createNoteText.Click();

            IWebElement notetextField = _driver.FindElement(MobileBy.Id("com.socialnmobile.dictapps.notepad.color.note:id/edit_note"));

            notetextField.SendKeys("Test Number 1");

            IWebElement backButton = _driver.FindElement(MobileBy.Id("com.socialnmobile.dictapps.notepad.color.note:id/back_btn"));
            backButton.Click();
            backButton.Click();

            IWebElement createdNote = _driver.FindElement(MobileBy.Id("com.socialnmobile.dictapps.notepad.color.note:id/title"));

            Assert.That(createdNote, Is.Not.Null, "Note was not created");
            Assert.That(createdNote.Text, Is.EqualTo("Test Number 1"));
        }



        [Test, Order (2)]
        public void Test_EditNote()
        {
            IWebElement newNoteButton = _driver.FindElement(MobileBy.Id("com.socialnmobile.dictapps.notepad.color.note:id/main_btn1"));

            newNoteButton.Click();

            IWebElement createNoteText = _driver.FindElement(MobileBy.AndroidUIAutomator("new UiSelector().text(\"Text\")"));

            createNoteText.Click();

            IWebElement notetextField = _driver.FindElement(MobileBy.Id("com.socialnmobile.dictapps.notepad.color.note:id/edit_note"));

            notetextField.SendKeys("Test Number 2");

            IWebElement backButton = _driver.FindElement(MobileBy.Id("com.socialnmobile.dictapps.notepad.color.note:id/back_btn"));
            backButton.Click();
            backButton.Click();

            IWebElement openNote = _driver.FindElement(MobileBy.Id("com.socialnmobile.dictapps.notepad.color.note:id/type_image"));
            openNote.Click();

            IWebElement editButton = _driver.FindElement(MobileBy.Id("com.socialnmobile.dictapps.notepad.color.note:id/edit_btn"));
            editButton.Click();


             notetextField = _driver.FindElement(MobileBy.Id("com.socialnmobile.dictapps.notepad.color.note:id/edit_note"));

            notetextField.Click();
            notetextField.Clear();
           
            notetextField.SendKeys("EDITED");
            backButton = _driver.FindElement(MobileBy.Id("com.socialnmobile.dictapps.notepad.color.note:id/back_btn"));
            backButton.Click();
            backButton.Click();

            IWebElement editedNote = _driver.FindElement(MobileBy.AndroidUIAutomator("new UiSelector().resourceId(\"com.socialnmobile.dictapps.notepad.color.note:id/title\")"));


            Assert.That(editedNote.Text, Is.EqualTo("EDITED"));
        }

        [Test, Order(3)]
        public void Test_DeleteNote()
        {
            IWebElement newNoteButton = _driver.FindElement(MobileBy.Id("com.socialnmobile.dictapps.notepad.color.note:id/main_btn1"));

            newNoteButton.Click();

            IWebElement createNoteText = _driver.FindElement(MobileBy.AndroidUIAutomator("new UiSelector().text(\"Text\")"));

            createNoteText.Click();

            IWebElement notetextField = _driver.FindElement(MobileBy.Id("com.socialnmobile.dictapps.notepad.color.note:id/edit_note"));

            notetextField.SendKeys("Note for Delete");

            IWebElement backButton = _driver.FindElement(MobileBy.Id("com.socialnmobile.dictapps.notepad.color.note:id/back_btn"));
            backButton.Click();
            backButton.Click();

            IWebElement openNote = _driver.FindElement(MobileBy.Id("com.socialnmobile.dictapps.notepad.color.note:id/type_image"));

            openNote.Click();

            IWebElement menuButton = _driver.FindElement(MobileBy.AndroidUIAutomator("new UiSelector().resourceId(\"com.socialnmobile.dictapps.notepad.color.note:id/menu_btn\")"));
            menuButton.Click();

            IWebElement deleteButton = _driver.FindElement(MobileBy.AndroidUIAutomator("new UiSelector().text(\"Delete\")"));
            deleteButton.Click();

            IWebElement okButton = _driver.FindElement(MobileBy.AndroidUIAutomator("new UiSelector().resourceId(\"android:id/button1\")"));
            okButton.Click();

            

            var deletedNote = _driver.FindElements(MobileBy.XPath("//android.widget.TextView[@text='Note for Delete']"));

            Assert.That(deletedNote, Is.Empty, "Note was not deleted");
            

        }

    }
}