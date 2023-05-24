import mongoose from "mongoose";
const { Schema } = mongoose;
const categorySchema = new Schema(
  {
    name: {
      type: String,
    },
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true, versionKey: false }
);

// Trước khi xóa category, cập nhật lại category của các sản phẩm thuộc category này thành uncategory
categorySchema.pre("findOneAndDelete", async function (next) {
  try {
    // Lấy model Product từ biến đã import
    const Product = mongoose.model("Product");
    //  lấy điều kiện tìm kiếm hiện tại của câu lệnh, xác định category mà đang được xóa trong trường hợp này.
    const filter = this.getFilter();
    //kiểm tra xem câu lệnh truy vấn có chứa trường categoryId được cập nhật không, nếu có lấy giá trị của trường đó để cập nhật cho các sản phẩm có cùng categoryId.
    const categoryId = this.getQuery().$set?.categoryId;
    const update = {
      categoryId: categoryId ?? "uncategorized",
    };
    await Product.updateMany(
      { categoryId: filter._id }, // Tìm các sản phẩm cùng categoryId
      update // Cập nhật categoryId mới
    );
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("Category", categorySchema);
