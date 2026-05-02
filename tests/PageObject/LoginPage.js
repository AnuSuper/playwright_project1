class LoginPage{
    constructor(page){
        this.page=page;
      this.username=  page.locator("#userEmail");
      this.PassWord=page.locator("#userPassword");
      this.SubmitButton=page.locator("#login")
    }
   async validLogin(UserEmail, UserPossword){
   
   await this.username.fill(UserEmail);
   await  this.PassWord.fill(UserPossword)
  await   this.SubmitButton.click();
    }
    async GoTo(){
         await this.page.goto('https://rahulshettyacademy.com/client/');
    }

}
module.exports={LoginPage};