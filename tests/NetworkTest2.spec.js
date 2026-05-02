import {test,expect,request} from  '@playwright/test';

test ('security test request intercept',async({page})=>{
     const Email = page.locator("#userEmail");
  const Password = page.locator("#userPassword");
  const SignIn = page.locator("#login");
  const ItemName = page.locator(".card b");
  const email = "meenakumari@yahoo.com";
 
  await page.goto('https://rahulshettyacademy.com/client/');
  await Email.fill(email);
  await Password.fill("durga64");
  await SignIn.click();
  
 // await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  await page.locator("//button[@routerlink='/dashboard/myorders']").click();
    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route=>route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6979a43ac843646b7abeff9d'}));
    page.locator("button:has-text('view')").first().click();
  await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
    // await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
    await page.pause();
}



)