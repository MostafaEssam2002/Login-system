const express = require("express");
const router = express.Router();
const student = require("../controllers/studentController");
const studentValidator = require("../middleware/studentMiddleware.js");
const auth = require("../middleware/auth.js")
const asyncHandler = require("../middleware/errorMiddleware.js");
/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management API
 */

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of students
 */
router.get("/",auth,student.getAllStudents);

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Add a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fn
 *               - ln
 *               - dept
 *               - age
 *             properties:
 *               fn:
 *                 type: string
 *                 example: John
 *               ln:
 *                 type: string
 *                 example: Doe
 *               dept:
 *                 type: string
 *                 example: CS
 *               age:
 *                 type: number
 *                 example: 21
 *     responses:
 *       200:
 *         description: Student added successfully
 *       403:
 *         description: Validation failed (Forbidden)
 */
router.post("/", auth,studentValidator, asyncHandler(student.addStudent));

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Students]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student data
 *       404:
 *         description: Student not found
 */
router.get("/:id", auth,asyncHandler(student.getStudentById));

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Update student by ID
 *     tags: [Students]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fn:
 *                 type: string
 *                 example: UpdatedName
 *               ln:
 *                 type: string
 *                 example: UpdatedLast
 *               dept:
 *                 type: string
 *                 example: DS
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       404:
 *         description: Student not found
 */
router.put("/:id",auth,asyncHandler(student.updateStudent));

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Delete student by ID
 *     tags: [Students]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 */
router.delete("/:id",auth,asyncHandler(student.deleteStudent));
module.exports = router;