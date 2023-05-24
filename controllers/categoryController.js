const category = require("../models/category");

const createCategory = async (req, res) => {
  const formData = req.body;
  if (!formData.name) {
    return res.status(400).json({
      message: "Tên danh mục không được để trống!",
    });
  }
  try {
    const data = await category.findOne({ name: formData.name });
    if (data) {
      return res.status(400).json({
        success: false,
        message: "Danh mục đã tồn tại!",
      });
    }
    const newCategory = await category.create(formData);
    return res.status(200).json({
      success: true,
      message: "Tạo mới danh mục thành công!",
      data: newCategory,
    });
  } catch (error) {
    res.json(`Error: ${error}`);
  }
};

module.exports = { createCategory };
