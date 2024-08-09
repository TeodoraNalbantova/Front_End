using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IdeaCenter.Pages
{
    public class CreateIdeaPage : BasePage
    {
        public CreateIdeaPage(IWebDriver driver) : base(driver)
        {
                
        }

        public string Url = BaseUrl + "/Ideas/Create";

        public IWebElement TitleInput => driver.FindElement(By.XPath("//input[contains(@id,'form3Example1c')]"));

        public IWebElement ImageInput => driver.FindElement(By.XPath("//input[@id='form3Example3c']"));

        public IWebElement DescriptionInput => driver.FindElement(By.XPath("//textarea[@id='form3Example4cd']"));

        public IWebElement CreateButton => driver.FindElement(By.XPath("//button[@type='submit']"));


        public IWebElement MainMessage => driver.FindElement(By.XPath("//li[contains(.,'Unable to create new Idea!')]"));

        public IWebElement TittleErrorMessage => driver.FindElement(By.XPath("//span[@class='text-danger field-validation-error'][contains(.,'The Title field is required.')]"));

        public IWebElement DescriptionErrorMessage => driver.FindElement(By.XPath("//span[@class='text-danger field-validation-error'][contains(.,'The Description field is required.')]"));


        public void CreateIdea(string title,string imageUrl, string description)
        {
            TitleInput.SendKeys(title);
            ImageInput.SendKeys(imageUrl);
            DescriptionInput.SendKeys(description);
            CreateButton.Click();
        }

        public void AssertErrorMessages()
        {
            Assert.True(MainMessage.Text.Equals("Unable to create new Idea!"), "Main message is not as expected.");

            Assert.True(TittleErrorMessage.Text.Equals("The Title field is required."), "Title message is not as expected.");

            Assert.True(DescriptionErrorMessage.Text.Equals("The Description field is required."), "Description message is not as expected.");
        }

        public void OpenPage()
        {
            driver.Navigate().GoToUrl(Url);
        }

    }
}
