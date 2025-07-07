import React, { useState } from 'react';
import { ArrowLeft, Edit, Trash2, MapPin, User, Calendar, AlertTriangle, Activity } from 'lucide-react';
import { Incident } from '../types/incident';

interface IncidentDetailProps {
  incident: Incident;
  onBack: () => void;
  onEdit: (incident: Incident) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Incident['status']) => void;
}

const IncidentDetail: React.FC<IncidentDetailProps> = ({ 
  incident, 
  onBack, 
  onEdit, 
  onDelete, 
  onStatusChange 
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-900 text-red-300 border-red-700';
      case 'HIGH': return 'bg-orange-900 text-orange-300 border-orange-700';
      case 'MEDIUM': return 'bg-yellow-900 text-yellow-300 border-yellow-700';
      case 'LOW': return 'bg-green-900 text-green-300 border-green-700';
      default: return 'bg-gray-900 text-gray-300 border-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-red-900 text-red-300 border-red-700';
      case 'IN_PROGRESS': return 'bg-blue-900 text-blue-300 border-blue-700';
      case 'RESOLVED': return 'bg-green-900 text-green-300 border-green-700';
      case 'CLOSED': return 'bg-gray-900 text-gray-300 border-gray-700';
      default: return 'bg-gray-900 text-gray-300 border-gray-700';
    }
  };

  const handleDelete = () => {
    onDelete(incident.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-gray-200 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Incidents
        </button>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(incident)}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-100 mb-4">{incident.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(incident.severity)}`}>
                {incident.severity}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(incident.status)}`}>
                {incident.status.replace('_', ' ')}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-900 text-purple-300 border border-purple-700">
                {incident.category}
              </span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-amber-400 mb-1">
              Level {incident.emergencyLevel}
            </div>
            <div className="text-sm text-gray-400">Emergency Level</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-100 mb-4">Description</h2>
            <p className="text-gray-300 leading-relaxed">{incident.description}</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center text-gray-300">
              <MapPin className="h-5 w-5 mr-3 text-gray-400" />
              <div>
                <div className="font-medium">Location</div>
                <div className="text-sm text-gray-400">{incident.location}</div>
              </div>
            </div>
            
            <div className="flex items-center text-gray-300">
              <User className="h-5 w-5 mr-3 text-gray-400" />
              <div>
                <div className="font-medium">Assigned To</div>
                <div className="text-sm text-gray-400">{incident.assignedTo}</div>
              </div>
            </div>
            
            <div className="flex items-center text-gray-300">
              <User className="h-5 w-5 mr-3 text-gray-400" />
              <div>
                <div className="font-medium">Reported By</div>
                <div className="text-sm text-gray-400">{incident.reportedBy}</div>
              </div>
            </div>
            
            <div className="flex items-center text-gray-300">
              <Calendar className="h-5 w-5 mr-3 text-gray-400" />
              <div>
                <div className="font-medium">Created</div>
                <div className="text-sm text-gray-400">{new Date(incident.createdAt).toLocaleString()}</div>
              </div>
            </div>
            
            <div className="flex items-center text-gray-300">
              <Calendar className="h-5 w-5 mr-3 text-gray-400" />
              <div>
                <div className="font-medium">Last Updated</div>
                <div className="text-sm text-gray-400">{new Date(incident.updatedAt).toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Change */}
        <div className="border-t border-gray-700 pt-6">
          <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Update Status
          </h2>
          <div className="flex space-x-3">
            {(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as const).map(status => (
              <button
                key={status}
                onClick={() => onStatusChange(incident.id, status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  incident.status === status
                    ? getStatusColor(status)
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-400 mr-3" />
              <h3 className="text-lg font-semibold text-gray-100">Confirm Deletion</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this incident? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentDetail;