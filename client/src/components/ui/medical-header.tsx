import { Menu, User, RotateCcw } from "lucide-react";

export function MedicalHeader() {
  return (
    <header className="medical-header-gradient h-12 flex items-center px-4 text-white">
      {/* Hamburger Menu */}
      <div 
        className="flex items-center justify-center px-3 py-2 rounded-sm cursor-pointer"
        style={{ backgroundColor: 'hsl(var(--header-primary))' }}
      >
        <Menu className="w-4 h-4 text-white" />
      </div>
      
      {/* User Circle */}
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center ml-3 text-xs font-bold"
        style={{ 
          backgroundColor: 'hsl(var(--user-circle-bg))', 
          color: 'hsl(var(--user-circle-text))' 
        }}
      >
        DS
      </div>
      
      {/* eClinicalWorks Logo */}
      <div className="text-white font-semibold text-sm ml-3">
        eClinicalWorks
      </div>
      
      {/* Patient Lookup */}
      <div 
        className="flex items-center justify-center px-3 py-1 rounded-sm ml-4 cursor-pointer"
        style={{ backgroundColor: 'hsl(var(--patient-lookup-bg))' }}
      >
        <User 
          className="w-4 h-4" 
          style={{ color: 'hsl(var(--patient-lookup-icon))' }}
        />
      </div>
      
      {/* Status Circles */}
      <div className="flex items-center space-x-2 ml-4">
        <div className="status-circle"></div>
        <div className="status-circle"></div>
      </div>
      
      {/* Right Aligned Controls */}
      <div className="ml-auto flex items-center space-x-2">
        <button className="jelly-button">
          <RotateCcw className="w-3 h-3" />
        </button>
        <button className="jelly-button">P₂</button>
        <button className="jelly-button">N₀</button>
      </div>
    </header>
  );
}
