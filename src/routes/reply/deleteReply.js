import { Reply } from '../../db/sequelize.js';

export default (app) => {
  app.post('/api/deleteReply', (req, res) => {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'ID de la reply manquant dans la requête' });
    }

    Reply.destroy({
      where: {
        id: id
      }
    })
    .then(numDeleted => {
      if (numDeleted === 0) {
        return res.status(404).json({ message: 'Aucune reply trouvée avec cet ID' });
      }
      res.json({ message: 'La reply a été supprimée avec succès' });
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de la reply :', error);
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression de la reply' });
    });
  });
};
