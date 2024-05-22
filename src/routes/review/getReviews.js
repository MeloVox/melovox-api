import { Review } from '../../db/sequelize.js';

export default (app) => {
  app.get('/api/getReviews', (req, res) => {
    const { type, id, idMusic, userId, idAlbum, idArtist, userPhoto, userEmail, artistPhoto } = req.query;

    let findOptions = {
      order: [['createdAt', 'DESC']],
      where: {}
    };

    if (type && id) {
      findOptions.where[type + 'Id'] = id;
    }

    if (idMusic) {
      findOptions.where.idMusic = idMusic;
    }

    if (userId) {
      findOptions.where.userId = userId;
    }

    if (idAlbum) {
      findOptions.where.idAlbum = idAlbum;
    }

    if (idArtist) {
      findOptions.where.idArtist = idArtist;
    }

    if (userEmail) {
      findOptions.where.userEmail = userEmail;
    }

    if (userPhoto) {
      findOptions.where.userPhoto = userPhoto;
    }

    if (artistPhoto) {
      findOptions.where.artistPhoto = artistPhoto;
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
