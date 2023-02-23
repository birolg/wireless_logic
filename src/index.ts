import {getProducts} from "./service/product-service";

getProducts().then(products => {
  console.log(products);
})
