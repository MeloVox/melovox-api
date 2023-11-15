import express from 'express'
import favicon from 'serve-favicon'
import bodyParser from 'body-parser'
import { initDb } from './src/db/sequelize.js'
import cors from 'cors'

// routes

import login from './src/routes/login.js'
import register from './src/routes/register.js'
import getAccountInfo from './src/routes/getAccountInfo.js'
import removeAccount from './src/routes/removeAccount.js'
import updateEmail from './src/routes/updateEmail.js'
import updatePassword from './src/routes/updatePassword.js'
import createReview from './src/routes/review/createReview.js'
import getReviewsByMusicOrAlbum from './src/routes/review/getReviewsByMusicOrAlbum.js'

const app = express()
const port = process.env.PORT || 3333

app
.use(favicon('./favicon.ico'))
.use(bodyParser.json())
.use(cors())

initDb()

// Points de terminaisons

app.get('/', (req, res) => {
    res.json('Hello, melovox-api is ready to use !')
})

//Account
login(app)
register(app)
getAccountInfo(app)
removeAccount(app)
updateEmail(app)
updatePassword(app)

//Review
createReview(app)
getReviewsByMusicOrAlbum(app)

// Gestion d'erreurs
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée !'
    res.status(404).json({message})
})

app.listen(port, () => console.log(`Appli démarée sur: http://localhost:${port}`))