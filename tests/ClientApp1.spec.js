import {expect,test} from '@playwright/test';
 
test('Login',async({page})=>{
   
  const Password = page.locator("#userPassword");
   const email = "meenakumari@yahoo.com";
     await page.goto('https://rahulshettyacademy.com/client/');
      await page.getByPlaceholder("email@example.com").fill(email)
  await page.getByPlaceholder("enter your passsword").fill("durga64");
  await page.getByRole("button",{name:'login'}).click();
   await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  //const FirstItem =  ItemName.allTextContents();
 // console.log(FirstItem);
  await page.locator(".col-lg-4").filter({hasText:'ZARA COAT 3'}).getByRole("button",({name:'Add To Cart'})).click();
 
  await page.getByRole("listitem").getByRole("button",{name:'Cart'}).click();
  await page.locator(".infoWrap").waitFor();
  const ProductName=await page.locator(".infoWrap").filter({hasText:'ZARA COAT 3'}).isVisible();
  expect(ProductName).toBeTruthy();
  await page.getByRole("button",{name:'Checkout'}).click();
  await page.getByPlaceholder("Select Country").pressSequentially("Can");
 await page.locator(".ta-results").waitFor();
 await page.getByRole("button",{name:'Canada'}).click();
 await page.getByText("PLACE ORDER").click();
 await page.getByText("Thankyou for the order.").waitFor();
 const ConfirmText=await page.getByText("Thankyou for the order.").isVisible();
 expect(ConfirmText).toBeTruthy();
 const OrderNo= await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
 await page.getByRole("button",{name:'ORDERS'}).click();
 
  
     await page.pause();


});