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
      }
    });

    User.associate = (models) => {
      User.hasMany(models.Review, {
        foreignKey: 'userId',
        as: 'reviews'
      });
    };
    
    return User;
  }