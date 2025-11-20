# DripDistrict

A full-stack Fashion E-commerce Shopping app where you can browse, add to cart, add to wishlist products along with Removing them. Browse products by category like women, men and kids. From placing orders and adding shipping details to browsing order history.

Developed using React JS, React Router, Express, Node JS and MongoDb database.

## Demo Link

[Live Demo](https://drip-district-ru5c.vercel.app/)

## Quick Start

```
git clone https://github.com/Adityam53/DripDistrict.git
cd DripDistrict
cd Front-End
npm install
npm run dev
```

## Technologies

- React JS
- React Router
- Express
- Node JS
- MongoDB

## Demo Video

Watch a walkthrough (4 minutes) of all major features of this app:[Loom Video](https://www.loom.com/share/581b05b262594e74a6fd8ffaaffec1d6)

## Features

**Home**

- Heor Images displaying Women,men and kids.
- Bestselling products.
- Latest Offers.

**All Collection**

- List of Products displaying their title, image, price and add to wishlist button.
- Filtering by categiry, price and rating.
- Sorting by price.
- Total Product Count.
- Search by product category,title.

**Category Products**

- List of products according to their category displaying their title,image and price.
- Filtering by price and rating.
- Sorting by price.
- Search by product category,title.

**Wishlist**

- List of Products added to wishlist.
- Add to cart button.
- Remove from cart.

**Cart**

- Details of product such as title, price, discounted price, image, quantity and total.
- Remove from cart.
- Move to wishlist.
- Manage quantity.
- Checkout

**Address**

- Add new Address.
- Choose existing address.
- Continue to checkout.

**Checkout**

- Order Summary.
- Calculation of subtotal before shipping charges.
- Total Order value with or without shipping charges.
- Selected Delivery Address.
- Place Order.

**Orders**

- Browse through Previous orders.
- Order total and summary.

**Help**

- Return Policy
- Terms and Conditions
- Privacy Policy
- Contact

## API Reference

### **GET/API/clothes**<br>

List All clothes<br>
Sample Response:<br>

```

[{_id,title,price,tags},...]

```

### **GET/API/category/clothes**<br>

List All clothes by categiry<br>
Sample Response:<br>

```

[{_id,title,price,tags},...]

```

### **GET/API/clothes/:id**<br>

clothes By Id<br>
Sample Response:<br>

```

{\_id,title,price,tags}

```

### **GET/API/orders**<br>

List all orders<br>
Sample Response:<br>

```

{\_id,items,total,shipping}

```

### **GET/api/address**<br>

List all addresses
Sample Response:

```
[{\_id, housenumbers, road,city, ... }]
```

### **POST/api/address**<br>

Create a new address (protected)
Sample Response:

```
[{\_id, housenumbers, road,city, ... }]
```

### **POST /api/orders**<br>

Create a new order (protected)
Sample Response:

```
{\_id,items,total,shipping}
```

## Contact

For bugs or feature requests, please reach out to (adityamoorjmalani53@gamil.com)
