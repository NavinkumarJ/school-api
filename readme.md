# School Management API

## Overview
The **School Management API** is a Node.js-based backend system that allows users to manage school data efficiently. It provides endpoints for adding new schools and retrieving a sorted list of schools based on their proximity to a user-specified location. This API is built using **Node.js, Express.js, and MySQL** and is deployed on **Railway**.

## Features
- **Add School API**: Enables users to add a new school to the database.
- **List Schools API**: Retrieves a list of schools sorted by proximity to the user's location.
- **MySQL Database**: Stores school information, including name, address, latitude, and longitude.
- **Hosted on Railway**: Ensures easy deployment and scalability.

## Technologies Used
- **Node.js**
- **Express.js**
- **MySQL**
- **Railway (Hosting Platform)**

## API Endpoints

### 1. Add School
- **Endpoint:** `/addSchool`
- **Method:** `POST`
- **Request Payload:**
  ```json
  {
    "name": "PSB School",
    "address": "123 Main St",
    "latitude": 12.9716,
    "longitude": 77.5946
  }
  ```
- **Functionality:**
  - Validates input data (non-empty, correct data types).
  - Inserts a new school record into the MySQL database.
- **Response Example:**
  ```json
  {
    "message": "School added successfully",
    "schoolId": 1
  }
  ```

### 2. List Schools (Sorted by Proximity)
- **Endpoint:** `/listSchools`
- **Method:** `GET`
- **Query Parameters:**
  - `latitude` (float) - User's latitude
  - `longitude` (float) - User's longitude
- **Functionality:**
  - Retrieves all schools from the database.
  - Sorts them based on geographical distance from the provided coordinates.
- **Response Example:**
  ```json
  [
    {
      "id": 1,
      "name": "PSB School",
      "address": "123 Main St",
      "latitude": 12.9716,
      "longitude": 77.5946,
      "distance": 1.2
    },
    {
      "id": 2,
      "name": "XYZ Academy",
      "address": "456 Park Ave",
      "latitude": 12.9720,
      "longitude": 77.5950,
      "distance": 2.5
    }
  ]
  ```

## Deployment
- The API is deployed on **Railway** with both **MySQL** and **Express.js** hosted.
- Environment variables are used for database connection security.

## Postman Collection
A Postman collection is available to test the APIs.
- Includes sample requests and expected responses.
- Can be shared with stakeholders for validation.

## Example Requests and Test Cases

### **1. Add School API Test Cases**
#### **✅ Valid Input (Expected to Succeed)**
- **Request:**
  ```json
  {
    "name": "SEC Public School",
    "address": "123 Main St",
    "latitude": 13.9716,
    "longitude": 77.5946
  }
  ```
- **Expected Response (201 Created)**
  ```json
  {
    "message": "School added successfully",
    "schoolId": 1
  }
  ```

#### **❌ Missing Name Field (Expected to Fail)**
- **Request:**
  ```json
  {
    "address": "123 Main St",
    "latitude": 13.9716,
    "longitude": 77.5946
  }
  ```
- **Expected Response (400 Bad Request)**
  ```json
  {
    "error": "Name is required"
  }
  ```

#### **❌ Invalid Latitude/Longitude (Expected to Fail)**
- **Request:**
  ```json
  {
    "name": "XYZ School",
    "address": "456 Park Ave",
    "latitude": "invalid_latitude",
    "longitude": 77.5946
  }
  ```
- **Expected Response (400 Bad Request)**
  ```json
  {
    "error": "Invalid latitude value"
  }
  ```

### **2. List Schools API Test Cases**
#### **✅ Valid Request (Expected to Succeed)**
- **Endpoint:**  
  ```
  GET /api/listSchools?latitude=13.9716&longitude=77.5946
  ```
- **Expected Response (200 OK)**
  ```json
  [
    {
      "id": 1,
      "name": "SEC Public School",
      "address": "123 Main St",
      "latitude": 13.9716,
      "longitude": 77.5946,
      "distance": 0.0
    },
    {
      "id": 2,
      "name": "XYZ Academy",
      "address": "456 Park Ave",
      "latitude": 13.9720,
      "longitude": 77.5950,
      "distance": 1.5
    }
  ]
  ```

#### **❌ Missing Latitude and Longitude (Expected to Fail)**
- **Endpoint:**  
  ```
  GET /api/listSchools
  ```
- **Expected Response (400 Bad Request)**
  ```json
  {
    "error": "Latitude and Longitude are required"
  }
  ```

#### **❌ Invalid Latitude Format (Expected to Fail)**
- **Endpoint:**  
  ```
  GET /api/listSchools?latitude=invalid&longitude=77.5946
  ```
- **Expected Response (400 Bad Request)**
  ```json
  {
    "error": "Invalid latitude value"
  }
  ```

## Repository
Find the complete source code here: [School API Repository](https://github.com/NavinkumarJ/school-api)

---
This API is designed to be lightweight, efficient, and scalable for school management operations. 🚀

