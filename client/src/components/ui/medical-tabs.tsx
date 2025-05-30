import { ClipboardList, Mic, List, ChevronDown, Users, Download } from "lucide-react";

interface MedicalTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPopulateData?: () => void;
}

export function MedicalTabs({ activeTab, onTabChange, searchQuery, onSearchChange, onPopulateData }: MedicalTabsProps) {
  const tabs = [
    { id: 'progress_note', label: 'Progress Note', icon: ClipboardList },
    { id: 'scribe', label: 'Scribe', icon: Mic },
    { id: 'orders', label: 'Orders', icon: List },
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-0 flex items-start justify-between">
      {/* Tab Navigation */}
      <div className="flex items-start">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <div key={tab.id} className="flex">
              <div
                className={`px-4 py-2 text-sm font-medium cursor-pointer flex items-center ${
                  index > 0 ? 'border-l border-gray-300' : ''
                }`}
                style={{
                  backgroundColor: isActive 
                    ? 'hsl(var(--tab-active-bg))' 
                    : 'hsl(var(--tab-inactive-bg))',
                  color: isActive 
                    ? 'hsl(var(--tab-active-text))' 
                    : 'hsl(var(--tab-inactive-text))',
                }}
                onClick={() => onTabChange(tab.id)}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Quick Order Search with Populate Button */}
      <div className="flex items-start space-x-2">
        {/* Populate Data Button */}
        {activeTab === 'progress_note' && onPopulateData && (
          <button
            onClick={onPopulateData}
            className="px-2 py-1 text-gray-600 hover:text-gray-800 border border-gray-300 rounded"
            title="Populate with current data"
          >
            <Download className="w-4 h-4" />
          </button>
        )}
        
        <input
          type="text"
          placeholder="Quick Order Search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border border-gray-300 px-3 py-1 text-sm rounded w-48 focus:outline-none focus:border-blue-400"
        />
      </div>
    </div>
  );
}
