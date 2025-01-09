# IceCream API 🍦

The **IceCream API** is a simple Node.js application that provides an API to manage ice cream data. This project is containerized with Docker, making it easy to deploy and run locally or in production.

---

## Features
- Add, retrieve, update, and delete ice cream flavors.
- Lightweight and fast using Node.js.
- Easily deployable with Docker.

---

## Prerequisites

To run this application, you need the following installed on your system:
- [Node.js](https://nodejs.org) (if running without Docker)
- [Docker](https://www.docker.com/get-started) (for containerized deployment)
- [Git](https://git-scm.com/) (for cloning the repository)

---

## Installation

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/icecream-api.git
cd icecream-api
```
### **2. Install Dependencies**

If you’re running the application locally without Docker, install the dependencies:

```bash
npm install
```

## **Running the application**

### **1. Run Locally with Node.js**

```bash
node service.js
```

The server will start on http://localhost:3000

### **2. Run with Docker**
**a. Build the docker image**
```bash
docker build -t icecream-api .
```
The API will be available at http://localhost:3000

### **3. Run with Docker Compose**
If you have Docker Compose installed, you can use the provided docker-compose.yml file to deploy multiple instances.
```bash
docker-compose up --scale app=3
```
This will run 3 instances of the API, accessible at ports 3000, 3001, and 3002.

#

## API Endpoints

**Base URL**
```
http://localhost:3000
```
**Endpoints**

| Method | Endpoint          | Description               |
|--------|--------------------|---------------------------|
| GET    | `/icecreams`       | List all ice cream flavors |
| POST   | `/icecreams`       | Add a new flavor          |
| GET    | `/icecreams/:id`   | Get details of a flavor   |
| PUT    | `/icecreams/:id`   | Update a flavor           |
| DELETE | `/icecreams/:id`   | Delete a flavor           |

#


## Environment Variables

| Variable       | Default       | Description                          |
|----------------|---------------|--------------------------------------|
| `PORT`         | `3000`        | Port for the API to listen on        |
| `NODE_ENV`     | `development` | Environment mode (`development`, `production`) |

#

## **Contributing**
Contributions are welcome! Feel free to open an issue or submit a pull request.

