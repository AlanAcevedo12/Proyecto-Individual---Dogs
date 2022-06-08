const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    
    sequelize.define("dog", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        height: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        weight: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        years: {
            type: DataTypes.STRING
        }
    },{
        timestamps: false
    });
}