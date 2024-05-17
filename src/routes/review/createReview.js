import { Review } from '../../db/sequelize.js'
import { ValidationError, UniqueConstraintError } from 'sequelize'

export default (app) => {
  app.post('/api/createReview', (req, res) => {
    const { userId, artist, album, rating, comment } = req.body;

    Review.create({
      userId,
      artist,
      album,
      rating,
      comment
    }).then(() => {
      res.json({ message: 'Note créée' })
    })
      .catch(error => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, error })
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, error })
        }
        const message = 'La note n\'a pas pu être créer. Réessayer dans quelques instants'
        res.status(500).json({ message, data: error })
      })
  })
}