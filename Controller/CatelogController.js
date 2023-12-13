import Catalog from '../Models/Catelog-Model.js';
import Product from '../Models/Product-Model.js';
import User from '../Models/User-Model.js';

export const createCatalog = async (req, res) => {
  const sellerId = req.userId; 
  const { items } = req.body;
  console.log(req.body);

  try {
    const seller = await User.findById(sellerId);
    console.log(seller);
    if (!seller || seller.type !== 'seller') return res.status(401).json({ message: 'Unauthorized' });
    

    const productIds = [];

    for (const item of items) {
      const { name, price } = item;

      const newProduct = new Product({ name, price });
      const savedProduct = await newProduct.save();

      productIds.push(savedProduct._id);
    }

    const newCatalog = new Catalog({
      seller: sellerId,
      products: productIds,
    });

    const savedCatalog = await newCatalog.save();

    res.status(201).json(savedCatalog);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server issue' });
  }
};

export const getSellerCatalog = async (req, res) => {
  const buyerId = req.userId; 
  const sellerId = req.params.sellerId; 

  try {
    const seller = await User.findById(sellerId);
    if (!seller || seller.type !== 'seller') {
      return res.status(404).json({ message: 'Seller not found' });
    }

    const catalog = await Catalog.findOne({ seller: sellerId }).populate('products');

    if (!catalog) {
      return res.status(404).json({ message: 'Catalog not found for the seller' });
    }

    const catalogInfo = {
      seller: {
        username: seller.username,
        userId: seller._id,
      },
      products: catalog.products.map((product) => ({
        name: product.name,
        price: product.price,
        productId: product._id,
      })),
    };

    res.status(200).json(catalogInfo);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server issue' });
  }
};
