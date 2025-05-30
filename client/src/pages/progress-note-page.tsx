import { MedicalContent } from "@/components/ui/medical-content";

interface ProgressNotePageProps {
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

export default function ProgressNotePage({ 
  content, 
  onContentChange, 
  patientInfo, 
  activeTab, 
  onTabChange, 
  searchQuery, 
  onSearchChange 
}: ProgressNotePageProps) {
  return (
    <MedicalContent
      content={content}
      onContentChange={onContentChange}
      patientInfo={patientInfo}
      activeTab={activeTab}
      onTabChange={onTabChange}
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
    />
  );
}