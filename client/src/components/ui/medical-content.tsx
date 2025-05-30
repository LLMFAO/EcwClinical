import { useEffect, useRef } from "react";
import { ClipboardList, Mic, List } from "lucide-react";

interface MedicalContentProps {
  content: string;
  onContentChange: (content: string) => void;
  patientInfo: {
    name: string;
    dob: string;
    gender: string;
    accNo: string;
  };
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const MEDICAL_TEMPLATE = `Subjective:
Chief Complaint: ▼

HPI: ▼

Current Medication: ▼

Medical History: ▼

Allergies / Intolerance: ▼

Gyn History: ▼

OB History: ▼

Surgical History: ▼

Hospitalization: ▼

Family History: ▼

Social History: ▼

ROS: ▼

Objective:
Vitals: ▼

Past Results: ▼

Examination: ▼

Assessment:
Physical Therapy Assessment: ▼

Assessment: ▼

Plan:
Treatment: ▼

Procedures: ▼

Diagnostic Imaging: ▼

Lab Reports: ▼

Procedure Orders: ▼

Preventative Medicine: ▼

Next Appointment: ▼

Billing Information:`;

export function MedicalContent({ content, onContentChange, patientInfo, activeTab, onTabChange, searchQuery, onSearchChange }: MedicalContentProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle clipboard paste events
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      if (document.activeElement === textareaRef.current) {
        // Let the default paste happen, then sync
        setTimeout(() => {
          if (textareaRef.current) {
            onContentChange(textareaRef.current.value);
          }
        }, 10);
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [onContentChange]);

  // Copy to clipboard functionality
  const copyToClipboard = async () => {
    if (textareaRef.current) {
      try {
        await navigator.clipboard.writeText(textareaRef.current.value);
        console.log('Content copied to clipboard');
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'c' && document.activeElement === textareaRef.current) {
        copyToClipboard();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const displayContent = content || MEDICAL_TEMPLATE;
  const patientHeaderText = `${patientInfo.name}     ${patientInfo.dob} (${patientInfo.gender})    Acc. No. ${patientInfo.accNo}\n\n`;

  const tabs = [
    { id: 'progress_note', label: 'Progress Note', icon: ClipboardList },
    { id: 'scribe', label: 'Scribe', icon: Mic },
    { id: 'orders', label: 'Orders', icon: List },
  ];

  return (
    <div className="flex-1 p-4">
      {/* Content Area */}
      <div className="bg-white rounded border border-gray-200">
        {/* Tabs inside the content area */}
        <div className="border-b border-gray-200 px-4 py-0 flex items-start justify-between">
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
          
          {/* Quick Order Search */}
          <div className="flex items-start">
            <input
              type="text"
              placeholder="Quick Order Search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="border border-gray-300 px-3 py-1 text-sm rounded w-48 focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>
        
        <textarea
          ref={textareaRef}
          className="medical-textarea w-full p-4 border-none outline-none focus:ring-2 focus:ring-blue-500"
          value={patientHeaderText + displayContent}
          onChange={(e) => {
            const fullContent = e.target.value;
            const contentWithoutHeader = fullContent.replace(patientHeaderText, '');
            onContentChange(contentWithoutHeader);
          }}
          placeholder="Clinical documentation will appear here..."
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.6',
          }}
        />
      </div>
    </div>
  );
}
