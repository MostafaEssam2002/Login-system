// const express = require("express");
// const errorMiddleware = require("./middleware/errorMiddleware.js");
// const app = express();
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Content-Type, X-auth-token"
//     );
//     res.header(
//         "Access-Control-Expose-Headers",
//         "X-auth-token"
//     );

//     if (req.method === "OPTIONS") {
//         return res.sendStatus(200);
//     }
//     next();
// });

// const studentRouter = require("./routes/students.js");
// const userRouter = require("./routes/user.js");
// const adminRouter = require("./routes/admin.js");
// const methodOverride = require("method-override");
// const helmet = require("helmet");
// const cookieParser = require("cookie-parser");
// const swaggerUi = require("swagger-ui-express");
// const swaggerJsdoc = require("swagger-jsdoc");
// const config = require("config");
// process.on("uncaughtException",(exception)=>{
//     console.log("Uncaught Exception Error...")
//     process.exit(0)
// })
// process.on("unhandledRejection",(exception)=>{
//     console.log("Process Rejected");
//     process.exit(0)
// })

// // 🧠 Middlewares
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-auth-token, Content-Type");
//     res.header("Access-Control-Expose-Headers", "X-auth-token");  // ← أهم سطر
//     next();
// });

// app.use(helmet());
// app.use(methodOverride("_method"));
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static('.'));

// // 🌍 Enable CORS
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type");
//     next();
// });

// // 🧩 Swagger Configuration
// const swaggerOptions = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "Student API",
//             version: "1.0.0",
//             description: "API Documentation for Student Management System",
//         },
//         servers: [
//             { url: "http://localhost:3000" },
//         ],
//     },
//     apis: ["./routes/*.js"], // تأكد إن المسار ده صحيح
// };

// const swaggerSpec = swaggerJsdoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // 📚 Routes
// app.use("/api/students", studentRouter);
// app.use("/api/users", userRouter);
// app.use("/api/admin", adminRouter);

// // 🏠 View Routes
// app.get("/", (req, res) => {
//     res.sendFile(`${__dirname}/views/login.html`);
// });

// app.get("/login", (req, res) => {
//     res.sendFile(`${__dirname}/views/login.html`);
// });

// app.get("/register", (req, res) => {
//     res.sendFile(`${__dirname}/views/register.html`);
// });

// app.get("/students", (req, res) => {
//     res.sendFile(`${__dirname}/views/students.html`);
// });

// app.get("/add-student", (req, res) => {
//     res.sendFile(`${__dirname}/views/add-student.html`);
// });

// app.get("/edit-student", (req, res) => {
//     res.sendFile(`${__dirname}/views/edit-student.html`);
// });
// app.use(errorMiddleware)
// // 🚀 Start server
// app.listen(3000, () => {
//     console.log("✅ Server running on http://localhost:3000");
//     console.log("📘 Swagger Docs available at http://localhost:3000/api-docs");
// });
// throw Error("mostafa esam errors")
const express = require("express");
const methodOverride = require("method-override");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const errorMiddleware = require("./middleware/errorMiddleware.js");

// Routers
const studentRouter = require("./routes/students.js");
const userRouter = require("./routes/user.js");
const adminRouter = require("./routes/admin.js");

const app = express();

/* ----------------------------------
   GLOBAL CORS (Only one middleware)
---------------------------------- */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, X-auth-token");
    res.header("Access-Control-Expose-Headers", "X-auth-token");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

/* ----------------------------------
   Global Middlewares
---------------------------------- */
app.use(helmet());
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('.'));

/* ----------------------------------
   Swagger Config
---------------------------------- */
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Student API",
            version: "1.0.0",
            description: "API Documentation for Student Management System",
        },
        servers: [{ url: "http://localhost:3000" }],
    },
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* ----------------------------------
   API Routes
---------------------------------- */
app.use("/api/students", studentRouter);
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);

/* ----------------------------------
   View Routes
---------------------------------- */
app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/views/login.html`);
});
app.get("/login", (req, res) => {
    res.sendFile(`${__dirname}/views/login.html`);
});
app.get("/register", (req, res) => {
    res.sendFile(`${__dirname}/views/register.html`);
});
app.get("/students", (req, res) => {
    res.sendFile(`${__dirname}/views/students.html`);
});
app.get("/add-student", (req, res) => {
    res.sendFile(`${__dirname}/views/add-student.html`);
});
app.get("/edit-student", (req, res) => {
    res.sendFile(`${__dirname}/views/edit-student.html`);
});

/* ----------------------------------
   Global Error Handler
---------------------------------- */
app.use(errorMiddleware);

/* ----------------------------------
   Server
---------------------------------- */
app.listen(3000, () => {
    console.log("✅ Server running on http://localhost:3000");
    console.log("📘 Swagger Docs available at http://localhost:3000/api-docs");
});
