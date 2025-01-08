const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db'); // 假设 db.js 文件中配置了 Sequelize 实例

const Group = sequelize.define('Group', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
});

module.exports = Group;
