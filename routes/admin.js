const express = require("express");
const adminRouter = express.Router();
const updatedUser = require("../controllers/adminCintroller.js");
const auth = require("../middleware/auth.js");
const asyncHandler = require("../middleware/errorMiddleware.js");
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin role management API
 */

/**
 * @swagger
 * /api/admin/{id}:
 *   put:
 *     summary: Set a user role to admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []    # Authorization header
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to update
 *         schema:
 *           type: string
 *           example: 67123abc1234567890def111
 *
 *     responses:
 *       200:
 *         description: User updated to admin successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: User role is set to admin
 *
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: User not found
 *
 *       500:
 *         description: Internal server error
 */
adminRouter.put("/:id", auth, asyncHandler(updatedUser));

module.exports = adminRouter;
