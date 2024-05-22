export default (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userPhoto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    artistPhoto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    idArtist: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    idAlbum: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    idMusic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    artistName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    albumName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0.5,
        max: 5
      }
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Review.hasMany(models.Reply, {
      foreignKey: 'reviewId',
      as: 'replys'
    });
  };

  return Review;
};