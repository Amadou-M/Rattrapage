import React from 'react';
import { AlertTriangle, Activity, MapPin, Users, Clock, TrendingUp } from 'lucide-react';
import { Incident } from '../types/incident';

interface DashboardProps {
  incidents: Incident[];
}

const Dashboard: React.FC<DashboardProps> = ({ incidents }) => {
  const criticalIncidents = incidents.filter(i => i.severity === 'CRITICAL').length;
  const openIncidents = incidents.filter(i => i.status === 'OPEN' || i.status === 'IN_PROGRESS').length;
  const resolvedToday = incidents.filter(i => 
    i.status === 'RESOLVED' && 
    new Date(i.updatedAt).toDateString() === new Date().toDateString()
  ).length;

  const severityStats = {
    CRITICAL: incidents.filter(i => i.severity === 'CRITICAL').length,
    HIGH: incidents.filter(i => i.severity === 'HIGH').length,
    MEDIUM: incidents.filter(i => i.severity === 'MEDIUM').length,
    LOW: incidents.filter(i => i.severity === 'LOW').length,
  };

  const recentIncidents = incidents
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-8 bg-gradient-to-r from-amber-900 to-amber-800 rounded-lg">
        <h1 className="text-4xl font-bold text-amber-100 mb-2">
          Jurassic Park Command Center
        </h1>
        <p className="text-amber-200">Incident Management System</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-red-900 border border-red-700 rounded-lg p-6 text-center">
          <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-red-100">{criticalIncidents}</h3>
          <p className="text-red-300 text-sm">Critical Incidents</p>
        </div>
        
        <div className="bg-amber-900 border border-amber-700 rounded-lg p-6 text-center">
          <Activity className="h-8 w-8 text-amber-400 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-amber-100">{openIncidents}</h3>
          <p className="text-amber-300 text-sm">Open Incidents</p>
        </div>
        
        <div className="bg-green-900 border border-green-700 rounded-lg p-6 text-center">
          <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-green-100">{resolvedToday}</h3>
          <p className="text-green-300 text-sm">Resolved Today</p>
        </div>
        
        <div className="bg-blue-900 border border-blue-700 rounded-lg p-6 text-center">
          <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-blue-100">{incidents.length}</h3>
          <p className="text-blue-300 text-sm">Total Incidents</p>
        </div>
      </div>

      {/* Severity Breakdown */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">Severity Distribution</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{severityStats.CRITICAL}</div>
            <div className="text-sm text-gray-400">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">{severityStats.HIGH}</div>
            <div className="text-sm text-gray-400">High</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{severityStats.MEDIUM}</div>
            <div className="text-sm text-gray-400">Medium</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{severityStats.LOW}</div>
            <div className="text-sm text-gray-400">Low</div>
          </div>
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          Recent Incidents
        </h2>
        <div className="space-y-3">
          {recentIncidents.map((incident) => (
            <div key={incident.id} className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-100">{incident.title}</h3>
                <div className="flex items-center text-sm text-gray-400 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {incident.location}
                  <span className="mx-2">•</span>
                  {new Date(incident.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  incident.severity === 'CRITICAL' ? 'bg-red-900 text-red-300' :
                  incident.severity === 'HIGH' ? 'bg-orange-900 text-orange-300' :
                  incident.severity === 'MEDIUM' ? 'bg-yellow-900 text-yellow-300' :
                  'bg-green-900 text-green-300'
                }`}>
                  {incident.severity}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  incident.status === 'OPEN' ? 'bg-red-900 text-red-300' :
                  incident.status === 'IN_PROGRESS' ? 'bg-blue-900 text-blue-300' :
                  incident.status === 'RESOLVED' ? 'bg-green-900 text-green-300' :
                  'bg-gray-900 text-gray-300'
                }`}>
                  {incident.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;