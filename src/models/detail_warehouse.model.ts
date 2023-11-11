import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

type DetailWarehouseAttributes = {
    id: number;
    receipt_id: number;
    product_id: number;
    quality: number;
};
type DetailWarehouseCreationAttributes = Optional<DetailWarehouseAttributes, 'id'>;

interface DetailWarehouseModel extends Model<DetailWarehouseCreationAttributes>, DetailWarehouseCreationAttributes { }
// Định nghĩa mô hình và thuộc tính của bảng
const DetailWarehouseModel = sequelize.define<DetailWarehouseModel>('DetailWarehouse', {
    receipt_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'WarehouseReceipts',
            key: 'receipt_id',
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Products',
            key: 'product_id',
        }
    },
    quality: DataTypes.INTEGER,
});

export default DetailWarehouseModel;