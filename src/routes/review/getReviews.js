import { Review } from '../../db/sequelize.js';

export default (app) => {
  app.post('/api/getReviews', (req, res) => {
    const { type, id } = req.body;

    if (id && type) {
      Review.findAll({
          where: { [type + 'Id']: id },
      })
      .then(reviews => {
          const message = 'Voici les reviews associé à l\'id et au type choisi.'
          const averageRating = average(reviews);
          res.json({ message, reviews: reviews, averageRating: averageRating})
      })
      .catch(error => {
          const message = 'Les critiques n\'ont pas pu être récupérées. Réessayez dans quelques instants.'
          res.status(500).json({ message, data: error })
      });
    } else {
       console.log('Les 20 dernieres reviews');
    }
  })

  function average(reviews)
  {
    let sum = 0;
    reviews.forEach(review => {
      sum += review.rating;
    });

    return sum / reviews.length;
  }
}