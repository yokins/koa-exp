// 模拟用户数据库
const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

class UserModel {
    static async findByCredentials(username, password) {
        return await User.findOne({
            where: {
                username,
                password
            }
        });
    }

    static async sync() {
        await User.sync({ alter: true });
        
        // 创建测试用户
        const testUser = await User.findOne({ where: { username: 'admin' } });
        if (!testUser) {
            await User.create({
                username: 'admin',
                password: '123456'
            });
        }
    }
}

module.exports = UserModel;
