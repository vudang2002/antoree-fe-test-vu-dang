import { useParams, Link } from "react-router-dom";
import { products } from "../data/product";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="p-4 max-w-6xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Không tìm thấy khóa học</h1>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
        >
          Về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <nav className="mb-6">
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-600 transition-colors"
        >
          ← Về trang chủ
        </Link>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <p className="text-gray-600 mb-4">{product.shortDescription}</p>

          <div className="mb-6">
            <span className="text-3xl font-bold text-blue-600">
              {product.price.toLocaleString()}đ
            </span>
          </div>

          {product.rating && (
            <div className="mb-6">
              <span className="text-yellow-500">★</span>
              <span className="ml-1 font-semibold">{product.rating}</span>
              <span className="text-gray-500 ml-1">/5</span>
            </div>
          )}

          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors w-full md:w-auto">
            Đăng ký học ngay
          </button>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Mô tả chi tiết</h2>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {product.longDescription}
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Nội dung khóa học</h2>
        <div className="bg-white rounded-lg p-6 shadow">
          <ul className="space-y-3">
            <li className="flex items-center">
              <span className="text-green-500 mr-3">✓</span>
              <span>Kiến thức từ cơ bản đến nâng cao</span>
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-3">✓</span>
              <span>Thực hành với dự án thực tế</span>
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-3">✓</span>
              <span>Hỗ trợ từ giảng viên</span>
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-3">✓</span>
              <span>Cấp chứng chỉ hoàn thành</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
