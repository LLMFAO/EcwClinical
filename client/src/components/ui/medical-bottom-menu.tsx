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
  Bell
} from "lucide-react";

interface MedicalBottomMenuProps {
  onMenuAction: (action: string) => void;
}

export function MedicalBottomMenu({ onMenuAction }: MedicalBottomMenuProps) {
  const menuItems = [
    { id: 'send', label: 'Send', icon: Send },
    { id: 'print', label: 'Print', icon: Printer },
    { id: 'fax', label: 'ReceiptText', icon: ReceiptText },
    { id: 'record', label: 'Record', icon: Circle },
    { id: 'lock', label: 'Lock', icon: Lock },
    { id: 'details', label: 'Details' },
    { id: 'templates', label: 'Templates' },
    { id: 'claim', label: 'Claim' },
    { id: 'letters', label: 'Letters', icon: Mail },
    { id: 'ink', label: 'Ink', icon: PenTool },
    { id: 'attachments', label: 'Attachments', icon: Paperclip },
  ];

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="bg-gray-100 border-t border-gray-300 px-4 py-2 flex items-center justify-between text-xs">
      <div className="flex items-center space-x-4">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          
          return (
            <div key={item.id} className="flex items-center">
              {index > 0 && <span className="text-gray-400 mr-4">|</span>}
              <button
                className="text-blue-600 hover:underline flex items-center"
                onClick={() => onMenuAction(item.id)}
              >
                {Icon && <Icon className="w-3 h-3 mr-1" />}
                {item.label}
              </button>
            </div>
          );
        })}
      </div>
      
      <div className="flex items-center space-x-2 text-gray-600">
        <span>PN last refreshed: {currentTime} PDT</span>
        <Shield className="w-4 h-4 text-blue-600" />
        <Bell className="w-4 h-4 text-orange-400" />
      </div>
    </div>
  );
}
