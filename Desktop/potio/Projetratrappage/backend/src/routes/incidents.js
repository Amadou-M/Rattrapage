const express = require('express');
const { body } = require('express-validator');
const IncidentController = require('../controllers/IncidentController');
const auth = require('../middlewares/auth');

const router = express.Router();

// Validation des données d'incident
const incidentValidation = [
  body('title').notEmpty().withMessage('Le titre est requis'),
  body('description').notEmpty().withMessage('La description est requise'),
  body('severity').isIn(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).withMessage('Sévérité invalide'),
  body('location').notEmpty().withMessage('La localisation est requise'),
  body('assignedTo').notEmpty().withMessage('L\'assignation est requise'),
  body('category').isIn(['SECURITY', 'ANIMAL', 'SYSTEM', 'WEATHER', 'MEDICAL', 'OTHER']).withMessage('Catégorie invalide'),
  body('emergencyLevel').isInt({ min: 1, max: 5 }).withMessage('Niveau d\'urgence invalide (1-5)')
];

// Routes publiques (pour démo)
router.get('/', IncidentController.getAll);
router.get('/stats', IncidentController.getStats);
router.get('/:id', IncidentController.getById);

// Routes protégées (nécessitent authentification)
router.post('/', auth, incidentValidation, IncidentController.create);
router.put('/:id', auth, incidentValidation, IncidentController.update);
router.patch('/:id/status', auth, IncidentController.updateStatus);
router.delete('/:id', auth, IncidentController.delete);

module.exports = router;