import { Review } from '../../db/sequelize.js';

export default (app) => {
  app.post('/api/getReviews', (req, res) => {
    const { type, id, user } = req.body;

    let findOptions = {
      limit: 2,
      order: [['createdAt', 'DESC']]
    };
    
    if (id && type) {
      findOptions.where = { [type + 'Id']: id };
    }

    Review.findAll(findOptions)
    .then(reviews => {
        const message = 'Voici les critiques associés à l\élément : ' + (type ?? 'global') + ' renseigné.'
        const averageRating = average(reviews);
        res.json({ message, reviews: reviews, averageRating: averageRating})
    })
    .catch(error => {
        const message = 'Les critiques n\'ont pas pu être récupérées. Réessayez dans quelques instants.'
        res.status(500).json({ message, data: error })
    });
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