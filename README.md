# storeManager
 One-page site project build with: React, MUI,Firebase.
 ####The site includes:
- Store manager site - accessible only to admin.
- Shopping site - accessible only to users.
- Homepage of the shopping store - public with an option to log in or sing up.

 ### Login:
 - As admin: username: storeA, password: 111
 - As user: username: dna, password: dna 
 - Or sin up.
 
___

## Admin
### Pages available to admin and their functionalities:
#### Dashboard 
Contains information on:
-  How many times each product sold.
-  How much every customer spent.
- How many purchases were sold in each day (if there are no purchases the day will not display at the dashbord). 

#### Products 
- Display all the products in the store and also those that are out of stock.
- On clicking on the button "Add Product" the admin can add a new product (product with name, price, quantity, details, and image)  
- On clicking on the button "Edit This Product" the admin can update the product in any part or delete the product.
- Contain a list of product's customers.

#### Customers
- Display all the customers in a table that includes the customer's full name, their city, and all purchases (a button links to edit product).
- In each line there is a button "Buy Product" that leads to a popup that includes a list of all the available products, admin can add multiple products to the specific customer.

#### Purchases
- Display all the purchases per customer.
- Admin can search for some customers by name, and display only that customer.
- Admin can search for some products by name, and find how bought the product.

___

## User
- Sign up

### Pages available to usres (customers) and thier functionality:

#### Products 
- Display all the products in store that are in stock.
- Click on the button "Buy Product" will display a popup with the option to buy the chosen product or to add multiple products from a list at a single time.

#### Customers
- Display all the customers in a table that includes the customer's full name and city, and all their purchases.


