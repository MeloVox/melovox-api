import { Review } from '../../db/sequelize.js'
import { ValidationError, UniqueConstraintError } from 'sequelize'

export default (app) => {
  app.post('/api/createReview', (req, res) => {
    const { userId, artistPhoto, userEmail, idArtist, idAlbum, rating, comment, idMusic, albumName, artistName, userPhoto } = req.body;

    console.log(req.body);
    Review.create({
      userId,
      userEmail,
      artistPhoto,
      idArtist,
      idAlbum,
      rating,
      comment,
      idMusic,
      albumName,
      artistName,
      userPhoto
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