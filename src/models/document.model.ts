import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

type DocumentAttributes = {
    document_id: number;
    content: string;
    stock_id: number;
    status: 'pending' | 'completed'
};
type DocumentCreationAttributes = Optional<DocumentAttributes, 'document_id'>;

interface DocumentModel extends Model<DocumentCreationAttributes>, DocumentCreationAttributes { }
// Định nghĩa mô hình và thuộc tính của bảng
const DocumentModel = sequelize.define<DocumentModel>('Document', {
    document_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: DataTypes.STRING,
    stock_id: DataTypes.INTEGER,
    status: {
        type: DataTypes.ENUM,
        values: ['pending', 'completed']
    }
});

export default DocumentModel;