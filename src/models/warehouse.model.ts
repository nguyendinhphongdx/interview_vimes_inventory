import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

type WarehouseAttributes = {
    receipt_id: number;
    user_id: number;
    driver_id: number;
    accoutant_id: number;
    document_id: number;
};
type WarehouseCreationAttributes = Optional<WarehouseAttributes, 'receipt_id'>;

interface WareHouseReceiptModel extends Model<WarehouseCreationAttributes>, WarehouseCreationAttributes { }

// Định nghĩa mô hình và thuộc tính của bảng
const WareHouseReceiptModel = sequelize.define<WareHouseReceiptModel>('WarehouseReceipt', {
    receipt_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: DataTypes.INTEGER,
    driver_id: DataTypes.INTEGER,
    accoutant_id: DataTypes.INTEGER,
    document_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Documents',
            key: 'document_id',
        }
    },
});

export default WareHouseReceiptModel;