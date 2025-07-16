export default function About() {
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Giới thiệu về Antoree</h1>

      <div className="prose max-w-none">
        <p className="text-lg mb-4">
          Antoree là nền tảng học trực tuyến hàng đầu, cung cấp các khóa học
          chất lượng cao từ những chuyên gia hàng đầu trong ngành.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Tầm nhìn</h2>
        <p className="mb-4">
          Trở thành nền tảng giáo dục trực tuyến số 1 Việt Nam, giúp mọi người
          có thể tiếp cận với kiến thức chất lượng một cách dễ dàng và hiệu quả.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Sứ mệnh</h2>
        <p className="mb-4">
          Democratize education - Dân chủ hóa giáo dục. Chúng tôi tin rằng mọi
          người đều có quyền được tiếp cận với những kiến thức tốt nhất.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Giá trị cốt lõi</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Chất lượng là ưu tiên hàng đầu</li>
          <li>Đổi mới sáng tạo trong phương pháp giảng dạy</li>
          <li>Hỗ trợ học viên tận tình</li>
          <li>Cộng đồng học tập tích cực</li>
        </ul>
      </div>
    </div>
  );
}
