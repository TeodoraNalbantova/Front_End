﻿using Student_RegistryApp.Pages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Student_RegistryApp.Tests
{
    public class HomePageTests : BaseTest
    {
        [Test]
        public void Test_HomePage_Content()
        {
            HomePage homePage = new HomePage(driver);
            homePage.OpenPage();

            Assert.Multiple(() =>
            {
                Assert.That(homePage.GetPageTitle(), Is.EqualTo("MVC Example"));

                Assert.That(homePage.GetPageHeading(), Is.EqualTo("Students Registry"));
            });


            Assert.True(homePage.StudentsCount() > 0);


        }


        [Test]
        public void Test_HomePage_Links()
        {
            HomePage homePage = new HomePage(driver);
            homePage.OpenPage();

            
            homePage.HomeLink.Click();
            Assert.That(homePage.IsPageOpen(), Is.True);

            homePage.OpenPage();
            homePage.ViewStudentLink.Click();
            Assert.That(new ViewStudentsPage(driver).IsPageOpen, Is.True);

            homePage.OpenPage();
            homePage.AddStudentLink.Click();
            Assert.That(new AddStudentPage(driver).IsPageOpen, Is.True);

        }



    }
}