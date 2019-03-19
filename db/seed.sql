CREATE TABLE "merchants" (
  "id" serial primary key,
  "merchant_name" varchar 
);

CREATE TABLE "products" (
  "id" serial primary key,
  "name" varchar,
  "merchant_id" int REFERENCES merchants(id),
  "price" int
);


CREATE TABLE "users" (
  "id" serial primary key,
  "first_name" varchar,
  "last_name" varchar,
  "email" varchar
);


CREATE TABLE "orders" (
  "id" serial primary key,
  "user_id" int references users(id),
  "status" varchar,
  "created_at" varchar,
  "address1" varchar,
  "address2" varchar,
  "address3" varchar,
  "city" varchar,
  "state" varchar,
  "country" varchar,
  "postal_code" varchar
);

CREATE TABLE "order_items" (
  "id" serial primary key,
  "order_id" int references orders(id),
  "product_id" int references products(id),
  "quantity" int
);


CREATE TABLE "streams" (
  "id" serial primary key,
  "name" varchar,
  "archive_id" int,
  "stream_id" int,
  "created_at" int,
  "url" varchar,
  "product_id" int REFERENCES products(id)
);