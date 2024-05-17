import { Review } from '../../db/sequelize.js';

export default (app) => {
  app.get('/api/getReviews', (req, res) => {
    const { type, id, music, userId, album, artist } = req.query;

    let findOptions = {
      limit: 40,
      order: [['createdAt', 'DESC']],
      where: {}
    };

    if (type && id) {
      findOptions.where[type + 'Id'] = id;
    }

    if (music) {
      findOptions.where.music = music;
    }

    if (userId) {
      findOptions.where.userId = userId;
    }

    if (album) {
      findOptions.where.album = album;
    }

    if (artist) {
      findOptions.where.artist = artist;
    }

    Review.findAll(findOptions)
      .then(reviews => {
        if (!reviews.length) {
          return res.status(404).json({ message: 'Aucune critique trouvée' });
        }

        const averageRating = calculateAverageRating(reviews);
        const message = 'Voici les critiques associées aux filtres spécifiés.';
        res.json({ message, reviews, averageRating });
      })
      .catch(error => {
        const message = 'Les critiques n\'ont pas pu être récupérées. Réessayez dans quelques instants.';
        res.status(500).json({ message, data: error });
      });
  });

  function calculateAverageRating(reviews) {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return sum / reviews.length;
  }
};
