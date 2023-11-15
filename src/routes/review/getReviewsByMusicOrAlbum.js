import { Review } from '../../db/sequelize.js';

export default (app) => {
  app.post('/api/getReviewsByMusicOrAlbum', (req, res) => {
    const { musicId, albumId } = req.body;

    if (musicId) {
      Review.findAll({
          where: { musicId: musicId },
      })
      .then(reviews => {
          const message = 'Les critiques pour la musique ont été récupérées avec succès.'
          const averageRating = average(reviews);
          res.json({ message, reviews: reviews, averageRating: averageRating})
      })
      .catch(error => {
          const message = 'Les critiques pour la musique n\'ont pas pu être récupérées. Réessayez dans quelques instants.'
          res.status(500).json({ message, data: error })
      });
    } else if (albumId) {
      Review.findAll({
        where: { albumId: albumId },
      })
      .then(reviews => {
          const message = 'Les critiques pour l\'album ont été récupérées avec succès.'
          const averageRating = average(reviews);
          res.json({ message, reviews: reviews, averageRating, averageRating })
      })
      .catch(error => {
          const message = 'Les critiques pour l\'album n\'ont pas pu être récupérées. Réessayez dans quelques instants.'
          res.status(500).json({ message, data: error })
      });
    } else {
        res.status(400).json({ message: 'Veuillez fournir un ID de musique ou d\'album dans la requête.' });
    }
  })
}

function average(reviews)
{
  let sum = 0;
  reviews.forEach(review => {
    sum += review.rating;
  });

  return sum / reviews.length;
}