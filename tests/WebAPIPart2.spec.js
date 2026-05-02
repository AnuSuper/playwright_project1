
import {expect, test, request} from '@playwright/test';
import path from "path";
 let webContext;

test.beforeEach(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const Email = page.locator("#userEmail");
  const Password = page.locator("#userPassword");
  const SignIn = page.locator("#login");
  const email = "meenakumari@yahoo.com";
 
 
  await page.goto('https://rahulshettyacademy.com/client/');
  await Email.fill(email);
  await Password.fill("durga64");
  await SignIn.click();
  await page.waitForLoadState("networkidle");
  
  // Save the storage state
  await context.storageState({ path: "State.json" });
  webContext=await browser.newContext({storageState:'State.json'});
  
 
});

test('Login', async () => {

   const page=await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
  const products = page.locator(".card-body");
  const productName = "ZARA COAT 3";
  const AddtoCart = ".card .btn.w-10.rounded";
 
 
  const ItemName = page.locator(".card b");
 
 
  
 // await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  const FirstItem = await ItemName.allTextContents();
  console.log(FirstItem);
  const productsCount = await products.count();
  console.log(productsCount);
  
  for(let i = 0; i < productsCount; i++) {
    if(await products.nth(i).locator("b").textContent() === productName) {
      await products.nth(i).locator("text=Add To Cart").click();
      break;
    }
  }
  
  await page.locator("//button[@routerlink='/dashboard/cart']").click();
  await page.locator("div li").first().waitFor();
  
  // FIXED: Added await
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();
  
  await page.locator("(//button[@class='btn btn-primary'])[3]").click();
  await page.locator(".payment__type.payment__type--cc.active").click();
  await page.locator("input[value='4542 9931 9292 2293']").clear();
  await page.locator("input[value='4542 9931 9292 2293']").fill("3458 7534 6123 0983");
  
  // Example for selecting dropdown
  await page.selectOption("(//select[@class='input ddl'])[1]", '03');
  await page.selectOption("(//select[@class='input ddl'])[2]", '16');
  await page.locator("(//input[@class='input txt'])[1]").fill("235");
  await page.locator("text=Name on Card").waitFor();
  await page.locator("(//input[@class='input txt'])[2]").fill("Indu Rini");
  await page.locator("//input[@name='coupon']").fill("rahulshettyacademy");
  await page.locator("button[type='submit']").click();
  await page.locator(".mt-1.ng-star-inserted").waitFor();
   
 // await expect(page.locator("label[type='text']")).toHaveText(email);
  
  // pressSequentially method is for entering letter by letter...
  await page.locator("//input[@placeholder='Select Country']").pressSequentially("Can", {delay: 150});
  await page.locator(".ta-results").waitFor();
  await page.locator("//body//app-root//button[2]").click();
  
  // FIXED: Changed from ".btnn,action" to ".btnn.action"
  await page.locator(".btnn").click();
  
  await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order.");
  
  const OrderNo = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log("Order No: ", OrderNo);
  
  await page.locator("//button[@routerlink='/dashboard/myorders']").click();
  await page.locator("table").waitFor();
  const TableRow = page.locator("tbody tr");
  const RowCount = await TableRow.count();
  console.log(RowCount);
  
  for(let i = 0; i < RowCount; i++) {
    const TestOrderId = await TableRow.nth(i).locator("th").textContent();
    
   if (OrderNo?.includes(TestOrderId)) {
      
      await TableRow.nth(i).locator("button.btn.btn-primary").click();
      break;
    }
  }
  const OrderId=await page.locator(".col-text.-main").textContent();
 // expect(OrderNo?.includes(OrderId)).toBeTruthy();
  
  // Optional: Comment out for CI/CD*/
   await page.pause();
});



//for debug go to packkage  in the script type =  "scripts": {"test":"npx playwright test WebAPIPart1.spec.js"},
 // "keywords": [],  then shif+ctl+p  and select = Debug npm script.