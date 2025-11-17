# Student Management System API

A comprehensive RESTful API for managing student records built with Node.js, Express, MongoDB, and Mongoose.

## 📋 Features

- **Student Management**: Create, read, update, and delete student records
- **User Authentication**: JWT-based authentication and authorization
- **Admin Panel**: Administrative routes for system management
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Security**: Helmet.js for secure HTTP headers, bcrypt for password hashing
- **Validation**: Built-in data validation using validator and Mongoose schemas
- **MongoDB Integration**: Full-featured MongoDB integration with Mongoose ODM

## 🛠️ Tech Stack

- **Runtime**: Node.js 18
- **Framework**: Express.js
- **Database**: MongoDB 7.0
- **ODM**: Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcrypt, helmet
- **API Documentation**: Swagger UI Express
- **Containerization**: Docker & Docker Compose

## 📁 Project Structure

```
student-management-app/
├── app.js                  # Main application entry point
├── config/                 # Configuration files
│   ├── default.json
│   ├── development.json
│   └── production.json
├── controllers/            # Request handlers
├── middleware/             # Custom middleware
├── model/                  # Mongoose models
├── routes/                 # API routes
│   ├── admin.js
│   ├── students.js
│   └── user.js
├── util/                   # Utility functions
├── validator/              # Custom validators
├── views/                  # HTML views
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose configuration
└── package.json            # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- Docker Desktop installed on your machine
- Docker Compose (included with Docker Desktop)

### Installation & Running with Docker

1. **Clone the repository** (or navigate to the project directory)

2. **Build and start all services**:
   ```bash
   docker-compose up -d --build
   ```

   This command will:
   - Build the Node.js application container
   - Pull MongoDB 7.0 image
   - Pull Mongo Express (MongoDB GUI) image
   - Start all services in detached mode

3. **Verify containers are running**:
   ```bash
   docker-compose ps
   ```

   You should see three containers running:
   - `student-management-app` (Node.js application)
   - `mongodb` (MongoDB database)
   - `mongo-express` (MongoDB web GUI)

## 🌐 Access the Application

Once the containers are running, you can access:

| Service | URL | Credentials |
|---------|-----|-------------|
| **Application** | http://localhost:3000 | - |
| **API Documentation** | http://localhost:3000/api-docs | - |
| **Mongo Express GUI** | http://localhost:8081 | Username: `admin`<br>Password: `admin123` |
| **MongoDB** | mongodb://localhost:27017 | - |

## 📚 API Endpoints

### Students API
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Users API
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile

### Admin API
- Admin-specific routes for system management

For complete API documentation, visit http://localhost:3000/api-docs

## 🐳 Docker Commands

### Start Services
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app
docker-compose logs -f mongo
docker-compose logs -f mongo-express
```

### Rebuild Containers
```bash
docker-compose up -d --build
```

### Stop and Remove Everything (including volumes)
```bash
docker-compose down -v
```

### Access Container Shell
```bash
# Access application container
docker exec -it student-management-app sh

# Access MongoDB container
docker exec -it mongodb mongosh
```

## 🔧 Configuration

The application uses the `config` package for configuration management. Configuration files are located in the `config/` directory:

- `default.json` - Default configuration
- `development.json` - Development environment
- `production.json` - Production environment

### Environment Variables

The following environment variables can be set in `docker-compose.yml`:

- `NODE_ENV` - Application environment (development/production)
- `database__uri` - MongoDB connection string

## 💾 Data Persistence

MongoDB data is persisted using Docker volumes:
- `mongo-data` - Database files
- `mongo-config` - Configuration files

Data will persist even after stopping containers unless explicitly removed with `docker-compose down -v`.

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **HTTP Headers**: Helmet.js for secure HTTP headers
- **Input Validation**: Server-side validation for all inputs
- **CORS**: Configured Cross-Origin Resource Sharing

## 🛠️ Development

### Running Locally (without Docker)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Make sure MongoDB is running locally on port 27017

3. Start the application:
   ```bash
   npm start
   ```

   Or with auto-reload:
   ```bash
   npm run dev
   ```

## 📝 Environment Configuration

For local development, update the database URI in `config/default.json`:

```json
{
  "database": {
    "uri": "mongodb://localhost:27017/E-commerce"
  }
}
```

For Docker environment, the URI is automatically configured to use the containerized MongoDB instance.

## 🐛 Troubleshooting

### Port Already in Use
If ports 3000, 8081, or 27017 are already in use, you can modify them in `docker-compose.yml`:

```yaml
services:
  app:
    ports:
      - "3001:3000"  # Change 3001 to any available port
```

### Container Build Fails
```bash
# Clean rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Database Connection Issues
```bash
# Check if MongoDB is running
docker-compose ps

# View MongoDB logs
docker-compose logs mongo
```

## 📄 License

ISC

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please open an issue in the repository.

---

**Built with ❤️ using Node.js, Express, MongoDB, and Docker**
