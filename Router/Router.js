import express from "express";
import {
  getListOfSellers,
  login,
  register,
} from "../Controller/AuthController.js";
import {
  createCatalog,
  getSellerCatalog,
} from "../Controller/CatelogController.js";
import { createOrder, getSellerOrders } from "../Controller/OrderController.js";
import auth from "../Middleware/Auth.js";
const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);

router.get("/buyer/list-of-sellers", getListOfSellers);
router.get("/buyer/seller-catalog/:seller_id", getSellerCatalog);
router.post("/buyer/create-order/:seller_id", auth, createOrder);

router.post("/seller/create-catalog", auth, createCatalog);
router.get("/seller/orders",auth, getSellerOrders);

export default router;
