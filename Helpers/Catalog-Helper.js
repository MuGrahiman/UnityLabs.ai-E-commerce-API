import Catelog from "../Models/Catelog-Model.js"

export const saveToCatalog = async (SellerId, Items) =>{
  try {
    const existingCatalog = await Catelog.findOne({seller: SellerId });

    if (existingCatalog) {
      existingCatalog.products.push(...Items);
      await existingCatalog.save();
      return existingCatalog;
    }

    const newCatalog = new Catelog({
      seller: SellerId,
      products: Items,
    });

    const result = await newCatalog.save();
    return result;
  } catch (error) {
    throw new Error(error.message || "Catalog creation/update failed");
  }
};
