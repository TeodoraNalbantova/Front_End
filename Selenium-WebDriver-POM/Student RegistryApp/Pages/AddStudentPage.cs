using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Student_RegistryApp.Pages
{
    public class AddStudentPage : BasePage
    {
        public AddStudentPage(IWebDriver driver): base(driver)
        {
            
        }

        public override string PageURL => "http://softuni-qa-loadbalancer-2137572849.eu-north-1.elb.amazonaws.com:82/add-student";

        public IWebElement FieldName => driver.FindElement(By.XPath("//input[@id='name']"));

        public IWebElement FieldEmail => driver.FindElement(By.XPath("//input[@id='email']"));

        public IWebElement AddButton => driver.FindElement(By.XPath("//button[@type='submit']"));


        public IWebElement ErrorMessage => driver.FindElement(By.CssSelector("body > div"));

        public string GetErrorMesasge()
        {
            return ErrorMessage.Text;
        }

        public void AddStudent(string name, string email)
        {

            this.FieldName.SendKeys(name);
            this.FieldEmail.SendKeys(email);
            this.AddButton.Click();
        }

    }
}
