class productCatlog{
    constructor(page){
        this.page=page;
        this.products=page.locator(".col-lg-4")
        this.CartClick=page.locator("//button[@routerlink='/dashboard/cart']");
    }
   async findProduct(ProductName){
      await  this.products.filter({hasText:ProductName}).getByRole("button",({name:'Add To Cart'})).click();
    }
    async GotoCart(){
       await this.CartClick.click();
    }
}
module.exports={productCatlog};