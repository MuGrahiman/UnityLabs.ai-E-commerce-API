# UnityLabs.ai E-commerce API

## Introduction

This project involves the development of a REST API for an e-commerce marketplace, allowing buyers and sellers to interact with the system through various endpoints.

## Features

Buyers and sellers can register and log in to the system.
Sellers can create catalogs of items, specifying names and prices.
Buyers can retrieve a list of sellers.
Buyers can access a specific seller's catalog, listing the available items.
Buyers can create orders, containing a list of items from a specific seller's catalog.
Sellers can retrieve a list of orders they've received.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Installation

- Clone the repository: git clone https://github.com/MuGrahiman/UnityLabs.ai_backend.git
- Install dependencies: npm install

### Configuration

Configure your environment variables by creating a .env
Set up your connections :
CONNECTION_URL=your_database_connection_url
PORT=your_port_number
JWT_SECRET=your_jwt_secret_key

### Run the Application

cd UnityLabs.ai_backend
npm start

## Usage

### Auth APIs

- **Register a User:**

  - **Endpoint:** POST /api/auth/register
  - **Payload:** { "username": "your_username", "password": "your_password", "type": "buyer" // or "seller"}

- **Login:**
  - **Endpoint:** POST /api/auth/login
  - **Payload:** {"username": "your_username","password": "your_password", "type": "buyer" // or "seller"}

### APIs for Buyers

- **Get List of Sellers:**

  - **Endpoint:** GET /api/buyer/list-of-sellers

- **Get Seller's Catalog:**

  - **Endpoint:** GET /api/buyer/seller-catalog/:seller_id

- **Create Order:**
  - **Endpoint:** POST /api/buyer/create-order/:seller_id
  - **Payload:** {
    "buyer":"buyer_id",
    "seller":"seller_id",
    "items": [ {"product_id"}],
    "totalPrice":"totalPrice in number",
    }

### APIs for Sellers

- **Create Catalog:**

  - **Endpoint:** POST /api/seller/create-catalog
  - **Payload:** {
    "seller":"seller_id",
    "products": [ {"product_id"}],
    }

- **Create Product:**

  - **Payload:**
    {
    "name": {"Product name"},
    "price": {Product price}
    }

- **Get Orders:**
  - **Endpoint:** GET /api/seller/orders

## Testing

To test the API, you can use tools like Postman or any API testing tool. Ensure that you follow the API documentation provided above for correct payload formats.

## Deployment

To deploy this Node.js project, follow these steps:

1. **Install Dependencies:**
   npm install --production
2. **Configure Environment Variables:**
   Create a .env file in the root of your project and set the necessary environment variables.
3. **Run the Application:**
   npm start || node index.js
4. **Access the API:**
   The API should now be running on your port no Access it using the specified endpoint, for example: http://localhost:your port no.

## Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime for server-side development
- [Express.js](https://expressjs.com/) - Web application framework for Node.js
- [MongoDB](https://www.mongodb.com/) - NoSQL database (or your chosen database)
- [bcrypt](https://www.npmjs.com/package/bcrypt) - For password hashing
- [dotenv](https://www.npmjs.com/package/dotenv) - For environment variable management
- [express](https://www.npmjs.com/package/express) - Web application framework
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - For generating and verifying JSON Web Tokens
- [mongoose](https://www.npmjs.com/package/mongoose) - MongoDB object modeling tool
- [morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware
- [nodemon](https://www.npmjs.com/package/nodemon) - Utility that monitors for changes and automatically restarts the server

