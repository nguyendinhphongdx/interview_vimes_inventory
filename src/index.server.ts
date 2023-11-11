// src/index.ts
import * as bodyParser from 'body-parser';
import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import morgan from 'morgan';

import { creatDatabase, sequelize } from './models';
import { initializeData } from './libs/init.database';
import inventoryController from './controllers/inventory.controller';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(process.cwd() + '/public', {
  maxAge: 86400000, // thời gian cache mặc định là 1 ngày
  etag: true, // sử dụng ETag để kiểm tra tài nguyên có thay đổi hay không
  lastModified: true, //
}));
app.use(favicon(path.join(process.cwd(), 'public', 'resources', 'img', 'favicon.png')))

app.use(morgan('dev', {
  skip: (req, res) => req.url.includes("/assets/") || req.url.includes("/resources/")
}));

// Route để xử lý yêu cầu nhập kho
app.get('/login', inventoryController.index);
app.get('/inventory/create', inventoryController.create);
app.post('/api/inventory/create', inventoryController.post);


// Khởi động server
app.listen(port, async () => {
  await creatDatabase();
  await sequelize.sync();
  await initializeData();
  console.log(`Server is running at http://localhost:${port}`);
});
