import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

type StockAttributes = {
    stock_id: number;
    stock_name: string;
    address: string;
    stocker_id: number;
};
type StockCreationAttributes = Optional<StockAttributes, 'stock_id'>;

interface StockModel extends Model<StockCreationAttributes>, StockCreationAttributes { }

// Định nghĩa mô hình và thuộc tính của bảng
const StockModel = sequelize.define<StockModel>('Stock', {
    stock_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    stock_name: DataTypes.STRING,
    address: DataTypes.STRING,
    stocker_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'user_id',
        }
    }
});


export default StockModel;