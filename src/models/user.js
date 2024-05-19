export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        msg: "Email can't be null"
      },
      validate: {
        isEmail: {
          msg: "Must be an email"
        }
      },
      unique: {
        msg: 'Email already used'
      }
    },
    password: {
      type: DataTypes.STRING
    },
    googleAuth: {
      type: DataTypes.BOOLEAN
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      validate: {
        isUrl: {
          msg: "Must be a valid URL"
        }
      }
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'reviews'
    });
    User.hasMany(models.Reply, {
      foreignKey: 'userId',
      as: 'replys'
    });
  };

  return User;
}