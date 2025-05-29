import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MedicalHeader } from "@/components/ui/medical-header";
import { MedicalTabs } from "@/components/ui/medical-tabs";
import { MedicalContent } from "@/components/ui/medical-content";
import { MedicalBottomMenu } from "@/components/ui/medical-bottom-menu";
import { apiRequest } from "@/lib/queryClient";
import type { MedicalDocument, ClipboardSync } from "@shared/schema";

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
            <div className="text-gray-600 mb-1">
              <span>{patientInfo.dob}</span>
              <span className="mx-2">|</span>
              <span>(123) 456-7890</span>
            </div>
            <div className="text-gray-600 mb-1">
              <span>test@email.com</span>
            </div>
            <div className="text-gray-700">
              <span className="font-medium">Allergies:</span>
            </div>
          </div>
        </div>
        
        {/* Sticky Notes */}
        <div className="flex space-x-1 mr-12">
          <div className="w-24 h-20 bg-yellow-200 border border-yellow-300 rounded shadow-sm p-1"></div>
          <div className="w-24 h-20 bg-green-200 border border-green-300 rounded shadow-sm p-1"></div>
          <div className="w-24 h-20 bg-blue-200 border border-blue-300 rounded shadow-sm p-1"></div>
          <div className="w-24 h-20 bg-pink-200 border border-pink-300 rounded shadow-sm p-1"></div>
        </div>
      </div>
      <MedicalTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <MedicalContent
        content={content}
        onContentChange={handleContentChange}
        patientInfo={patientInfo}
      />
      <MedicalBottomMenu onMenuAction={handleMenuAction} />
    </div>
  );
}
