import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
  buyer: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  seller: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  items: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
},{ timestamps: true });

const Order = mongoose.model("Order", OrderSchema);
export default Order;
