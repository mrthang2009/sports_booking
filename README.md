# Sports Booking Backend

## Mô tả
Backend API cho hệ thống đặt sân thể thao, tuyển người chơi, quản lý người dùng, sân, booking, v.v.

## Công nghệ
- Node.js
- Express.js
- MongoDB (Mongoose)
- Swagger UI

## Cài đặt
```bash
# Cài dependencies
npm install
# hoặc
yarn install
```

## Cấu hình môi trường
Tạo file `.env` dựa trên mẫu `.env.example`:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.ehrsxvd.mongodb.net/<dbname>
PORT=5000
```
- **MONGO_URI**: Thay `<username>`, `<password>`, `<dbname>` bằng thông tin tài khoản và tên database của bạn trên MongoDB Atlas hoặc local.
- **PORT**: Cổng server sẽ chạy (mặc định 5000).

## Seed dữ liệu mẫu
```bash
yarn node src/seed.js
# hoặc
node src/seed.js
```

## Chạy server
```bash
yarn node server.js
# hoặc
node server.js
```

### Tự động reload server khi sửa code (hot reload)
Cài đặt `nodemon` nếu chưa có:
```bash
yarn add nodemon --dev
# hoặc
npm install nodemon --save-dev
```
Chạy server với nodemon:
```bash
yarn nodemon server.js
# hoặc
npx nodemon server.js
```

## API Docs
Truy cập [http://localhost:5000/api-docs](http://localhost:5000/api-docs) để xem và test API với Swagger UI.

## Thư mục chính
- `src/models/` - Định nghĩa schema Mongoose
- `src/controllers/` - Xử lý logic cho API
- `src/routes/` - Định nghĩa các endpoint
- `src/seed.js` - Seed dữ liệu mẫu

## License
MIT 