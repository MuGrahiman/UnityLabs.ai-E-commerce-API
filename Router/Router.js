import express from "express";
import {
  getListOfSellers,
  login,
  register,
} from "../Controller/AuthController";
import {
  createCatalog,
  getSellerCatalog,
} from "../Controller/CatelogController";
import { createOrder, getSellerOrders } from "../Controller/OrderController";
const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);

router.get("/buyer/list-of-sellers", getListOfSellers);
router.get("/buyer/seller-catalog/:seller_id", getSellerCatalog);
router.post("/buyer/create-order/:seller_id", createOrder);

router.post("/seller/create-catalog", createCatalog);
router.get("/seller/orders", getSellerOrders);

export default router;
