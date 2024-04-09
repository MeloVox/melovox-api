import { Reply } from '../../db/sequelize.js'
import { ValidationError, UniqueConstraintError} from 'sequelize'

export default (app) => {
    app.post('/api/createReply', (req, res) => {
        const { userId, reviewId, comment } = req.body;

        Reply.create({
            userId,
            reviewId,
            comment
        }).then(() => {
            res.json({ message: 'Réponse crée' })
          })
          .catch(error => {
            if (error instanceof ValidationError) {
              return res.status(400).json({ message: error.message, error})
            }
            if (error instanceof UniqueConstraintError) {
              return res.status(400).json({ message: error.message, error})
            }
            const message = 'La réponse n\'a pas pu être créer. Réessayer dans quelques instants'
            res.status(500).json({ message, data: error })
          })
    })
}
