class CartPage{
    constructor(page){
        this.page=page;
      
        this.btnCheckOut = page.getByRole("button", {name:'Checkout'});
    }
    async GoBillPage(){
      await  this.btnCheckOut.click();
    }

}
module.exports={CartPage};