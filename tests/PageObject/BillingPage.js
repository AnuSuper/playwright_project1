class BillingPage{
    constructor(page){
        this.page=page;
        this.credittTxt=page.locator("input[value='4542 9931 9292 2293']");
        this.cscNo=page.locator("(//input[@class='input txt'])[1]");
        this.namecard=page.locator("(//input[@class='input txt'])[2]");
        this.coupon=page.locator("//input[@name='coupon']");
        
        this.couponclick=page.locator("button[type='submit']");
        this.emaitxt=page.locator("input.txt.text-validated.ng-untouched.ng-pristine.ng-valid");
        this.selectcounttxt=page.locator("//input[@placeholder='Select Country']");
        this.Waitforme=page.locator(".ta-results");
        this.TypeCountryName=page.getByRole("button",{name:'Canada'})
        this.PlaceOrderbtnn=page.locator(".btnn");
    }
   async Formfilling(){
    await this.credittTxt.fill("3456 6789 4567 4567");
    await this.page.selectOption("(//select[@class='input ddl'])[1]", '03');
    await this.page.selectOption("(//select[@class='input ddl'])[2]", '16');
    await this.cscNo.fill("345");
    await this.namecard.fill("MANURADHA");
    await this.coupon.fill("rahulshettyacademy");
    await this.couponclick.click();
    await this.emaitxt.fill("anu@yahoo.com");
    await this.selectcounttxt.click();
   
   await this.selectcounttxt.pressSequentially("Can");
//await this.selectcounttxt.fill("Can");
//await this.selectcounttxt.press("ArrowDown");
await this.Waitforme.waitFor();
await this.TypeCountryName.click();
//await this.PlaceOrderbtnn.waitFor();
await this.PlaceOrderbtnn.click();
   }

}
module.exports={BillingPage};