import { Incident } from '../types/incident';

export const mockIncidents: Incident[] = [
  {
    id: '1',
    title: 'Velociraptor Fence Breach - Sector 7',
    description: 'Primary containment fence in Sector 7 has been compromised. Three velociraptors have escaped their enclosure.',
    severity: 'CRITICAL',
    status: 'IN_PROGRESS',
    location: 'Sector 7 - Velociraptor Paddock',
    assignedTo: 'Robert Muldoon',
    reportedBy: 'Security Team Alpha',
    createdAt: new Date('2024-01-15T08:30:00'),
    updatedAt: new Date('2024-01-15T09:15:00'),
    category: 'ANIMAL',
    emergencyLevel: 5
  },
  {
    id: '2',
    title: 'Main Power Grid Failure',
    description: 'Complete power outage affecting visitor areas and secondary containment systems.',
    severity: 'CRITICAL',
    status: 'OPEN',
    location: 'Main Power Station',
    assignedTo: 'Ray Arnold',
    reportedBy: 'System Monitor',
    createdAt: new Date('2024-01-15T07:45:00'),
    updatedAt: new Date('2024-01-15T07:45:00'),
    category: 'SYSTEM',
    emergencyLevel: 5
  },
  {
    id: '3',
    title: 'T-Rex Paddock Surveillance Down',
    description: 'Camera system in T-Rex paddock has malfunctioned. Visual confirmation of asset required.',
    severity: 'HIGH',
    status: 'OPEN',
    location: 'T-Rex Paddock',
    assignedTo: 'Dr. Roberta Satler',
    reportedBy: 'Control Room',
    createdAt: new Date('2024-01-15T06:20:00'),
    updatedAt: new Date('2024-01-15T06:20:00'),
    category: 'SYSTEM',
    emergencyLevel: 4
  },
  {
    id: '4',
    title: 'Visitor Injury - Triceratops Encounter',
    description: 'Tourist sustained minor injuries during triceratops feeding demonstration.',
    severity: 'MEDIUM',
    status: 'RESOLVED',
    location: 'Herbivore Valley',
    assignedTo: 'Dr. Ellie Sattler',
    reportedBy: 'Tour Guide',
    createdAt: new Date('2024-01-14T14:30:00'),
    updatedAt: new Date('2024-01-14T16:45:00'),
    category: 'MEDICAL',
    emergencyLevel: 2
  },
  {
    id: '5',
    title: 'Storm Warning - Approaching Weather System',
    description: 'Tropical storm system approaching island. Visitor evacuation protocols may be required.',
    severity: 'HIGH',
    status: 'IN_PROGRESS',
    location: 'Island-wide',
    assignedTo: 'John Hammond',
    reportedBy: 'Weather Station',
    createdAt: new Date('2024-01-15T05:00:00'),
    updatedAt: new Date('2024-01-15T08:00:00'),
    category: 'WEATHER',
    emergencyLevel: 3
  },
  {
    id: '6',
    title: 'Dilophosaurus Feeding Schedule Disruption',
    description: 'Automated feeding system malfunction in Dilophosaurus habitat.',
    severity: 'LOW',
    status: 'CLOSED',
    location: 'Sector 4 - Dilophosaurus Habitat',
    assignedTo: 'Maintenance Team',
    reportedBy: 'Automated System',
    createdAt: new Date('2024-01-13T11:15:00'),
    updatedAt: new Date('2024-01-13T15:30:00'),
    category: 'SYSTEM',
    emergencyLevel: 1
  }
];

export const locations = [
  'Sector 7 - Velociraptor Paddock',
  'Main Power Station',
  'T-Rex Paddock',
  'Herbivore Valley',
  'Island-wide',
  'Sector 4 - Dilophosaurus Habitat',
  'Control Room',
  'Visitor Center',
  'Brachiosaur Lagoon',
  'Gallimimus Plains'
];

export const staffMembers = [
  'Robert Muldoon',
  'Ray Arnold',
  'Dr. Roberta Satler',
  'Dr. Ellie Sattler',
  'John Hammond',
  'Dr. Alan Grant',
  'Dr. Ian Malcolm',
  'Maintenance Team',
  'Security Team Alpha',
  'Security Team Beta'
];