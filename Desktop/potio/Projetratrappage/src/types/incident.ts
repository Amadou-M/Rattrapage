export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  location: string;
  assignedTo: string;
  reportedBy: string;
  createdAt: Date;
  updatedAt: Date;
  category: 'SECURITY' | 'ANIMAL' | 'SYSTEM' | 'WEATHER' | 'MEDICAL' | 'OTHER';
  emergencyLevel: 1 | 2 | 3 | 4 | 5;
}

export interface IncidentFormData {
  title: string;
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  location: string;
  assignedTo: string;
  category: 'SECURITY' | 'ANIMAL' | 'SYSTEM' | 'WEATHER' | 'MEDICAL' | 'OTHER';
  emergencyLevel: 1 | 2 | 3 | 4 | 5;
}

export interface FilterOptions {
  status: string;
  severity: string;
  category: string;
  location: string;
  assignedTo: string;
  search: string;
}