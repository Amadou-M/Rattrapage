-- Base de données Jurassic Park Incident Tracker
CREATE DATABASE IF NOT EXISTS jurassic_incidents;
USE jurassic_incidents;

-- Table des incidents
CREATE TABLE IF NOT EXISTS incidents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  severity ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL DEFAULT 'MEDIUM',
  status ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED') NOT NULL DEFAULT 'OPEN',
  location VARCHAR(255) NOT NULL,
  assignedTo VARCHAR(255) NOT NULL,
  reportedBy VARCHAR(255) NOT NULL,
  category ENUM('SECURITY', 'ANIMAL', 'SYSTEM', 'WEATHER', 'MEDICAL', 'OTHER') NOT NULL DEFAULT 'OTHER',
  emergencyLevel TINYINT NOT NULL DEFAULT 1 CHECK (emergencyLevel BETWEEN 1 AND 5),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_severity (severity),
  INDEX idx_category (category),
  INDEX idx_created (createdAt)
);

-- Données de test
INSERT INTO incidents (title, description, severity, status, location, assignedTo, reportedBy, category, emergencyLevel) VALUES
('Velociraptor Fence Breach - Sector 7', 'Primary containment fence in Sector 7 has been compromised. Three velociraptors have escaped their enclosure.', 'CRITICAL', 'IN_PROGRESS', 'Sector 7 - Velociraptor Paddock', 'Robert Muldoon', 'Security Team Alpha', 'ANIMAL', 5),
('Main Power Grid Failure', 'Complete power outage affecting visitor areas and secondary containment systems.', 'CRITICAL', 'OPEN', 'Main Power Station', 'Ray Arnold', 'System Monitor', 'SYSTEM', 5),
('T-Rex Paddock Surveillance Down', 'Camera system in T-Rex paddock has malfunctioned. Visual confirmation of asset required.', 'HIGH', 'OPEN', 'T-Rex Paddock', 'Dr. Roberta Satler', 'Control Room', 'SYSTEM', 4),
('Visitor Injury - Triceratops Encounter', 'Tourist sustained minor injuries during triceratops feeding demonstration.', 'MEDIUM', 'RESOLVED', 'Herbivore Valley', 'Dr. Ellie Sattler', 'Tour Guide', 'MEDICAL', 2),
('Storm Warning - Approaching Weather System', 'Tropical storm system approaching island. Visitor evacuation protocols may be required.', 'HIGH', 'IN_PROGRESS', 'Island-wide', 'John Hammond', 'Weather Station', 'WEATHER', 3),
('Dilophosaurus Feeding Schedule Disruption', 'Automated feeding system malfunction in Dilophosaurus habitat.', 'LOW', 'CLOSED', 'Sector 4 - Dilophosaurus Habitat', 'Maintenance Team', 'Automated System', 'SYSTEM', 1);

-- Table des utilisateurs (pour l'authentification)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'security', 'medical', 'maintenance') NOT NULL DEFAULT 'security',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Utilisateurs de test (mot de passe: admin123)
INSERT INTO users (username, password, name, role) VALUES
('admin', '$2b$10$8K1p/a0dRt.uaU0KvuFyOOKUx4LAHPmrg37FlYVEGJ/VMWLADxFNG', 'Administrateur', 'admin'),
('muldoon', '$2b$10$8K1p/a0dRt.uaU0KvuFyOOKUx4LAHPmrg37FlYVEGJ/VMWLADxFNG', 'Robert Muldoon', 'security'),
('arnold', '$2b$10$8K1p/a0dRt.uaU0KvuFyOOKUx4LAHPmrg37FlYVEGJ/VMWLADxFNG', 'Ray Arnold', 'maintenance'),
('sattler', '$2b$10$8K1p/a0dRt.uaU0KvuFyOOKUx4LAHPmrg37FlYVEGJ/VMWLADxFNG', 'Dr. Ellie Sattler', 'medical');