const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./Utils/APIUtils');

const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayLoad = {
  orders: [{ country: "India", productOrderedId: "67a8dde5c0d3e6622a297cc8" }]
};
const fakePayLoadOrders = { data: [], message: "No Orders" };

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
  console.log("Order response:", response);
  if (!response?.token) {
    throw new Error("beforeAll failed — invalid token. Check credentials and productOrderedId.");
  }
});

test('@SP Place the order', async ({ page }) => {
  // Inject token into localStorage before page loads
  await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");

  // Intercept and fake the orders API response
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const apiResponse = await page.request.fetch(route.request());
      route.fulfill({
        response: apiResponse,
        body: JSON.stringify(fakePayLoadOrders),
      });
    }
  );

  // Register waitForResponse BEFORE triggering the navigation
  const ordersResponsePromise = page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"
  );

  await page.locator("button[routerlink*='myorders']").click();
  await ordersResponsePromise;

  const message = await page.locator(".mt-4").textContent();
  console.log("Orders page message:", message);
  expect(message).toContain("No Orders");
});