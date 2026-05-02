class APIUtils {
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }
 
    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayLoad
        });
        const loginResponseJson = await loginResponse.json();
        const Token = loginResponseJson.token; // Check actual response structure
        console.log(Token); // Fixed case
        return Token;
    }
 
    async createOrder(orderPayLoad) {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        });
        const orderResponseJson = await orderResponse.json();
        console.log("JsonResponse: ",orderResponseJson)
        //response.orderId = orderResponseJson.orders[0]; // Add this
        response.message=orderResponseJson.message[1];
        
        console.log("OrderId: ",response.orderId)
        console.log("Message: ",response.message)
        return response; // Add this
    }
}

export { APIUtils };