# **Enpal Assessment- Appointment System**

This project is a backend service built with **Node.js**, **Express.js**, and **Prisma** for managing appointment slots. It includes **APIs**, **middleware validation**, **database integration**, and **unit tests with Jest**.

---

## **Features**
Fetch available appointment slots based on date, products, language, and rating.  
Middleware validation to ensure valid request data.  
Prisma ORM for database management.  
Structured error handling with response codes.  
Unit tests using Jest for controllers and services.  
Dockerized PostgreSQL database setup.

---

## **Project Structure**
```
enapl
│── prisma/                # Prisma ORM schema
│   ├── schema.prisma      # Database schema
│
│── src/
│   ├── config/            # Environment configurations
│   │   ├── env.js
│   │   ├── index.js
│   │
│   ├── constants/         # Response codes and constants
│   │   ├── responseCodes.js
│   │
│   ├── controllers/       # API Controllers
│   │   ├── appointments.js
│   │   ├── appointments.test.js  # Unit tests
│   │   ├── error.js
│   │   ├── index.js
│   │
│   ├── database/          # Database connection & Prisma client
│   │   ├── index.js
│   │   ├── prisma.js
│   │
│   ├── middlewares/       # Request validation and authentication
│   │   ├── validate.js
│   │
│   ├── routes/            # API Routes
│   │   ├── appointment.js
│   │   ├── error.js
│   │   ├── health.js
│   │   ├── index.js
│   │
│   ├── services/          # Business logic
│   │   ├── appointment.js
│   │   ├── index.js
│   │
│   ├── utils/             # Utility functions
│   │   ├── index.js
│   │   ├── response.js
│   │
│   ├── validations/       # Request validation schemas
│   │   ├── appointment.js
│   │   ├── index.js
│
│── .env                   # Environment variables
│── .gitignore              # Ignore node_modules, env files, etc.
│── jest.config.js          # Jest test configuration
│── nodemon.json            # Nodemon config for development
│── package.json            # Project metadata & dependencies
│── README.md               # Project documentation
```

---

## **Setup & Installation**

### **Clone the Repository**
```sh
git clone git@github.com:msherazy/enpal-coding-challenge.git
cd enpal-coding-challenge
```

### ** Install Dependencies**
```sh
yarn install
```

---

## Docker Setup
This project uses **Docker** for running PostgreSQL locally.

### Build the Docker Image
```sh
docker build -t enpal-coding-challenge-db .
docker run —name enpal-coding-challenge-db -p 5432:5432 -d enpal-coding-challenge
```

### Check Running Containers
```sh
docker ps
```
---

## **Database Setup**
This project uses **Prisma ORM** with PostgreSQL.

### **Generate Prisma Client**
```sh
yarn prisma generate
```

## Running the Application
### **Start the Development Server**
```sh
yarn dev
```
---

## **Running Tests**
This project includes **unit test** for controller using Jest.

### **Run All Tests**
```sh
yarn test
```
---

## API Endpoints
### **Fetch Available Appointment Slots**
**`POST /calendar/query`**
#### **Request Parameters**
| Parameter | Type   | Description  |
|-----------|--------|--------------|
| `date`    | String | Date in YYYY-MM-DD format |
| `products`| String | Comma-separated product list |
| `language`| String | Preferred language |
| `rating`  | String | Desired rating (Gold, Silver, etc.) |

#### **Response (Success - 200)**
```json
[
	{
		"start_date": "2024-05-03T10:30:00.000Z",
		"available_count": 1
	},
	{
		"start_date": "2024-05-03T11:00:00.000Z",
		"available_count": 1
	},
	{
		"start_date": "2024-05-03T11:30:00.000Z",
		"available_count": 1
	}
]

```

### **Check System Health**
**`GET /health`**
#### **Response (Success - 200)**
```json
{
	"success": true,
	"path": "/health",
	"message": "Health check successful",
	"statusCode": 200,
	"data": {
		"status": "ok",
		"uptime": "0d 0h 0m 4s"
	},
	"timestamp": "Tue, 18 Feb 2025 11:10:53 GMT"
}
```

---

Tech Stack
- **Node.js** - Backend framework
- **Express.js** - API handling
- **Prisma ORM** - Database abstraction
- **Jest** - Unit testing framework
- **PostgreSQL** - Database
- **Docker** - Containerized database setup
- **Yarn** - Package manager
