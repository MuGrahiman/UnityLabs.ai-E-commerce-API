import Order from "../Models/Order-Model.js";
import User from "../Models/User-Model.js";
import Catalog from "../Models/Catelog-Model.js"
import Product from "../Models/Product-Model.js";

export const createOrder = async (req, res) => {
  const buyerId = req.userId;
  const sellerId = req.params.sellerId;
  const { items } = req.body;

  try {
    const buyer = await User.findById(buyerId);
    const seller = await User.findById(sellerId);

    if (
      !buyer ||
      !seller ||
      buyer.type !== "buyer" ||
      seller.type !== "seller"
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const catalog = await Catalog.findOne({ seller: sellerId }).populate(
      "products"
    );

    if (!catalog) {
      return res
        .status(404)
        .json({ message: "Catalog not found for the seller" });
    }

    let totalPrice = 0;
    const orderItems = items.map((item) => {
      const product = catalog.products.find(
        (p) => p._id.toString() === item.productId
      );
      if (product) {
        totalPrice += product.price * item.quantity;
        return {
          name: product.name,
          quantity: item.quantity,
        };
      }
      return null;
    });

    if (orderItems.includes(null)) {
      return res.status(400).json({ message: "Invalid items in the order" });
    }

    const newOrder = new Order({
      buyer: buyerId,
      seller: sellerId,
      items: orderItems,
      totalPrice,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server issue" });
  }
};

export const getSellerOrders = async (req, res) => {
  const sellerId = req.userId;
  try {
    const seller = await User.findById(sellerId);
    if (!seller || seller.type !== "seller") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const orders = await Order.find({ seller: sellerId })
      .populate("buyer")
      .populate({
        path: "items",
        model: "Product",
      });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server issue" });
  }
};
