# Todofy

Todofy is a single-page web application designed to manage and track your to-do tasks efficiently. This application provides users with a seamless experience to view, add, edit, and organize tasks using an intuitive and user-friendly interface.

## Table of Contents

1. [Features](#features)
2. [Screenshot](#screenshot)
3. [Technologies Used](#technologies-used)
4. [Architecture](#architecture)
5. [Setup and Installation](#setup-and-installation)
6. [Running the Application](#running-the-application)
7. [Project Structure](#project-structure)
8. [Security](#security)

## Features

- **User Authentication**: Secure sign-up and sign-in functionalities.
- **Task Management**: Add, view, edit, and archive tasks.
- **Task Categorization**: Organize tasks by categories.
- **Dashboard**: Overview of all tasks and their statuses.
- **Profile Settings**: Manage user profile and settings.

## Screenshot

![Todofy Screenshot](https://raw.githubusercontent.com/rayn000/todofy-app/main/todofy-frontend/src/assets/images/app-screenshot.png)

## Technologies Used

### Backend

- **Java 17**
- **Spring Boot 3.2.7**
- **MySQL**: Used for storing user authentication details (user ID and password).
- **MongoDB**: Used for storing user-specific information and their tasks.
- **JWT (JSON Web Token)**: For secure authentication.
- **Spring Cloud Gateway**: API Gateway to handle requests across services.
- **Eureka**: Service discovery.
- **Feign Client**: Simplified HTTP client for microservices communication.

### Frontend

- **Angular 17**
- **CSS**
- **Angular Material**

## Architecture

Todofy uses a microservices architecture with two main services:

1. **UserAuthenticationService**:
   - Handles user registration and authentication.
   - Uses MySQL for storing user credentials.
   - Provides JWT tokens for session management.

2. **TodoService**:
   - Manages user information and their tasks.
   - Uses MongoDB for storing tasks data.

A single port is used for all backend services via Spring Cloud Gateway, facilitating smooth interaction between frontend and backend services.

## Setup and Installation

### Prerequisites

- **Java Development Kit (JDK) 17**
- **Node.js and npm** (for Angular)
- **MySQL** and **MongoDB** (Databases)
- **IDE**: IntelliJ for backend, VSCode for frontend.

### Backend

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Todofy
   ```

2. Set up MySQL database:
   - Create a database named `todofy_auth`.
   - Configure your MySQL user and password in the `application.properties` file of the UserAuthenticationService.

3. Set up MongoDB:
   - Ensure MongoDB is running and accessible.

4. Run each service:
   - Open the project in IntelliJ.
   - Navigate to the `UserAuthenticationService` and `TodoService` directories and run each application.
   - Ensure Spring Cloud Gateway, Eureka, and Feign Client are properly configured and running.

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd Todofy/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   ng serve
   ```

   The application will run on `http://localhost:4200`.

## Running the Application

1. Ensure all backend services are running:
   - UserAuthenticationService
   - TodoService
   - Spring Cloud Gateway

2. Start the frontend application using:
   ```bash
   ng serve
   ```

3. Open your web browser and navigate to `http://localhost:4200`.

4. Use the application to sign up or sign in and manage your tasks.

## Project Structure

- **backend**: Contains the backend services.
  - `UserAuthenticationService`: Handles user authentication.
  - `TodoService`: Manages tasks and user information.
- **frontend**: Contains the Angular application for the frontend.
  - `src`: Source code for the Angular app.
    - `app`: Angular components and services.
    - `assets`: Static assets.
    - `environments`: Environment configurations.

## Security

Todofy uses JWT (JSON Web Token) to provide secure authentication and authorization mechanisms, ensuring that user data is protected and accessible only to authenticated users.
