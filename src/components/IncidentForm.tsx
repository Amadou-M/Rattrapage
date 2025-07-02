import React, { useState, useEffect } from 'react';
import { Save, X, AlertTriangle } from 'lucide-react';
import { Incident, IncidentFormData } from '../types/incident';
import { locations, staffMembers } from '../data/mockData';

interface IncidentFormProps {
  incident?: Incident;
  onSave: (data: IncidentFormData) => void;
  onCancel: () => void;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ incident, onSave, onCancel }) => {
  const [formData, setFormData] = useState<IncidentFormData>({
    title: '',
    description: '',
    severity: 'MEDIUM',
    location: '',
    assignedTo: '',
    category: 'OTHER',
    emergencyLevel: 1
  });

  useEffect(() => {
    if (incident) {
      setFormData({
        title: incident.title,
        description: incident.description,
        severity: incident.severity,
        location: incident.location,
        assignedTo: incident.assignedTo,
        category: incident.category,
        emergencyLevel: incident.emergencyLevel
      });
    }
  }, [incident]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: keyof IncidentFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-100 flex items-center">
            <AlertTriangle className="h-6 w-6 mr-2 text-amber-400" />
            {incident ? 'Edit Incident' : 'New Incident'}
          </h1>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Titre de l’incident *
              </label>
              <input
                type="text"
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter incident title"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                required
                rows={4}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe the incident in detail"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Gravité *
              </label>
              <select
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                value={formData.severity}
                onChange={(e) => handleChange('severity', e.target.value)}
              >
                <option value="LOW">Faible</option>
                <option value="MEDIUM">Moyenne</option>
                <option value="HIGH">Élevée</option>
                <option value="CRITICAL">Critique</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Catégorie *
              </label>
              <select
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                <option value="SECURITY">Sécurité</option>
                <option value="ANIMAL">Animal</option>
                <option value="SYSTEM">Système</option>
                <option value="WEATHER">Météo</option>
                <option value="MEDICAL">Médical</option>
                <option value="OTHER">Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location *
              </label>
              <select
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
              >
                <option value="">Sélectionner un emplacement</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Attribué à *
              </label>
              <select
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                value={formData.assignedTo}
                onChange={(e) => handleChange('assignedTo', e.target.value)}
              >
                <option value="">Sélectionner un membre du personnel</option>
                {staffMembers.map(staff => (
                  <option key={staff} value={staff}>{staff}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Niveau d’urgence (1-5) *
              </label>
              <div className="flex space-x-4">
                {[1, 2, 3, 4, 5].map(level => (
                  <label key={level} className="flex items-center">
                    <input
                      type="radio"
                      name="emergencyLevel"
                      value={level}
                      checked={formData.emergencyLevel === level}
                      onChange={(e) => handleChange('emergencyLevel', parseInt(e.target.value))}
                      className="mr-2 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-gray-300">{level}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              {incident ? 'Update' : 'Create'} Incident
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidentForm;