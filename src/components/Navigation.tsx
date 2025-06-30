import React from 'react';
import { Home, FileText, Plus, AlertTriangle } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'incidents', label: 'Incidents', icon: FileText },
    { id: 'create', label: 'New Incident', icon: Plus },
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-8 w-8 text-amber-400" />
            <span className="text-xl font-bold text-amber-400">Jurassic Park</span>
          </div>
          
          <div className="flex space-x-1">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentView === item.id
                      ? 'bg-amber-900 text-amber-100'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="text-sm text-gray-400">
          System Status: <span className="text-green-400">ONLINE</span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;