const { Dashboard }    = require("./Dashboard");
const { LoginPage }    = require("./LoginPage");
const { CartPage }     = require("./CartPage");
const { BillingPage }  = require("./BillingPage");
const { ThankingPage } = require("./ThankingPage");


class POManager{
    constructor(page){
        this.page=page;
        this.loginpage= new LoginPage(this.page);
        this.productcat= new Dashboard(this.page);
        this.cartpage = new CartPage(this.page);
        this.billing= new BillingPage(this.page);
        this.thankingpage= new ThankingPage(this.page);
    }
    getLoginPage(){
        return this.loginpage;
    }
    getDashboard()
    {
        return this.productcat;
    }
    getCartPage(){
        return this.cartpage;
    }
    getBillingPage(){
        return this.billing;
    }
    getThankingPage(){
        return this.thankingpage;
    }
}



  module.exports={POManager};