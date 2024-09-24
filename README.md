# Retail Product Catalog with Fuzzy Search

This project is a full-stack web application built with **Node.js** and **React.js**, both implemented in **TypeScript**. The backend supports fuzzy searching of products using the **Damerau-Levenshtein algorithm**, enabling the application to handle user input errors and approximations. The frontend provides an intuitive interface for users to search and view product details.

## Features

- **Fuzzy Search**: The search function uses the Damerau-Levenshtein algorithm to return relevant results, even if the search term contains typos or approximate strings.
- **RESTful API**: A backend built using Node.js (TypeScript) provides endpoints for product management and searching.
- **In-Memory Data**: Products are stored in memory and mock data is preloaded on app start.
- **React Frontend**: A responsive UI built in React with TypeScript. 
- **Dynamic Search**: Search results are updated dynamically as the user types, with throttling to avoid overloading the server.
- **OpenAPI Specification**: The API endpoints are documented using an OpenAPI YAML file.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [OpenAPI Specification](#openapi-specification)

## Tech Stack

### Backend (Node.js, TypeScript)

- **Node.js with TypeScript**: Backend for managing product data and handling search queries.
- **Express.js**: RESTful API framework for handling HTTP requests.
- **Damerau-Levenshtein Algorithm**: Custom fuzzy search logic to handle input errors and approximate matches.
  
### Frontend (React, TypeScript)

- **React with TypeScript**: Provides the user interface for the product catalog and search.
- **Fetch API**: Used for making HTTP requests to the backend.
- **Throttling**: Limits the number of search requests sent as the user types.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/skolkari/retail-product-catalog.git
    ```

2. Install dependencies for both frontend and backend

    ```bash
    # Install backend dependencies
    cd frontend
    npm install

    # Install frontend dependencies
    cd backend
    npm install
    ```

3. Run the development servers:

    - For the backend server:

      ```bash
      cd backend
      npm run dev
      ```

    - For the frontend:

      ```bash
      cd frontend
      npm run dev
      ```

4. Access the backend service at `http://localhost:3000`.
5. When backend app starts, some test data will be prepopulated into the application automatically. To populate the your desired data:
   - Inside `backend` folder, open `src/populate-data/populate-products.ts` file.
   - Feed your test data to variable `populateProducts`.
   - Make sure your backend app is up and running.
   - Take a new terminal and run

     ``` bash
     cd backend
     npm run populate-data
     ```
   - `populate-data` npm script is configured to invoke `src/populate-data/populateFromScript.ts` file where a method is written to read variable `populateProducts` and iterate over it and use `/api/createProduct` endpoint to add product one by one. You will also see progress and summary in terminal.
    

## Usage

The application allows users to:

1. Add new products via the backend API.
2. Search for products using fuzzy search from the frontend search bar.
3. Pagination to navigate through multiple pages.
4. Limit (or) number of records dropdown to control how many records you want to view in one page.
3. View product details by selecting a product from the search results and a link to go back to search results list.

## API Endpoints

1. The available API routes:
   - `GET /api/products` for retrieving all products paginated.
   - `POST /api/products` for adding new products.
   - `GET /api/products/:id` for retrieving specific product details.
   - `GET /api/search` for searching products by name using fuzzy search and return paginated results.

## OpenAPI Specification

You will find `openapi.yml` file inside `backend` folder, which can be used to preview swagger and test the api. 