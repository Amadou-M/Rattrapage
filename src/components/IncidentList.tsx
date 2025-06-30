import React from 'react';
import { AlertTriangle, MapPin, User, Calendar, Filter } from 'lucide-react';
import { Incident, FilterOptions } from '../types/incident';

interface IncidentListProps {
  incidents: Incident[];
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onIncidentSelect: (incident: Incident) => void;
}

const IncidentList: React.FC<IncidentListProps> = ({ 
  incidents, 
  filters, 
  onFiltersChange, 
  onIncidentSelect 
}) => {
  const filteredIncidents = incidents.filter(incident => {
    if (filters.status && incident.status !== filters.status) return false;
    if (filters.severity && incident.severity !== filters.severity) return false;
    if (filters.category && incident.category !== filters.category) return false;
    if (filters.location && incident.location !== filters.location) return false;
    if (filters.assignedTo && incident.assignedTo !== filters.assignedTo) return false;
    if (filters.search && !incident.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !incident.description.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-100 flex items-center">
          <AlertTriangle className="h-8 w-8 mr-3 text-amber-400" />
          Incident Management
        </h1>
        <div className="text-sm text-gray-400">
          {filteredIncidents.length} of {incidents.length} incidents
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 text-gray-400 mr-2" />
          <h2 className="text-lg font-semibold text-gray-100">Filters</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <input
            type="text"
            placeholder="Search incidents..."
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          />
          
          <select
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={filters.status}
            onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
          >
            <option value="">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>
          
          <select
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={filters.severity}
            onChange={(e) => onFiltersChange({ ...filters, severity: e.target.value })}
          >
            <option value="">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
          
          <select
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={filters.category}
            onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
          >
            <option value="">All Categories</option>
            <option value="SECURITY">Security</option>
            <option value="ANIMAL">Animal</option>
            <option value="SYSTEM">System</option>
            <option value="WEATHER">Weather</option>
            <option value="MEDICAL">Medical</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
      </div>

      {/* Incident List */}
      <div className="space-y-4">
        {filteredIncidents.map((incident) => (
          <div
            key={incident.id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:bg-gray-750 transition-colors cursor-pointer"
            onClick={() => onIncidentSelect(incident)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-100 mb-2">{incident.title}</h3>
                <p className="text-gray-300 mb-3">{incident.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {incident.location}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {incident.assignedTo}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(incident.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(incident.severity)}`}>
                  {incident.severity}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(incident.status)}`}>
                  {incident.status.replace('_', ' ')}
                </span>
                <span className="text-xs text-gray-500">
                  Emergency Level {incident.emergencyLevel}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {filteredIncidents.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No incidents found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentList;