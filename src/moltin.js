const MoltinGateway = require('@moltin/sdk').gateway;

let client_id = '5aQC7J6yyUxpv8XZj2RVpsG7qScEOxz3UTw6lH4peu';
let client_secret_id = process.env.CLIENT_SECRET;

const Moltin = MoltinGateway({
    client_id,
    client_secret_id
});

export const GetProducts = () =>
  Moltin.Products.With('files, main_images, collections').All();

export const GetProduct = ID => Moltin.Products.Get(ID);

export const GetCategories = () => Moltin.Categories.With('products').All();

export const GetCategory = ID => Moltin.Categories.Get(ID);

export const GetCollections = () => Moltin.Collections.With('products').All();

export const GetBrands = () => Moltin.Brands.All();

export const GetFile = ID => Moltin.Files.Get(ID);

export const AddCart = (id, quantity) => Moltin.Cart().AddProduct(id, quantity);

export const UpdateCartPlus = (ID, quantity) =>
  Moltin.Cart().UpdateItemQuantity(ID, quantity + 1);

export const UpdateCartMinus = (ID, quantity) =>
  Moltin.Cart().UpdateItemQuantity(ID, quantity - 1);

export const UpdateCart = (ID, quantity) =>
  Moltin.Cart().UpdateItemQuantity(ID, quantity);

export const GetCartItems = () => Moltin.Cart().Items();

export const Checkout = (customer, billing, shipping) => Moltin.Cart().Checkout(customer, billing, shipping);

export const GetOrder = ID => Moltin.Orders.Get(ID);

export const OrderPay = (ID, data) => Moltin.Orders.Payment(ID, data);

export const DeleteCart = () => Moltin.Cart().Delete();