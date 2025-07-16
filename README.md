# Antoree Frontend Test - E-Learning Platform

Một nền tảng học tập trực tuyến hiện đại được xây dựng với React + Vite, cung cấp các khóa học lập trình và công nghệ.

## 🌟 Tính năng chính

- **Danh sách khóa học**: Hiển thị các khóa học với thông tin chi tiết
- **Tìm kiếm và lọc**: Tìm kiếm khóa học theo tên, danh mục, trình độ
- **Danh sách yêu thích**: Lưu và quản lý các khóa học yêu thích
- **AI Insights**: Phân tích hành vi học tập của người dùng
- **Responsive Design**: Tối ưu cho mọi thiết bị

## 🏗️ Cấu trúc dự án

```
antoree-fe-test-vu-dang/
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # Services và utilities
│   │   ├── data/          # Mock data
│   │   └── constants/     # Constants
│   ├── public/            # Static assets
│   └── package.json
└── README.md
```

## 🚀 Yêu cầu hệ thống

- Node.js >= 16.0.0
- npm >= 7.0.0
- Git

## 📦 Cài đặt và chạy dự án

### 1. Clone repository

```bash
git clone https://github.com/your-username/antoree-fe-test-vu-dang.git
cd antoree-fe-test-vu-dang
```

### 2. Cài đặt dependencies

```bash
cd frontend
npm install
```

### 3. Chạy development server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: [http://localhost:5173](http://localhost:5173)

### 4. Build production

```bash
npm run build
```

### 5. Preview production build

```bash
npm run preview
```

## 📋 Scripts có sẵn

```bash
npm run dev         # Chạy development server
npm run build       # Build production
npm run preview     # Preview production build
npm run lint        # Chạy ESLint
```

## 🔧 Công nghệ sử dụng

### Frontend Framework

- **React 18**: Library UI chính
- **Vite**: Build tool và dev server nhanh
- **React Router**: Client-side routing

### Styling

- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing

### State Management

- **React Hooks**: State management với useState, useEffect
- **Custom Hooks**: [`useWishlist`](frontend/src/hooks/useWishlist.js) cho quản lý danh sách yêu thích

### Data & Services

- **Mock Data**: Dữ liệu mẫu trong [`product.js`](frontend/src/data/product.js)
- **localStorage**: Lưu trữ dữ liệu người dùng local
- **Wishlist Service**: [`wishlistService.js`](frontend/src/services/wishlistService.js) quản lý danh sách yêu thích

## 🎯 Tính năng nổi bật

### 1. Danh sách yêu thích (Wishlist)

- Thêm/xóa khóa học yêu thích
- Lưu trữ persistent với localStorage
- Thống kê và phân loại theo danh mục
- Xem lịch sử thêm gần đây

### 2. AI Insights

- Phân tích hành vi học tập
- Thống kê tương tác người dùng
- Lịch sử tìm kiếm
- Gợi ý cá nhân hóa

### 3. Tìm kiếm thông minh

- Tìm kiếm theo tên khóa học
- Lọc theo danh mục và trình độ
- Gợi ý tự động
- Breadcrumb navigation

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layout
- Touch-friendly interface
- Optimized cho mọi kích thước màn hình

## 🗂️ Cấu trúc Components

### Pages

- [`Home`](frontend/src/pages/Home.jsx) - Trang chủ
- [`ProductDetail`](frontend/src/pages/ProductDetail.jsx) - Chi tiết khóa học
- [`Wishlist`](frontend/src/pages/Wishlist.jsx) - Danh sách yêu thích
- [`AIInsights`](frontend/src/pages/AIInsights.jsx) - Phân tích AI
- [`About`](frontend/src/pages/About.jsx) - Về chúng tôi

### Components

- [`Header`](frontend/src/components/Header.jsx) - Header navigation
- [`Footer`](frontend/src/components/Footer.jsx) - Footer
- [`ProductCard`](frontend/src/components/ProductCard.jsx) - Card hiển thị khóa học
- [`Navigation`](frontend/src/components/Navigation.jsx) - Navigation menu

## 🔍 Cách sử dụng

1. **Trang chủ**: Xem danh sách khóa học, tìm kiếm và lọc
2. **Chi tiết khóa học**: Click vào khóa học để xem thông tin chi tiết
3. **Thêm yêu thích**: Click icon trái tim để thêm vào danh sách yêu thích
4. **Quản lý yêu thích**: Truy cập `/wishlist` để quản lý danh sách
5. **AI Insights**: Xem phân tích tại `/ai-insights`

## 🛠️ Development

### Thêm khóa học mới

Chỉnh sửa file [`product.js`](frontend/src/data/product.js):

```javascript
{
  id: 99,
  name: "Tên khóa học",
  price: 1000000,
  image: "https://example.com/image.jpg",
  shortDescription: "Mô tả ngắn",
  longDescription: "Mô tả chi tiết",
  rating: 4.5,
  author: "Tên tác giả",
  time: "3 tháng",
  level: "Trung cấp",
  category: "frontend"
}
```

### Thêm component mới

1. Tạo file component trong thư mục `src/components/`
2. Import và sử dụng trong pages
3. Thêm styling với Tailwind CSS

## 📄 License

This project is licensed under the MIT License.

## 👥 Tác giả

- **Vũ Đăng** - Frontend Developer

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Tạo Pull Request

---

📧 **Contact**: vudang2002@gmail.com  
🌐 **Demo**: [Live Demo](https://antoree-fe-test-vu-dang-3mqa.vercel.app/)
