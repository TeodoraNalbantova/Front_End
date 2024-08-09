using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IdeaCenter.Pages
{
    public class IdeasEditPagecs : BasePage
    {
        public IdeasEditPagecs(IWebDriver driver) : base(driver)
        {

        }

        public string Url = BaseUrl + "/Ideas/Edit";

        public IWebElement TitleInput => driver.FindElement(By.XPath("//input[contains(@id,'form3Example1c')]"));

        public IWebElement ImageInput => driver.FindElement(By.XPath("//input[@id='form3Example3c']"));

        public IWebElement DescriptionInput => driver.FindElement(By.XPath("//textarea[@id='form3Example4cd']"));

        public IWebElement EditButton => driver.FindElement(By.XPath("//button[@type='submit']"));

    }
}
