export interface SignUpUser {
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}

export interface LoginUser{
    email:string;
    password:string;
}

export interface Product{
    pid:string;
    name:string;
    image:string
    price:number;
}

export interface ProductCart{
    product_count:number;
    product_total:number;
}

export interface CartData{
    product: Product;
    productCart: ProductCart;
}