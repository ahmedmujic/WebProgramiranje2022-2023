module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Users.associate = (models) => {
        Users.hasMany(models.Posts, {
            onDelete: 'cascade',
            foreignKey: {
                name: 'authorId'
            }
        })
    }
    return Users;
}