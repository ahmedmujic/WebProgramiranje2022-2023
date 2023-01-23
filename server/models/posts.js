module.exports = (sequelize, DataTypes) => {
    const posts = sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        text: {
            type: DataTypes.STRING,
            allowNull: true
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    posts.associate = (models) => {
        posts.belongsTo(models.Users);
    }

    return posts;
}