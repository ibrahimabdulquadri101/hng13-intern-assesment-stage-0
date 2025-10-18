# **Project Overview: Dynamic Profile Service (HNG Stage 0\)**

This document provides a comprehensive overview of the **Dynamic Profile Service**, a back-end microservice built on **Node.js** and **Express**. The primary function of this service is to expose a single, secure profile endpoint (/me) that delivers static user data alongside a dynamically fetched piece of information—a random cat fact—retrieved from an external API. The project architecture is designed for **modularity, stability, and clean error handling**, separating concerns into distinct controller, service, and routing layers.

## **Architecture and Design Principles**

The service adheres to the principle of **Separation of Concerns**, resulting in a highly maintainable and testable codebase:

1. **Service Layer (catApi.js):** This file is solely responsible for all external interactions. It encapsulates the logic for connecting to the https://catfact.ninja/fact API, including configuration details like the **60-second request timeout**. Crucially, it manages its own failure state by **throwing an explicit error** if the external service is unavailable, timed out, or returns a bad response. This prevents the controller from dealing with low-level API connection issues.
2. **Controller Layer (profile.controller.js):** The Profile function acts as the request handler. Its job is to orchestrate the response. It retrieves the static USER_DATA, calls the connectToCatApi service to get the dynamic content, assembles the final JSON object, and sends the response. Its integrated try...catch block ensures **graceful degradation**: if the external service fails, the controller immediately sends a **503 Service Unavailable** response to the client, providing clear feedback to the consumer.
3. **Routing Layer (Profile.router.js):** This layer simply maps the HTTP method and path (GET /me) to the appropriate controller function (Profile), keeping the primary app.js file clean.
4. **Entry Point (app.js):** The application's core file handles server setup, global middleware (like express.json()), route mounting (app.use("/", profileRouter)), and server initialization. A notable feature is the initial call to connectToCatApi() upon startup, which serves as a basic **health check** to immediately verify connectivity to the critical external dependency.

## **Key Features**

- **Dynamic Content Integration:** The /me endpoint delivers a unique, random cat fact on every successful request, sourced from the Cat Fact API.
- **Request Timeout Implementation:** All external API calls include a **60,000ms (60-second) timeout** to prevent resource exhaustion and hanging processes, ensuring service stability under external load.
- **Robust Error Handling:** The service differentiates between client-side errors and external dependency failures. A successful request returns **HTTP 200**, while a failure to connect to the Cat API correctly returns a **HTTP 503 Service Unavailable** with a clear message.
- **Clean Startup Health Check:** The server performs an initial test connection to the Cat Fact API upon boot-up, providing immediate console feedback on external dependency status.

## **Getting Started**

### **Prerequisites**

- Node.js (LTS recommended)
- npm or yarn

### **Installation**

1. Clone the repository:  
   git clone \<repository-url\>  
   cd \<project-directory\>

2. Install dependencies (requires the axios library):  
   npm install axios express

3. Ensure you have an environment file (env.js as referenced in app.js) that exports the PORT constant.

### **Running the Server**

Start the application using Node.js:

node app.js  
\# Console output should show: "App running on localhost 3000" and the result of the initial cat fact check.

## **API Endpoint Reference**

The service exposes one primary endpoint:

### **GET /me**

| Parameter | Type | Description                                    |
| :-------- | :--- | :--------------------------------------------- |
| **None**  |      | Retrieve profile details and a fresh cat fact. |

#### **Success Response (HTTP 200 OK)**

{  
 "status": "success",  
 "user": {  
 "email": "ibrahimabdulquadri446@gmail.com",  
 "name": "Ibrahim Abdulquadri Abiodun",  
 "stack": "Node.js/Express"  
 },  
 "timestamp": "YYYY-MM-DDTHH:MM:SS.000Z",  
 "fact": "A cat fact."  
}

#### **Failure Response (HTTP 503 Service Unavailable)**

This occurs if the external Cat Fact API fails to respond within the 60-second timeout.

{  
 "status": "failed",  
 "message": "Cannot connect to Cat API service."  
}
