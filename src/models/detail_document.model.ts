import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

type DetailDocumentAttributes = {
    id: number;
    document_id: number;
    product_id: number;
    quality: number;
};
type DetailDocumentCreationAttributes = Optional<DetailDocumentAttributes, 'id'>;

interface DetailDocumentModel extends Model<DetailDocumentCreationAttributes>, DetailDocumentCreationAttributes { }

// Định nghĩa mô hình và thuộc tính của bảng
const DetailDocumentModel = sequelize.define<DetailDocumentModel>('DetailDocument', {
    document_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Documents',
            key: 'document_id',
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

export default DetailDocumentModel;