/** @format */

const express = require("express");
const router = express.Router();

//controllers
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");
const {
    getOrderById,
    createOrder,
    getAllOrders,
    updateOrderStatus,
    getOrderStatus,
} = require("../controllers/order");

//param
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//create
router.post(
    "/order/create/:userId",
    isSignedIn,
    isAuthenticated,
    pushOrderInPurchaseList,
    updateStock,
    createOrder
);

//read
router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders);

// order status
router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus);
router.put(
    "/order/:orderId/status/userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateOrderStatus
);

module.exports = router;