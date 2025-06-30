import { useState, useEffect } from 'react';
import { Incident, IncidentFormData } from '../types/incident';
import { mockIncidents } from '../data/mockData';

export const useIncidents = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    // Simulate loading from API
    setIncidents(mockIncidents);
  }, []);

  const createIncident = (data: IncidentFormData) => {
    const newIncident: Incident = {
      id: Date.now().toString(),
      ...data,
      status: 'OPEN',
      reportedBy: 'System User',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setIncidents(prev => [newIncident, ...prev]);
    return newIncident;
  };

  const updateIncident = (id: string, data: Partial<IncidentFormData>) => {
    setIncidents(prev => prev.map(incident => 
      incident.id === id 
        ? { ...incident, ...data, updatedAt: new Date() }
        : incident
    ));
  };

  const updateIncidentStatus = (id: string, status: Incident['status']) => {
    setIncidents(prev => prev.map(incident => 
      incident.id === id 
        ? { ...incident, status, updatedAt: new Date() }
        : incident
    ));
  };

  const deleteIncident = (id: string) => {
    setIncidents(prev => prev.filter(incident => incident.id !== id));
  };

  const getIncidentById = (id: string) => {
    return incidents.find(incident => incident.id === id);
  };

  return {
    incidents,
    createIncident,
    updateIncident,
    updateIncidentStatus,
    deleteIncident,
    getIncidentById
  };
};