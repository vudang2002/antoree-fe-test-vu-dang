export default function Contact() {
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Liên hệ với chúng tôi</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Thông tin liên hệ</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Địa chỉ:</h3>
              <p className="text-gray-600">123 Đường ABC, Quận 1, TP.HCM</p>
            </div>

            <div>
              <h3 className="font-semibold">Email:</h3>
              <p className="text-gray-600">contact@antoree.com</p>
            </div>

            <div>
              <h3 className="font-semibold">Điện thoại:</h3>
              <p className="text-gray-600">+84 123 456 789</p>
            </div>

            <div>
              <h3 className="font-semibold">Giờ làm việc:</h3>
              <p className="text-gray-600">
                Thứ 2 - Thứ 6: 8:00 - 17:00
                <br />
                Thứ 7: 8:00 - 12:00
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Gửi tin nhắn</h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Họ tên</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập họ tên của bạn"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập email của bạn"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tin nhắn</label>
              <textarea
                rows="4"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập nội dung tin nhắn"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
            >
              Gửi tin nhắn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
