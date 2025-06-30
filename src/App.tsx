import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import IncidentList from './components/IncidentList';
import IncidentForm from './components/IncidentForm';
import IncidentDetail from './components/IncidentDetail';
import { useIncidents } from './hooks/useIncidents';
import { Incident, FilterOptions, IncidentFormData } from './types/incident';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [editingIncident, setEditingIncident] = useState<Incident | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    status: '',
    severity: '',
    category: '',
    location: '',
    assignedTo: '',
    search: ''
  });

  const {
    incidents,
    createIncident,
    updateIncident,
    updateIncidentStatus,
    deleteIncident
  } = useIncidents();

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    setSelectedIncident(null);
    setEditingIncident(null);
  };

  const handleIncidentSelect = (incident: Incident) => {
    setSelectedIncident(incident);
    setCurrentView('detail');
  };

  const handleIncidentEdit = (incident: Incident) => {
    setEditingIncident(incident);
    setCurrentView('edit');
  };

  const handleIncidentSave = (data: IncidentFormData) => {
    if (editingIncident) {
      updateIncident(editingIncident.id, data);
    } else {
      createIncident(data);
    }
    setEditingIncident(null);
    setCurrentView('incidents');
  };

  const handleIncidentDelete = (id: string) => {
    deleteIncident(id);
    setCurrentView('incidents');
  };

  const handleStatusChange = (id: string, status: Incident['status']) => {
    updateIncidentStatus(id, status);
    // Update selected incident if it's the one being modified
    if (selectedIncident && selectedIncident.id === id) {
      const updatedIncident = incidents.find(i => i.id === id);
      if (updatedIncident) {
        setSelectedIncident({ ...updatedIncident, status });
      }
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard incidents={incidents} />;
      
      case 'incidents':
        return (
          <IncidentList
            incidents={incidents}
            filters={filters}
            onFiltersChange={setFilters}
            onIncidentSelect={handleIncidentSelect}
          />
        );
      
      case 'create':
        return (
          <IncidentForm
            onSave={handleIncidentSave}
            onCancel={() => setCurrentView('incidents')}
          />
        );
      
      case 'edit':
        return (
          <IncidentForm
            incident={editingIncident!}
            onSave={handleIncidentSave}
            onCancel={() => setCurrentView('incidents')}
          />
        );
      
      case 'detail':
        return selectedIncident ? (
          <IncidentDetail
            incident={selectedIncident}
            onBack={() => setCurrentView('incidents')}
            onEdit={handleIncidentEdit}
            onDelete={handleIncidentDelete}
            onStatusChange={handleStatusChange}
          />
        ) : null;
      
      default:
        return <Dashboard incidents={incidents} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navigation currentView={currentView} onViewChange={handleViewChange} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;