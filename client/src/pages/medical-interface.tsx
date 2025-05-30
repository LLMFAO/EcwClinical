import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MedicalHeader } from "@/components/ui/medical-header";
import { MedicalTabs } from "@/components/ui/medical-tabs";
import { MedicalContent } from "@/components/ui/medical-content";
import { MedicalBottomMenu } from "@/components/ui/medical-bottom-menu";
import { apiRequest } from "@/lib/queryClient";
import type { MedicalDocument, ClipboardSync } from "@shared/schema";
import documentsIcon from "@assets/documents.png";
import dollarIcon from "@assets/dollar-symbol.png";
import penIcon from "@assets/pen.png";
import lockIcon from "@assets/lock.png";
import { Calendar, Phone, Mail } from "lucide-react";

export default function MedicalInterface() {
  const [activeTab, setActiveTab] = useState('progress_note');
  const [searchQuery, setSearchQuery] = useState('');
  const [content, setContent] = useState('');
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random()}`);
  
  const queryClient = useQueryClient();

  // Patient info (would normally come from props or context)
  const patientInfo = {
    name: "TEST, Aayansh",
    dob: "Oct 26, 1990 (33 yo M)",
    gender: "M",
    accNo: "14044"
  };

  // Fetch clipboard sync data
  const { data: clipboardData } = useQuery<ClipboardSync>({
    queryKey: ['/api/clipboard', sessionId],
    enabled: !!sessionId,
  });

  // Update clipboard sync mutation
  const updateClipboardMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await apiRequest('PATCH', `/api/clipboard/${sessionId}`, { content });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/clipboard', sessionId] });
    },
  });

  // Fetch medical documents for patient
  const { data: documents } = useQuery<MedicalDocument[]>({
    queryKey: ['/api/medical-documents', patientInfo.accNo],
  });

  // Create/update medical document mutation
  const saveMedicalDocumentMutation = useMutation({
    mutationFn: async (content: string) => {
      if (documents && documents.length > 0) {
        // Update existing document
        const response = await apiRequest('PATCH', `/api/medical-documents/${documents[0].id}`, { content });
        return response.json();
      } else {
        // Create new document
        const response = await apiRequest('POST', '/api/medical-documents', {
          patientId: patientInfo.accNo,
          documentType: activeTab,
          content,
        });
        return response.json();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/medical-documents', patientInfo.accNo] });
    },
  });

  // Handle content changes
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    
    // Debounced save to clipboard
    const saveTimeout = setTimeout(() => {
      updateClipboardMutation.mutate(newContent);
      saveMedicalDocumentMutation.mutate(newContent);
    }, 1000);

    return () => clearTimeout(saveTimeout);
  };

  // Initialize content from existing document or clipboard
  useEffect(() => {
    if (documents && documents.length > 0) {
      setContent(documents[0].content);
    } else if (clipboardData) {
      setContent(clipboardData.content);
    }
  }, [documents, clipboardData]);

  // Handle menu actions
  const handleMenuAction = (action: string) => {
    console.log(`Medical action: ${action}`);
    
    switch (action) {
      case 'send':
        // Implementation for sending document
        break;
      case 'print':
        window.print();
        break;
      case 'fax':
        // Implementation for faxing
        break;
      case 'record':
        // Implementation for recording
        break;
      case 'lock':
        // Implementation for locking document
        break;
      case 'details':
        // Implementation for showing details
        break;
      case 'templates':
        // Implementation for templates
        break;
      case 'claim':
        // Implementation for claims
        break;
      case 'letters':
        // Implementation for letters
        break;
      case 'ink':
        // Implementation for ink/annotations
        break;
      case 'attachments':
        // Implementation for attachments
        break;
      default:
        console.log(`Unknown action: ${action}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MedicalHeader />
      {/* Patient Info Header */}
      <div className="px-1 py-2 border-b border-gray-200 flex items-center justify-between bg-[#fff]">
        <div className="flex items-center space-x-4">
          {/* Patient Photo */}
          <div className="w-16 h-16 bg-gray-300 rounded border-2 border-gray-400 flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
          </div>
          
          {/* Patient Info */}
          <div className="flex flex-col text-sm">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-blue-800 font-medium">{patientInfo.name}</span>
              <span className="text-gray-600">33 yo</span>
              <span className="text-gray-600">M</span>
              <span className="bg-red-500 text-white px-2 py-0.5 text-xs rounded">INFO</span>
              <span className="bg-red-600 text-white px-2 py-0.5 text-xs rounded">ALLERGY</span>
            </div>
            <div className="text-gray-600 mb-1 flex items-center">
              <Calendar size={12} className="mr-1" />
              <span>{patientInfo.dob}</span>
              <span className="mx-2">|</span>
              <Phone size={12} className="mr-1" />
              <span>(123) 456-7890</span>
            </div>
            <div className="text-gray-600 mb-1 flex items-center">
              <Mail size={12} className="mr-1" />
              <span>test@email.com</span>
            </div>
            <div className="text-gray-700">
              <span className="font-medium">Allergies:</span>
            </div>
          </div>
        </div>
        
        {/* Sticky Notes */}
        <div className="flex space-x-1 mr-12">
          <div className="w-32 h-24 bg-yellow-200 border border-yellow-300 rounded shadow-sm p-1 relative">
            <div className="text-xs text-black">
              <div>Appt(L): 01/29/25</div>
              <div>Appt(N): 06/29/25</div>
            </div>
            <img 
              src={documentsIcon}
              alt=""
              className="absolute bottom-1 right-1 w-10 h-10 object-contain opacity-10"
            />
          </div>
          <div className="w-32 h-24 bg-green-200 border border-green-300 rounded shadow-sm p-1 relative">
            <div className="text-xs text-black">
              <div>Ins: BCBS</div>
              <div>Acct Bal: $22.17</div>
              <div>Gr Bal: $0.00</div>
            </div>
            <img 
              src={dollarIcon}
              alt=""
              className="absolute bottom-1 right-1 w-10 h-10 object-contain opacity-10"
            />
          </div>
          <div className="w-32 h-24 border border-blue-300 rounded shadow-sm p-1 bg-[#d8e5a9] text-[#000] relative">
            <div className="text-xs font-bold text-left">NOTES</div>
            <div className="border-t border-gray-400 mt-1 mb-1"></div>
            <img 
              src={penIcon}
              alt=""
              className="absolute bottom-1 right-1 w-10 h-10 object-contain opacity-10"
            />
          </div>
          <div className="w-32 h-24 border border-pink-300 rounded shadow-sm p-1 bg-[#fbcdcf] relative">
            <div className="text-xs font-bold text-left">SECURE NOTES</div>
            <div className="border-t border-gray-400 mt-1 mb-1"></div>
            <img 
              src={lockIcon}
              alt=""
              className="absolute bottom-1 right-1 w-10 h-10 object-contain opacity-10"
            />
          </div>
        </div>
      </div>
      
      {/* Medical Links Row */}
      <div className="px-4 py-2 flex items-center space-x-6" style={{ backgroundColor: '#1b9ec8', marginBottom: '10px' }}>
        {['Medical Summary', 'CDSS', 'Labs', 'DI', 'Procedures', 'Growth Chart', 'Imm', 'T.Inj', 'Encounters', 'Patient Docs', 'Flowsheets', 'Notes'].map((link, index) => (
          <a
            key={index}
            href="#"
            className="text-white text-sm hover:text-white visited:text-white no-underline"
            style={{ color: 'white' }}
          >
            {link}
          </a>
        ))}
      </div>
      <MedicalContent
        content={content}
        onContentChange={handleContentChange}
        patientInfo={patientInfo}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <MedicalBottomMenu onMenuAction={handleMenuAction} />
    </div>
  );
}
