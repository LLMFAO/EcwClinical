import { useEffect, useRef } from "react";

interface MedicalContentProps {
  content: string;
  onContentChange: (content: string) => void;
  patientInfo: {
    name: string;
    dob: string;
    gender: string;
    accNo: string;
  };
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

export function MedicalContent({ content, onContentChange, patientInfo }: MedicalContentProps) {
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

  return (
    <div className="flex-1 p-4">
      {/* Patient Info Header */}
      <div className="bg-blue-100 px-4 py-2 text-sm mb-4 rounded">
        <span className="text-blue-800 font-medium">{patientInfo.name}</span>
        <span className="text-gray-600 ml-4">{patientInfo.dob} ({patientInfo.gender})</span>
        <span className="text-gray-600 ml-4">Acc. No. {patientInfo.accNo}</span>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded border border-gray-200">
        <textarea
          ref={textareaRef}
          className="medical-textarea w-full p-4 border-none outline-none focus:ring-2 focus:ring-blue-500 rounded"
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
