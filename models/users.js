module.exports = (sequelize, DataTypes) => {
    var User =  sequelize.define('users', {
        first_name: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        date_of_birth: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        }
    })
    return User;
}