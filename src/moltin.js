const MoltinGateway = require('@moltin/sdk').gateway;

let  client_id = 'S23caP7og6NgnJcwQ36Q1H2SC6tnu3GVnBm6V8zK53';

let client_secret_id = process.env.REACT_APP_MOLTIN_CLIENT_SECRET_ID; 

const Moltin = MoltinGateway({
    client_id,
    client_secret_id
});

export const GetProducts = () =>
  Moltin.Products.With('files, main_images, collections').All();

export const GetProduct = ID => Moltin.Products.With(['main_image']).Get(ID);

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