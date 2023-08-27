---

# Inventory Application

Web application to manage and organize items within an inventory using CRUD actions.

## Setup and Installation

Get this inventory app running on your local environment by following these instructions.

### Prerequisites

Ensure [Node.js](https://nodejs.org/en/download/) and [npm](http://npmjs.com) are installed on your machine.

### Steps

1. Clone the project repository:

   ```bash
   git clone https://github.com/ForkEyeee/inventory-application
   ```

2. Change into the project directory:

   ```bash
   cd inventory-application
   ```

3. Install the necessary dependencies:

   ```bash
   npm install
   ```

4. Launch the development server:

   ```bash
   npm start
   ```

Now, open your browser and go to `http://localhost:3000` to begin managing your inventory.

## Building for Production

When you're set to deploy the app to a production setting:

```bash
npm run build
```

## Technology Stack

This Inventory App was built using:

- [Node.js](https://nodejs.org/en/) for a dependable runtime environment
- [Express](https://expressjs.com/) as the backbone web server framework
- [Pug](https://pugjs.org/) for server-side template rendering
- [MongoDB](https://www.mongodb.com/) as a flexible NoSQL database solution
- [Mongoose](https://mongoosejs.com/) for object data modeling with MongoDB

## Features

1. **Categorized View**: Browse through distinct product categories directly from the homepage.
2. **CRUD Operations**: Enables users to Create, Read, Update, and Delete both items and their respective categories.
