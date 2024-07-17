using Student_RegistryApp.Pages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Student_RegistryApp.Tests
{
    public class AddStudentsTests : BaseTest
    {
        [Test]
        public void Test_TestAddStudentPage_Content()


        {
            AddStudentPage addStudentsPage = new AddStudentPage(driver);
            addStudentsPage.OpenPage();

            Assert.Multiple(() =>
            {
                Assert.That(addStudentsPage.GetPageTitle(), Is.EqualTo("Add Student"));

                Assert.That(addStudentsPage.GetPageHeading(), Is.EqualTo("Register New Student"));
            });

            Assert.That(addStudentsPage.FieldName.Text, Is.EqualTo(""));
            Assert.That(addStudentsPage.FieldEmail.Text, Is.EqualTo(""));
            Assert.That(addStudentsPage.AddButton.Text, Is.EqualTo("Add"));


        }

        [Test]
        public void Test_AddStudentPage_Links()
        {
            var addStudentsPage = new AddStudentPage(driver);

            addStudentsPage.OpenPage();

            addStudentsPage.HomeLink.Click();
            Assert.That(new HomePage(driver).IsPageOpen(), Is.True);

            addStudentsPage.OpenPage();
            addStudentsPage.AddStudentLink.Click();
            Assert.That(new AddStudentPage(driver).IsPageOpen(), Is.True);


            addStudentsPage.OpenPage();
            addStudentsPage.ViewStudentLink.Click();
            Assert.That(new ViewStudentsPage(driver).IsPageOpen(), Is.True);
        }



        [Test]
        public void Test_AddStudentsPage_AddValidStudent()
        {
            AddStudentPage addStudentsPage = new AddStudentPage(driver);
            addStudentsPage.OpenPage();

            string name = GenerateRandomName();
            string email = GenerateRandomEmail(name);

            addStudentsPage.AddStudent(name, email);

            ViewStudentsPage viewStudentsPage = new ViewStudentsPage(driver);

            Assert.That(viewStudentsPage.IsPageOpen(), Is.True);

            var students = viewStudentsPage.GetRegisteredStudents();

            string newStudentFullString = name + " (" + email + ")";

            Assert.True(students.Contains(newStudentFullString));


        }

        [Test]
        public void Test_TestAddStudentPage_AddInvalidStudent()


        {
            AddStudentPage addStudentsPage = new AddStudentPage(driver);
            addStudentsPage.OpenPage();

            

            addStudentsPage.AddStudent("", "peter@abv.bg");

            Assert.That(addStudentsPage.IsPageOpen(), Is.True);
            Assert.That(addStudentsPage.GetErrorMesasge(),Is.EqualTo("Cannot add student. Name and email fields are required!"));

        }









        private string GenerateRandomName()
        {
            var random = new Random();
            string[] names = { "Ivan", "Pesho", "Toshko", "Sasho" };

            return names[random.Next(names.Length)] + random.Next(999,9999).ToString();
        }
        private string GenerateRandomEmail(string name)
        {
            var random = new Random();
            

            return name.ToLower() + random.Next(999, 9999).ToString() + "@gmail.com";
        }
    }
}
