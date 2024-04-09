import { Review } from '../../db/sequelize.js';

export default (app) => {
  app.post('/api/deleteReview', (req, res) => {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'ID de la review manquant dans la requête' });
    }

    Review.destroy({
      where: {
        id: id
      }
    })
    .then(numDeleted => {
      if (numDeleted === 0) {
        return res.status(404).json({ message: 'Aucune review trouvée avec cet ID' });
      }
      res.json({ message: 'La review a été supprimée avec succès' });
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de la review :', error);
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression de la review' });
    });
  });
};
