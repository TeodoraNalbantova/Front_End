

namespace IdeaCenter.Tests
{
    public class IdeaCenterTests : BaseTest
    {
        public string lastCreatedIdeaTitle;
        public string lastCreatedIdeaDescription;
        [Test,Order (1)]
        public void CreateIdeaWithInvalidDataTest()
        {
            createIdeaPage.OpenPage();

            createIdeaPage.CreateIdea("", "", "");

            createIdeaPage.AssertErrorMessages();
        }

        [Test, Order(2)]
        public void CreateIdeaWithValidDataTest()
        {
            lastCreatedIdeaTitle = "Idea " + GenerateRandomString(5);
            lastCreatedIdeaDescription = "Description " 
                 + GenerateRandomString(5);

            createIdeaPage.OpenPage();

            createIdeaPage.CreateIdea(lastCreatedIdeaTitle, "",  lastCreatedIdeaDescription);

            Assert.That(driver.Url, Is.EqualTo(myIdeasPage.Url));

            Assert.That(myIdeasPage.DescriptionLastIdea.Text.Trim(), Is.EqualTo(lastCreatedIdeaDescription));

          
        }



        [Test, Order(3)]
        public void ViewLastCreatedIdea()
        {
            myIdeasPage.OpenPage();
            myIdeasPage.ViewButtonLastIdea.Click();

            Assert.That(ideasReadPage.IdeaTitle.Text.Trim(), Is.EqualTo(lastCreatedIdeaTitle), "Title do not match");

            Assert.That(ideasReadPage.IdeaDescription.Text.Trim(), Is.EqualTo(lastCreatedIdeaDescription), "Description do not match");



        }

        [Test, Order(4)]
        public void EditIdeaTitle()
        {
            myIdeasPage.OpenPage();
            myIdeasPage.EditButtonLastIdea.Click();

            
            string updatedTitle = "Changed title " + lastCreatedIdeaTitle;

            ideasEditPage.TitleInput.Clear();

            ideasEditPage.TitleInput.SendKeys(updatedTitle);

            ideasEditPage.EditButton.Click();



            Assert.That(driver.Url, Is.EqualTo(myIdeasPage.Url));

            myIdeasPage.ViewButtonLastIdea.Click();

            Assert.That(ideasReadPage.IdeaTitle.Text.Trim(), Is.EqualTo(updatedTitle));


        }


        [Test, Order(5)]
        public void EditIdeaDescription()
        {
            myIdeasPage.OpenPage();
            myIdeasPage.EditButtonLastIdea.Click();


            string updatedDescription = "Changed description " + lastCreatedIdeaDescription;

            ideasEditPage.DescriptionInput.Clear();


            ideasEditPage.DescriptionInput.SendKeys(updatedDescription);

            ideasEditPage.EditButton.Click();



            Assert.That(driver.Url, Is.EqualTo(myIdeasPage.Url));

            myIdeasPage.ViewButtonLastIdea.Click();

            Assert.That(ideasReadPage.IdeaDescription.Text.Trim(), Is.EqualTo(updatedDescription));


        }


        [Test, Order(6)]
        public void DeleteLastIdeaTest()
        {
            myIdeasPage.OpenPage();
            myIdeasPage.DeleteButtonLastIdea.Click();

            bool isIdeaDeleted = myIdeasPage.IdeasCards.All(card => card.Text.Contains(lastCreatedIdeaDescription));

            Assert.IsFalse(isIdeaDeleted, "The idea was not deleted.");




        }


    }
}
