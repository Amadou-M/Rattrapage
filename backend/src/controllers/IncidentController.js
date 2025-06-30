const Incident = require('../models/Incident');
const { validationResult } = require('express-validator');

class IncidentController {
  // Récupérer tous les incidents avec filtres
  static async getAll(req, res, next) {
    try {
      const filters = {
        status: req.query.status,
        severity: req.query.severity,
        category: req.query.category,
        location: req.query.location,
        assignedTo: req.query.assignedTo,
        search: req.query.search
      };

      const incidents = await Incident.findAll(filters);
      
      res.json({
        success: true,
        data: incidents,
        count: incidents.length
      });
    } catch (error) {
      next(error);
    }
  }

  // Récupérer un incident par ID
  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const incident = await Incident.findById(id);

      if (!incident) {
        return res.status(404).json({
          success: false,
          message: 'Incident non trouvé'
        });
      }

      res.json({
        success: true,
        data: incident
      });
    } catch (error) {
      next(error);
    }
  }

  // Créer un nouvel incident
  static async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Données invalides',
          errors: errors.array()
        });
      }

      const incidentData = {
        ...req.body,
        reportedBy: req.user?.name || 'Système',
        status: 'OPEN'
      };

      const incident = new Incident(incidentData);
      await incident.save();

      res.status(201).json({
        success: true,
        message: 'Incident créé avec succès',
        data: incident
      });
    } catch (error) {
      next(error);
    }
  }

  // Mettre à jour un incident
  static async update(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Données invalides',
          errors: errors.array()
        });
      }

      const { id } = req.params;
      const incident = await Incident.findById(id);

      if (!incident) {
        return res.status(404).json({
          success: false,
          message: 'Incident non trouvé'
        });
      }

      // Mise à jour des propriétés
      Object.assign(incident, req.body);
      await incident.save();

      res.json({
        success: true,
        message: 'Incident mis à jour avec succès',
        data: incident
      });
    } catch (error) {
      next(error);
    }
  }

  // Supprimer un incident
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const incident = await Incident.findById(id);

      if (!incident) {
        return res.status(404).json({
          success: false,
          message: 'Incident non trouvé'
        });
      }

      await incident.delete();

      res.json({
        success: true,
        message: 'Incident supprimé avec succès'
      });
    } catch (error) {
      next(error);
    }
  }

  // Statistiques du dashboard
  static async getStats(req, res, next) {
    try {
      const stats = await Incident.getStats();
      
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      next(error);
    }
  }

  // Mettre à jour le statut d'un incident
  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Statut invalide'
        });
      }

      const incident = await Incident.findById(id);
      if (!incident) {
        return res.status(404).json({
          success: false,
          message: 'Incident non trouvé'
        });
      }

      incident.status = status;
      await incident.save();

      res.json({
        success: true,
        message: 'Statut mis à jour avec succès',
        data: incident
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = IncidentController;