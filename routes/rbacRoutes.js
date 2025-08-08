const express = require("express");
const router = express.Router();
const rbacController = require("../controllers/rbacController");
const authMiddleware = require("../middlewares/authMiddleware");
const { rbacMiddleware } = require("../middlewares/rbacMiddleware");

router.use(authMiddleware);

// Only SuperAdmin can manage roles
router.post("/", rbacMiddleware("SuperAdmin"), rbacController.createRole);
router.get("/", rbacMiddleware("SuperAdmin"), rbacController.getAllRoles);
router.get("/:id", rbacMiddleware("SuperAdmin"), rbacController.getRoleById);
router.put("/:id", rbacMiddleware("SuperAdmin"), rbacController.updateRole);
router.delete("/:id", rbacMiddleware("SuperAdmin"), rbacController.deleteRole);

module.exports = router;
