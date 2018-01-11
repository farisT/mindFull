module.exports = (sequelize, DataTypes) => {
    var Feels =  sequelize.define('feels', {
         mood: {
            type: DataTypes.INTEGER,
            unique: false,
            allowNull: false
        },
        sleep: {
            type: DataTypes.INTEGER,
            unique: false,
            allowNull: false
        },
        diet: {
            type: DataTypes.INTEGER,
            unique: false,
            allowNull: false
        },
        exercise: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
            values: ['Yes', 'No']
        }
    })
    return Feels;
}