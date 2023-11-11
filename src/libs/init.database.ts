import { UserModel, DocumentModel, StockModel, ProductModel, WareHouseReceiptModel, DetailWarehouseModel, DetailDocumentModel } from '../models';
import { getRandomElement, getRandomElements } from './helpers';

// Hàm khởi tạo dữ liệu
const initializeData = async () => {
    try {
        await Promise.all([initUsers(), initProducts()]);
        await initStocks();
        await initDocuments();
    } catch (error) {
        console.error('Error initializing data:', error);
    }
};

const initUsers = async () => {
    // Kiểm tra xem có dữ liệu trong bảng Users chưa
    const existingUsers = await UserModel.findAll();
    if (existingUsers.length == 0) {
        // Tạo người dùng mẫu
        const sampleUsers = await UserModel.bulkCreate([
            {
                username: 'sample_user',
                role: 'normal',
                work_unit: 'Sample Work Unit',
                department: 'Sample Department',
            },
            {
                username: 'driver_user',
                role: 'driver',
                work_unit: 'Sample Work Unit',
                department: 'Sample Department',
            },
            {
                username: 'stocker_user',
                role: 'stocker',
                work_unit: 'Sample Work Unit',
                department: 'Sample Department',
            },
            {
                username: 'accountant_user',
                role: 'accountant',
                work_unit: 'Sample Work Unit',
                department: 'Sample Department',
            }
        ]);
        console.log('Users initialized successfully!');
    }
}

const initProducts = async () => {
    // Kiểm tra xem có dữ liệu trong bảng Users chưa
    const existingProducts = await ProductModel.findAll();
    if (existingProducts.length == 0) {
        // Tạo người dùng mẫu
        const products = await ProductModel.bulkCreate([
            {
                name: 'Circulator NJC32124',
                currency_unit: 'VND',
                price: 200000
            },
            {
                name: 'FAN NJC32124',
                currency_unit: 'VND',
                price: 100000
            },
            {
                name: 'CPU NJC32124',
                currency_unit: 'VND',
                price: 500000
            },
            {
                name: 'CASE SDK334',
                currency_unit: 'VND',
                price: 200000
            },
        ]);
        console.log('Products initialized successfully!');
    }
}

const initStocks = async () => {
    // Kiểm tra xem có dữ liệu trong bảng Users chưa
    const existingStocks = await StockModel.findAll();
    if (existingStocks.length == 0) {
        const stocker = await UserModel.findOne({ where: { role: 'stocker' } });
        if (stocker) {
            // Tạo người dùng mẫu
            const stocks = await StockModel.bulkCreate([
                {
                    stock_name: 'stock AKL HANOI',
                    address: 'Cau Giay - HaNoi',
                    stocker_id: 1
                },
                {
                    stock_name: 'stock AKL NAMDINH',
                    address: 'QL - NamDinh',
                    stocker_id: 1
                },
            ]);
            console.log('Stocks initialized successfully!');
        } else {
            console.log('Stocks Can not initialized cause not fount any stocker!');
        }
    }
}

const initDocuments = async () => {
    // Kiểm tra xem có dữ liệu trong bảng Users chưa
    const existingDocs = await DocumentModel.findAll();
    if (existingDocs.length == 0) {
        const products = await ProductModel.findAll();
        for (let index = 0; index < 5; index++) {
            const stocks = await StockModel.findAll();
            const stock = getRandomElement<StockModel>(stocks);
            if (stock) {
                // Tạo người dùng mẫu
                const doc = await DocumentModel.create({
                    content: `Nhap hang vao ${stock.stock_name}`,
                    stock_id: stock.stock_id ?? 1,
                    status: 'pending',
                });

                const randomProducts = getRandomElements<ProductModel>(products);
                const details = randomProducts.map(product => {
                    const randomQuantity = getRandomElement<number>([10, 20, 25, 30, 40, 50]);
                    return {
                        document_id: doc.document_id ?? 1,
                        product_id: product.product_id ?? 1,
                        quality: randomQuantity,
                    }
                });
                await DetailDocumentModel.bulkCreate(details);
                console.log('Documents initialized successfully!');
            } else {
                console.log('Documents Can not initialized cause not fount any stock!');
                break;
            }
        }
    }
}
// Gọi hàm khởi tạo khi ứng dụng bắt đầu
export {
    initializeData
}