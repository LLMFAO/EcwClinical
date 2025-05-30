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
  ChevronUp
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
    <div className="bg-gray-100 border-t border-gray-300 px-2 py-1 flex items-center justify-between text-xs">
      <div className="flex items-center">
        {menuItems.map((item, index) => (
          <div key={item.id} className="flex items-center">
            {index > 0 && <span className="text-gray-400 mx-1">|</span>}
            <button
              className="text-black hover:bg-gray-200 px-1 py-0 text-xs border-0 bg-transparent"
              onClick={() => onMenuAction(item.id)}
              style={{ 
                border: 'none',
                background: 'none',
                padding: '1px 4px',
                margin: '0'
              }}
            >
              {item.label}
            </button>
          </div>
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
