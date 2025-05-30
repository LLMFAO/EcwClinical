import { 
  Send, 
  Printer, 
  ReceiptText, 
  Circle, 
  Lock, 
  FileText, 
  Mail, 
  PenTool, 
  Paperclip,
  Shield,
  Bell,
  ChevronUp,
  Triangle
} from "lucide-react";

interface MedicalBottomMenuProps {
  onMenuAction: (action: string) => void;
}

export function MedicalBottomMenu({ onMenuAction }: MedicalBottomMenuProps) {
  const menuItems = [
    { id: 'send', label: 'Send' },
    { id: 'print', label: 'Print' },
    { id: 'fax', label: 'Fax' },
    { id: 'record', label: 'Record' },
    { id: 'lock', label: 'Lock' },
    { id: 'details', label: 'Details' },
    { id: 'templates', label: 'Templates' },
    { id: 'claim', label: 'Claim' },
    { id: 'letters', label: 'Letters' },
    { id: 'ink', label: 'Ink' },
    { id: 'attachments', label: 'Attachments' },
  ];

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="bg-gray-100 border-t border-gray-300 px-2 py-1 flex items-center justify-between text-xs fixed bottom-0 left-0 right-0 z-50">
      <div className="flex items-center space-x-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className="text-black hover:bg-gray-200 px-2 py-1 text-xs border border-gray-300 bg-white flex items-center rounded-sm"
            onClick={() => onMenuAction(item.id)}
            style={{ 
              padding: '2px 6px',
              margin: '0 1px'
            }}
          >
            {item.label}
            <Triangle className="w-2 h-2 text-black ml-1 fill-current" style={{ transform: 'rotate(0deg)' }} />
          </button>
        ))}
      </div>
      
      <div className="flex items-center space-x-2 text-gray-600">
        <span>PN last refreshed: {currentTime} PDT</span>
        <ChevronUp className="w-4 h-4 text-black fill-current" style={{ color: 'black' }} />
        <Bell className="w-4 h-4 text-orange-400" />
      </div>
    </div>
  );
}
