import { sequelize, creatDatabase } from "./sequelize";
import UserModel from "./user.model";
import ProductModel from "./product.model";
import StockModel from "./stock.model";
import DetailDocumentModel from "./detail_document.model";
import DetailWarehouseModel from "./detail_warehouse.model";
import DocumentModel from "./document.model";
import  WareHouseReceiptModel from "./warehouse.model";




// stock - user (1-1): 1 kho có 1 nhân viên thủ kho, 1 nhân viên chỉ có thể làm thủ kho cho 1 kho
// StockModel.hasOne(UserModel, { foreignKey: 'stocker_id' });

// document - stock (1-n): 1 chứng từ thuộc về 1 kho, 1 kho có thể nhiều chứng từ
DocumentModel.belongsTo(StockModel, { foreignKey: 'stock_id' });

// document - detail_document (1-n): 1 chứng từ có nhiều chi tiết chứng từ (sản phẩm, và số lượng nhập trên chứng từ)
DocumentModel.belongsTo(DetailDocumentModel, { foreignKey: 'document_id' });

// warehouse - detail_warehouse (1-n): 1 phiếu nhập kho có nhiều chi tiết nhập (sản phẩm, và số lượng nhập thực tế)
WareHouseReceiptModel.belongsTo(DetailWarehouseModel, { foreignKey: 'receipt_id', targetKey: 'receipt_id' });

// document -  stock (1-n): 1 phiếu nhập kho chỉ thuộc về 1 kho, 1 kho có thể có nhiều phiếu nhập
// WareHouseReceiptModel.belongsTo(StockModel, { foreignKey: 'stock_id' });

// warehouse -  user (1-n): 1 phiếu nhập kho được tạo bởi 1 nhân viên, 1 nhân viên có thể tạo nhiều phiếu
WareHouseReceiptModel.belongsTo(UserModel, { foreignKey: 'user_id' });

// warehouse -  driver (1-n): 1 phiếu nhập kho được giao bởi 1 nhân viên, 1 nhân viên có thể giao nhiều phiếu
WareHouseReceiptModel.belongsTo(UserModel, { foreignKey: 'driver_id' });

// warehouse -  accountant (1-n): 1 phiếu nhập kho được kế toán xác nhận, 1 kế toán có thể xác nhận nhiều phiếu nhập kho
WareHouseReceiptModel.belongsTo(UserModel, { foreignKey: 'driver_id' });

// warehouse -  document (1-1): 1 phiếu nhập kho thực hiện theo 1 chứng từ, 1 chứng từ chỉ áp dụng cho 1 phiếu nhập kho
// WareHouseReceiptModel.hasOne(DocumentModel, { foreignKey: 'document_id' });

// detail_receipt - product (1-n): 1 chi tiết nhập chỉ chứa 1 sản phẩm, 1 sản phẩm có thể thuộc nhiều chi tiết nhập
// ProductModel.belongsTo(DetailWarehouseModel, { foreignKey: 'product_id', targetKey: 'product_id' });

// detail_document - product (1-n): 1 chi tiết chứng từ chỉ chứa 1 sản phẩm, 1 sản phẩm có thể thuộc nhiều chi tiết chứng từ
// ProductModel.belongsTo(DetailDocumentModel, { foreignKey: 'product_id', targetKey: 'product_id' });

export {
    sequelize,
    UserModel,
    ProductModel,
    StockModel,
    DetailDocumentModel,
    DetailWarehouseModel,
    DocumentModel,
    WareHouseReceiptModel,
    creatDatabase
}