import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-4 max-w-6xl mx-auto text-center">
      <div className="py-16">
        <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Trang không tìm thấy</h2>
        <p className="text-gray-600 mb-8">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition-colors inline-block"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
