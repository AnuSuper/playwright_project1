//run the program  npx playwright test WebAPI-Part1.spec.js
import {expect, test, request} from '@playwright/test';
import {APIUtils} from './Utils/APIUtils';
let Token;
let OrderId;
let response;
let message;

const LoginPayload = {
  userEmail: "anu@yahoo.com",
  userPassword: "Indu2005"
}



const OrderPayLoad = {
  "orders": [
    {
      country: "Cape Verde",
      productOrderedId: "6964af52c941646b7a919472"  
    }
  ]
}
//let Token;




test.beforeAll(async () => {
  const APIContext = await request.newContext();
  const apiUtils= new APIUtils(APIContext,LoginPayload);
  response= await apiUtils.createOrder(OrderPayLoad);

 
  
	       
});

test.beforeEach(() => {

});
test('@API Place the order', async ({ page }) => {
  await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();

  const rows = page.locator("tbody tr");  // no await needed on locator()

  for (let i = 0; i < await rows.count(); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (response.orderId?.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  // ✅ waitFor() on the Locator, then textContent()
  await page.locator(".col-text").waitFor({ state: 'visible' });
  const orderIdDetails = await page.locator(".col-text").textContent();

  console.log("OrderIdDetails:", orderIdDetails);
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
  await page.pause();
});
//await page.pause();





// Add at least one test case
/*test('API Login Test', async ({page}) => {
 
 await page.addInitScript(value=>{
    window.localStorage.setItem('token',value);},response.token
  );
       await page.goto('https://rahulshettyacademy.com/client/');
        await page.locator("button[routerlink*='myorders']").click();
        await page.locator("tbody").waitFor();
        await page.locator("table").waitFor();
  const TableRow = page.locator("tbody tr");
  const RowCount = await TableRow.count();
  console.log("Row Count ",RowCount);
  


 
for(let i = 0; i < RowCount; i++) {
    //const TestOrderId = await TableRow.nth(i).locator("th").inputValue
     const TestOrderId = await TableRow.nth(i).locator("th").textContent();
    
   if (response.OrderId?.includes(TestOrderId)) {
      
      await TableRow.nth(i).locator("button.btn.btn-primary").click();
      break;
    }
  }
 
  
  const OrderNo=await page.locator(".col-text").textContent().waitFor({ state: 'visible' });;
  console.log("OrderNo: ",OrderNo)
  expect(OrderNo?.includes(response.orderId)).toBeTruthy();
 

  await page.pause();      

});*/






