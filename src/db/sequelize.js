import { Sequelize, DataTypes } from 'sequelize'
import UserModel from '../models/user.js'
import ReviewModel from '../models/review.js'
import ReplyModel from '../models/reply.js'
import bcrypt from 'bcrypt'

const credentials = {
  "HOST": "localhost",
  "DB_NAME": "melovox",
  "DB_USER": "postgres",
  "DB_PASSWORD": "postgres"
}

const { HOST, DB_NAME, DB_USER, DB_PASSWORD } = credentials

const host = process.env.HOST || HOST
const db_name = process.env.DB_NAME || DB_NAME
const db_user = process.env.DB_USER || DB_USER
const db_password = process.env.DB_PASSWORD || DB_PASSWORD

const sequelize = new Sequelize(db_name, DB_USER, db_password, {
  host: host,
  dialect: 'postgresql',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})

export const User = UserModel(sequelize, DataTypes)
export const Review = ReviewModel(sequelize, DataTypes)
export const Reply = ReplyModel(sequelize, DataTypes)

export const initDb = () => {
  return sequelize.sync({ force: true }).then(_ => {
    const admin_pass = 'admin'
    bcrypt.hash(admin_pass, 10)
      .then(hash => User.create({ email: 'admin@admin.com', password: hash, googleAuth: false }))
      .then(user => console.log(user.toJSON()))

    console.log('La base de donnée a bien été initialisée !')

  })
}