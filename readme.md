# Inventory Vimes
## _Công nghệ_
1. Nodejs
2. Express
3. Sequelize
4. PostgresDB
5. ✨EJS View Engine  ✨
6. ✨Boostrap & Jquery ✨
## _Cấu trúc cơ sở dữ liệu_
1. Users (thông tin nhân viên)(có 4 role ['normal', 'driver', 'accountant', 'stocker'])
2. Products (Thông tin sản phẩm nhập về kho)
3. Stocks (Danh sách kho bãi)
4. Documents (Yêu cầu nhập hàng - chứng từ)
5. Detail_Documents (Chi tiết sản phẩm trong bảnchứng từ và số lượng)
6. WarehouseReceipts (Đơn nhập kho)
7. Detail_Receipts (Chi tiết đơn nhập kho gồm sản phẩm và số lượng nhập thực tế so với chứng từ)
## _Mô hình ERD_
![alt](https://github.com/nguyendinhphongdx/interview_vimes_inventory/blob/master/public/resources/img/ERD.png?raw=true)


[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/nguyendinhphongdx/interview_vimes_inventory)

## Cài đặt

Dillinger requires [Node.js](https://nodejs.org/) v16+ to run.

Clone source code từ github
```sh
git clone https://github.com/nguyendinhphongdx/interview_vimes_inventory
cd interview_vimes_inventory
```
Cấu hình database môi trường development tại file /src/config/db.config.json
```json
{
    "development": {
        "username": "8icle", // thay thế bằng username postgres
        "password": "8iclepostgres", // thay thế bằng password postgres
        "database": "vimes_inventory", // thay thế bằng database postgres
        "host": "localhost", // thay thế bằng host postgres
        "dialect": "postgres",
        "port": 15432, // thay thế bằng port postgres
        "operatorsAliases": false,
        "pool": {
            "max": 5,
            "min": 0,
            "acquire": 30000,
            "idle": 10000
        }
    }
}
```
# Lưu ý: Đã có tính năng Create database if not exists nên không cần tạo database bằng tay trước
Cài đặt dependencies và devDependencies sau đó start server. (http://localhost:3000/login)

```sh
yarn
yarn start-dev
```

For production environments...

```sh
npm install --production
NODE_ENV=production yarn start-dev
```

## Giao diện
#_Lựa chọn người dùng và yêu cầu nhập đơn cần thực hiện_ (có thể phát triển tính năng đăng nhập)
http://localhost:3000/login
![alt](https://github.com/nguyendinhphongdx/interview_vimes_inventory/blob/master/public/resources/img/login.png?raw=true)
#_Thiết kế và thực hiện code giao diện đơn nhập kho và preview đơn_
![alt](https://github.com/nguyendinhphongdx/interview_vimes_inventory/blob/master/public/resources/img/inventory.png?raw=true)
#_Giao diện chỉnh sửa số lượng thực nhận_
![alt](https://github.com/nguyendinhphongdx/interview_vimes_inventory/blob/master/public/resources/img/edit-product.png?raw=true)

## _Các yêu cầu nhập sau khi được xử lý bằng việc tạo đơn nhập hàng trạng thái sẽ chuyển về 'completed' và không thể nhập lại hàng cho yêu cầu (chứng từ này)_
