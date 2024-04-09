export default (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });

  Reply.associate = (models) => {
    Reply.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Reply.belongsTo(models.Review, {
      foreignKey: 'reviewId',
      as: 'reply'
    });
  };

  return Reply;
};