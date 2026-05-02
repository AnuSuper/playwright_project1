

 const { test, expect } = require('@playwright/test');
const { POManager } = require('./PageObject/POManager');
//const dataset = require('./Utils/PlaceOrderTestData.json');
  const dataset =  JSON.parse(JSON.stringify(require("./Utils/PlaceOrderTestData.json")));
//const dataset =  JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

//test.describe.configure({mode:'parallel'});

for (const data of dataset) {
  test(`@Web ClientTest for ${data.UserName}`, async ({ page }) => {

    
    const poManager = new POManager(page);
    const products = page.locator(".card-body");
    const loginpage = poManager.getLoginPage();

    
   
    await loginpage.GoTo();
    await loginpage.validLogin(data.UserName, data.PassWord);

    const productcat = poManager.getDashboard();
    await productcat.findProduct(data.ProductName);
    await productcat.GotoCart();

   
    const cartpage = poManager.getCartPage();
    await cartpage.GoBillPage();

    const billing = poManager.getBillingPage();
    await billing.Formfilling();

    const thankingpage = poManager.getThankingPage();
    await thankingpage.confirmTheText();
  });
}