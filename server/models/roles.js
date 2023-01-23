module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define("Roles", {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
    });

    Roles.associate = (models) => {
        Roles.hasMany(models.Users, {
            onDelete: 'cascade',
            foreignKey: {
                name: 'roleId'
            }
        })
    }



    return Roles;
}