const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");
// const authMiddleware = require("../middlewares/authMiddleware");

// // router.use(authMiddleware);

router.post("/add-address", addressController.createAddress);
router.get("/", addressController.getMyAddresses);
router.get("/:id", addressController.getAddressById);
router.put("/:id", addressController.updateAddress);
router.delete("/:id", addressController.deleteAddress);

module.exports = router;
