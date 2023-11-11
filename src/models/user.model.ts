import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './';

type UserAttributes = {
    user_id: number;
    username: string;
    role: 'normal' | 'driver' | 'stocker' | 'accountant';
    work_unit: string;
    department: string;
};
type UserCreationAttributes = Optional<UserAttributes, 'user_id'>;

interface UserModel extends Model<UserCreationAttributes>, UserCreationAttributes { }


// Định nghĩa mô hình và thuộc tính của bảng
const UserModel = sequelize.define<UserModel>('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: DataTypes.STRING,
    role: {
        type: DataTypes.ENUM,
        values: ['normal', 'driver', 'stocker', 'accountant'], // người dùng thông thường, tài xế, thủ kho, kế toán
        defaultValue: 'normal'
    },
    work_unit: DataTypes.STRING,
    department: DataTypes.STRING,
});

export default UserModel;