const Product = require("../models/Product");
const category = require("../models/category");
const slugify = require("slugify");

const createProduct = async (req, res) => {
  const { productName, price, description, categoryId, image } = req.body;
  if (!productName || !price || !description || !categoryId || !image) {
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng điền đầy đủ thông tin!" });
  }
  try {
    const checkHasProduct = await Product.findOne({ productName });
    if (checkHasProduct) {
      return res.status(403).json({
        success: false,
        message: "Sản phẩm đã tồn tại trong giỏ hàng!",
      });
    }
    const product = await Product.create(req.body);
    await category.findOneAndUpdate(product.categoryId, {
      $addToSet: {
        products: product._id,
      },
    });
    res.status(200).json({
      success: true,
      message: "Tạo mới sản phẩm thành công !",
      data: product,
    });
  } catch (error) {
    res.status(400).json(`Lỗi: ${err}`);
  }
};

const getProducts = async (req, res) => {
  let { search, page = 1, categoryId = null } = req.query;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  try {
    if (search && search.length > 0) {
      const query = search.replace(/['"]+/g, "");
      let replace = `${query}`;
      let re = new RegExp(replace, "i");
      const data = await Product.find({ productName: re }).limit(limit);
      return res.status(200).jsonp({
        success: true,
        message: `Thành công`,
        data: data,
      });
    }
    const data = await Product.find(categoryId && { categoryId })
      .skip((+page - 1) * +limit)
      .limit(limit);
    const totalProduct = await Product.count(categoryId && { categoryId });
    const totalPage = Math.ceil(totalProduct / +limit);
    return res.status(200).jsonp({
      success: true,
      message: "Good job",
      data,
      totalPage,
    });
  } catch (err) {
    res.status(400).json(`Lỗi: ${err}`);
  }
};
const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Product.findById(id);
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.status(200).json({
      message: "Oke lâla",
      data,
    });
  } catch (err) {}
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { productName, price, description, categoryId, image } = req.body;
  if (!productName || !price || !description || !categoryId || !image) {
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng điền đầy đủ thông tin!" });
  }
  try {
    const newSlug = slugify(productName, { lower: true });
    const newProduct = {
      productName,
      price,
      description,
      categoryId,
      image,
      slug: newSlug,
    };
    const data = await Product.findByIdAndUpdate(id, newProduct);
    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "Cập nhật sản phẩm thất bại" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Cập nhật sản phẩm thành công" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

const removeProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Product.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Xoá sản phẩm thành công",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  removeProduct,
};

// const {
//   _page = 1,
//   _limit = 10,
//   _sort = "createdAt",
//   _order = "asc",
//   _expand,
// } = req.query;
// const options = {
//   page: _page,
//   limit: _limit,
//   sort: { [_sort]: _order === "desc" ? -1 : 1 },
// };
// const populateOptions = _expand
//   ? [{ path: "categoryId", select: "name" }]
//   : [];
// try {
//   const result = await Product.paginate(
//     { categoryId: null },
//     { ...options, populate: populateOptions }
//   );
//   if (result.docs.length === 0) throw new Error("No products found");
//   const response = {
//     data: result.docs,
//     pagination: {
//       currentPage: result.page,
//       totalPages: result.totalPages,
//       totalItems: result.totalDocs,
//     },
//   };
//   return res.status(200).json(response);
// } catch (error) {
//   return res.status(400).json({ message: error.message });
// }
