import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

type ProductAttributes = {
    product_id: number;
    name: string;
    price: number;
    currency_unit: 'USD' | 'VND';
};
type ProductCreationAttributes = Optional<ProductAttributes, 'product_id'>;

interface ProductModel extends Model<ProductCreationAttributes>, ProductCreationAttributes { }
// Định nghĩa mô hình và thuộc tính của bảng
const ProductModel = sequelize.define<ProductModel>('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    currency_unit: {
        type: DataTypes.ENUM(),
        values: ['USD', 'VND'],
        defaultValue: 'VND',
    },
});

export default ProductModel;