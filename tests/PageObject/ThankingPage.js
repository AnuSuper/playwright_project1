
const { expect } = require('@playwright/test'); 
class ThankingPage{
    constructor(page){
        this.page=page;
        this.confirmText=page.locator(".hero-primary") 

    }
  async  confirmTheText(){
    await expect(this.confirmText).toHaveText(" Thankyou for the order.")
    //await expect(this.confirmText).toHaveText(" Thankyou for the order. ");

    }
}
module.exports={ThankingPage}