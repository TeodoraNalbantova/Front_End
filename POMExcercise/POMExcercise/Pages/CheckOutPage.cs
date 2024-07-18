using Microsoft.VisualStudio.TestPlatform.ObjectModel.Client;
using OpenQA.Selenium;
using POMExercise.Pages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace POMExcercise.Pages
{
    public class CheckOutPage : BasePage
    {
        protected readonly By firstNameInput = By.XPath("//input[@id='first-name']");

        protected readonly By lastNameInput = By.XPath("//input[@id='last-name']");

        protected readonly By postalCodeInput = By.XPath("//input[@id='postal-code']");

        protected readonly By continueButton = By.XPath("//input[@id='continue']");

        protected readonly By finishButton = By.XPath("//button[@id='finish']");

        protected readonly By completeHeader = By.CssSelector("div#checkout_complete_container > .complete-header");


        public CheckOutPage(IWebDriver driver) : base(driver)
        {
            
        }

        public void FillFirstName(string firstName)
        {
            Type(firstNameInput, firstName);
        }

        public void FillLastName(string lastName) 
        {  Type(lastNameInput, lastName); 

        }

        public void fillPostalCode(string postalCode) 
        { 
            Type(postalCodeInput, postalCode); 
        }

        public void ClickContinueButton()
        {
            Click(continueButton);
        }


        public void ClickFinishButton()
        {
            Click(finishButton);
        }

        public bool IsPageLoades()
        {
            return driver.Url.Contains("checkout-step-one.html") || driver.Url.Contains("checkout-step-two.html");
        }

        public bool IsCheckOutColpete()
        {
            return GetText(completeHeader) == "Thank you for your order!";
        }
    }
}
