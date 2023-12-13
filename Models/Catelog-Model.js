import mongoose from "mongoose";

const CatalogSchema = mongoose.Schema({
  seller: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
});


const Catalog = mongoose.model("Catalog", CatalogSchema);
export default Catalog;
