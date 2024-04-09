import { Reply } from '../../db/sequelize.js';

export default (app) => {
  app.post('/api/getReplies', (req, res) => {
    const { type, id } = req.body;

    let findOptions = {
      limit: 2,
      order: [['createdAt', 'DESC']]
    };
    
    if (id && type) {
      findOptions.where = { [type + 'Id']: id };
    }

    Reply.findAll(findOptions)
    .then(replies => {
        const message = 'Voici les réponses associés à l\élément : ' + (type ?? 'global') + ' renseigné.'
        res.json({ message, replies: replies})
    })
    .catch(error => {
        const message = 'Les réponses n\'ont pas pu être récupérées. Réessayez dans quelques instants.'
        res.status(500).json({ message, data: error })
    });
  })
}