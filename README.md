** e-commerce Backend  API**
This is an e-commerce API built using Express.js and MongoDB

***Features**:
User registration and authentication
Create and manage products
Add products to the cart
Admin management for products

**Prerequisites**:

Before you begin, ensure you have met the following requirements:
Node.js (v18 or higher)
MongoDB: You can use either a local installation or a cloud MongoDB database (e.g., MongoDB Atlas)
npm: Node package manager


**Installation**: 

Clone the repository:git clone https://github.com/lalatendu65/e-commerce_dev.git

Navigate to the project directory:cd e-commerce_dev

Install dependencies:npm install

**Usage**:

Create a .env file in the root directory of the project. You can use the provided .env.example file as a template:

Set up your MongoDB connection in the .env file:

Start the application:npm start

The server will start on the default port (8000). You can access the API at http://localhost:8080

**Environment Variables**:

The following environment variables are required for the application to run:

MONGODB_URI: The connection string for your MongoDB database.

PORT: The port the server will run on (default is 8000).

JWT_SECRET (optional, if you use JWT for authentication): A secret key for signing JWT

Make sure to create your own values for these variables in the .env file.



**API Endpoints:**

Go through the APi documnet that avalibale  POSTMAN 

POSTAMN LINK : https://lunar-astronaut-645857.postman.co/workspace/Team-Workspace~35e4d489-294a-4077-8a2d-6625c7dec53c/collection/24434283-ea32f6e2-b193-45a8-b89a-127c32a033cf?action=share&creator=24434283

**Note**: 

All the api are hosted in aws EC2 instance 

To acces the api you can use the URL : http://3.110.46.4:8000/


