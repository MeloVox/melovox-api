export default (sequelize, DataTypes) => {
    return sequelize.define('User', {
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
    })
  }