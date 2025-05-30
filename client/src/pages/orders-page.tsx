import { useState } from 'react';
import { ChevronDown, Plus, Search, ArrowUpDown } from 'lucide-react';

export default function OrdersPage() {
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  
  const toggleOrderSelection = (id: number) => {
    setSelectedOrders(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const labOrders = [
    { id: 1, description: 'Amylase, Serum', company: 'LabcorpDX Quest Diagnostic...', freq: '', dur: '', date: '', status: 'Order Actions' },
    { id: 2, description: 'Basic Metabolic Panel (8)', company: 'LabcorpDX Quest Diagnostic...', freq: '', dur: '', date: '', status: 'Order Actions' },
    { id: 3, description: 'COMP. METABOLIC PANEL L...', company: 'LabcorpDX Quest Diagnostic...', freq: '', dur: '', date: '', status: 'Order Actions' },
    { id: 4, description: 'Lipase, Serum', company: 'LabcorpDX Quest Diagnostic...', freq: '', dur: '', date: '', status: 'Order Actions' },
    { id: 5, description: 'Urinalysis, Routine', company: 'LabcorpDX Quest Diagnostic...', freq: '', dur: '', date: '', status: 'Order Actions' },
    { id: 6, description: 'Urine Culture,Comprehen...', company: 'LabcorpDX', freq: '', dur: '', date: '', status: 'Order Actions' },
    { id: 7, description: 'CBC WITH DIFFERENTIAL P...', company: 'LabcorpDX Quest Diagnostic...', freq: '', dur: '', date: '', status: 'Order Actions' }
  ];

  const imagingOrders = [
    { id: 8, description: 'CT Abdomen and Pelvis', company: 'DI Company', freq: '', dur: '', date: '', status: 'Order Actions' },
    { id: 9, description: 'Kidneys, Ureters and Bladd...', company: '', freq: '', dur: '', date: '', status: 'Order Actions' },
    { id: 10, description: 'Ultrasound - Abdominal', company: '', freq: '', dur: '', date: '', status: 'Order Actions' },
    { id: 11, description: 'IVP (no tomography)', company: '', freq: '', dur: '', date: '', status: 'Order Actions' }
  ];

  return (
    <div className="flex-1 p-0">
      <div className="bg-white rounded border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Order Set</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>Abdominal Pain (um)</option>
            </select>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Search size={16} />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <span className="text-yellow-500">★</span>
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <span className="text-green-500">📋</span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">Accept</button>
            <button className="border border-gray-300 px-3 py-1 rounded text-sm">Select All</button>
            <button className="border border-gray-300 px-3 py-1 rounded text-sm">Order Selected</button>
          </div>
        </div>

        {/* Labs Section */}
        <div className="p-3">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-sm font-medium text-blue-600">🧪 Labs</span>
            <span className="text-xs text-gray-500">Assigned To</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-xs">
              <option></option>
            </select>
            <div className="flex space-x-1 ml-auto">
              <button className="p-1 hover:bg-gray-100 rounded">
                <Plus size={12} />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <ArrowUpDown size={12} />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <span className="text-xs">Order</span>
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-blue-100">
                <tr>
                  <th className="w-8 p-2 text-left">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="p-2 text-left bg-blue-200">Description</th>
                  <th className="p-2 text-left">Lab Company</th>
                  <th className="p-2 text-left">Freq</th>
                  <th className="p-2 text-left">Dur</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left bg-blue-200">Status</th>
                  <th className="w-8 p-2"></th>
                </tr>
              </thead>
              <tbody>
                {labOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-2">
                      <input 
                        type="checkbox" 
                        className="rounded"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => toggleOrderSelection(order.id)}
                      />
                    </td>
                    <td className="p-2 text-blue-600">{order.description}</td>
                    <td className="p-2">{order.company}</td>
                    <td className="p-2">{order.freq}</td>
                    <td className="p-2">{order.dur}</td>
                    <td className="p-2">{order.date}</td>
                    <td className="p-2 text-blue-600">{order.status}</td>
                    <td className="p-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <ChevronDown size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Diagnostic Imaging Section */}
        <div className="p-3">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-sm font-medium text-blue-600">🔍 Diagnostic Imaging</span>
            <span className="text-xs text-gray-500">Assigned To</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-xs">
              <option></option>
            </select>
            <div className="flex space-x-1 ml-auto">
              <button className="p-1 hover:bg-gray-100 rounded">
                <Plus size={12} />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <ArrowUpDown size={12} />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <span className="text-xs">Order</span>
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-blue-100">
                <tr>
                  <th className="w-8 p-2 text-left">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="p-2 text-left bg-blue-200">Description</th>
                  <th className="p-2 text-left">DI Company</th>
                  <th className="p-2 text-left">Freq</th>
                  <th className="p-2 text-left">Dur</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left bg-blue-200">Status</th>
                  <th className="w-8 p-2"></th>
                </tr>
              </thead>
              <tbody>
                {imagingOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-2">
                      <input 
                        type="checkbox" 
                        className="rounded"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => toggleOrderSelection(order.id)}
                      />
                    </td>
                    <td className="p-2 text-blue-600">{order.description}</td>
                    <td className="p-2">{order.company}</td>
                    <td className="p-2">{order.freq}</td>
                    <td className="p-2">{order.dur}</td>
                    <td className="p-2">{order.date}</td>
                    <td className="p-2 text-blue-600">{order.status}</td>
                    <td className="p-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <ChevronDown size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Procedure Section */}
        <div className="p-3">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-sm font-medium text-blue-600">⚕️ Procedure</span>
            <span className="text-xs text-gray-500">Assigned To</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-xs">
              <option></option>
            </select>
            <div className="flex space-x-1 ml-auto">
              <button className="p-1 hover:bg-gray-100 rounded">
                <Plus size={12} />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <ArrowUpDown size={12} />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <span className="text-xs">Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}