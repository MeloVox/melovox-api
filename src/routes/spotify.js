import { User } from '../db/sequelize.js'
import { ValidationError, UniqueConstraintError } from 'sequelize'

export default (app) => {
  app.post('/api/spotify', (req, res) => {
    const spotifyId = req.body.spotifyId
    const email = req.body.email
    User.findOne({ where: { spotifyId: spotifyId } })
      .then(data => {
        if(data) {
          console.log(data);
          res.json({ data })
          return
        }
        User.create({
          email: email,
          spotifyId: spotifyId
        }).then((data) => {
          console.log(data);
          const message = `Le compte ${email} a bien été créer.`
          res.json({ message, data })
        })
          .catch(error => {
            if (error instanceof ValidationError) {
              return res.status(400).json({ message: error.message, error })
            }
            if (error instanceof UniqueConstraintError) {
              return res.status(400).json({ message: error.message, error })
            }
            const message = 'Le compte n\'a pas pu être créer. Réessayer dans quelques instants'
            res.status(500).json({ message, data: error })
          })
      })
      .catch(error => {
        console.log(error);
        User.create({
          email: req.body.email,
          spotifyLogin: req.body.spotifyId
        }).then((data) => {
          console.log(data);
          const message = `Le compte ${req.body.email} a bien été créer.`
          res.json({ message, data })
        })
          .catch(error => {
            if (error instanceof ValidationError) {
              return res.status(400).json({ message: error.message, error })
            }
            if (error instanceof UniqueConstraintError) {
              return res.status(400).json({ message: error.message, error })
            }
            const message = 'Le compte n\'a pas pu être créer. Réessayer dans quelques instants'
            res.status(500).json({ message, data: error })
          })
      })
  })
}
