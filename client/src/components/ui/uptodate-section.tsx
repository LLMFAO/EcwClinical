import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

export function UpToDateSection() {
  return (
    <div className="w-1/4 bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-teal-600 text-white p-2 flex items-center justify-between">
        <h2 className="text-lg font-semibold">UpToDate</h2>
        <div className="flex space-x-1">
          <button className="p-1 hover:bg-teal-700 rounded">
            <ChevronLeft size={16} />
          </button>
          <button className="p-1 hover:bg-teal-700 rounded">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="aspirin"
            className="w-full pl-3 pr-8 py-2 border border-gray-300 rounded text-sm"
            defaultValue=""
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Search size={16} className="text-gray-400" />
          </button>
        </div>
      </div>
      
      {/* Navigation Pills */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex flex-wrap gap-1 text-xs">
          <span className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">Drug Info</span>
          <span className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">DRUG</span>
          <span className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">Interaction</span>
          <span className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">CDSS</span>
          <span className="px-2 py-1 bg-blue-100 border border-blue-300 rounded bg-blue-500 text-white">Order Sets</span>
        </div>
      </div>
      
      {/* Patient Info Banner */}
      <div className="bg-orange-100 border-l-4 border-orange-500 p-2 text-xs">
        <div className="font-bold text-orange-800">FLINTSTONE, Pebbles Mrs.</div>
        <div className="text-orange-700">Jan 11, 1970 (44 yo) F | Acc No. 5022153</div>
      </div>
      
      {/* Content Sections */}
      <div className="flex-1 overflow-y-auto">
        {/* My Favorite Order Sets */}
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm flex items-center">
              <ChevronDown size={14} className="mr-1" />
              My Favorite Order Sets
            </h3>
            <Search size={14} className="text-gray-400" />
          </div>
          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>There are no order sets in your favorites</strong></p>
            <p>You can add order sets to your favorites from Order Set Administration</p>
          </div>
        </div>
        
        {/* Template Order Sets */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm flex items-center">
              <ChevronDown size={14} className="mr-1" />
              Template Order Sets
            </h3>
          </div>
          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>There are no order sets associated with applied template/no qualifying template has been applied to this chart</strong></p>
            <p>You can associate order sets to templates from the template create/update section.</p>
          </div>
        </div>
      </div>
    </div>
  );
}