import { Menu, User, RotateCcw, Search, ChevronDown } from "lucide-react";
import searchUserIcon from "@assets/search-user.png";

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
      <div className="text-white font-light text-2xl ml-3 italic">cClinicalWorks</div>
      {/* Patient Lookup */}
      <div className="flex items-center ml-4 rounded-sm overflow-hidden scale-[0.8]" style={{ backgroundColor: 'hsl(var(--patient-lookup-bg))' }}>
        <div 
          className="flex items-center justify-center px-3 py-1 cursor-pointer"
        >
          <img 
            src={searchUserIcon}
            alt="Patient Search"
            className="w-6 h-6 filter brightness-0"
            style={{ filter: 'brightness(0) saturate(100%) invert(14%) sepia(14%) saturate(1076%) hue-rotate(183deg) brightness(95%) contrast(96%)' }}
          />
        </div>
        <div 
          className="flex items-center justify-center w-4 h-8 cursor-pointer"
          style={{ borderLeft: '1px solid rgba(255,255,255,0.2)' }}
        >
          <ChevronDown 
            className="w-3 h-3" 
            style={{ filter: 'brightness(0) saturate(100%) invert(14%) sepia(14%) saturate(1076%) hue-rotate(183deg) brightness(95%) contrast(96%)' }}
          />
        </div>
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
        <div className="flex items-center space-x-1">
          <span className="text-white text-xs font-bold">P</span>
          <button className="jelly-button">2</button>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-white text-xs font-bold">N</span>
          <button className="jelly-button">0</button>
        </div>
      </div>
    </header>
  );
}
