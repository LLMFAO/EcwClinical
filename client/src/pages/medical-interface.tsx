import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MedicalHeader } from "@/components/ui/medical-header";
import { MedicalTabs } from "@/components/ui/medical-tabs";
import { MedicalBottomMenu } from "@/components/ui/medical-bottom-menu";
import { UpToDateSection } from "@/components/ui/uptodate-section";
import ProgressNotePage from "./progress-note-page";
import ScribePage from "./scribe-page";
import OrdersPage from "./orders-page";
import { apiRequest } from "@/lib/queryClient";
import type { MedicalDocument, ClipboardSync } from "@shared/schema";
import documentsIcon from "@assets/documents.png";
import dollarIcon from "@assets/dollar-symbol.png";
import penIcon from "@assets/pen.png";
import lockIcon from "@assets/lock.png";
import { Calendar, Phone, Mail, ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";

export default function MedicalInterface() {
  const [activeTab, setActiveTab] = useState('progress_note');
  const [searchQuery, setSearchQuery] = useState('');
  const [content, setContent] = useState(`SUBJECTIVE
 Chief Complaint
 HPI
 Current Medication
 Medical History
 Allergies / Intolerance
 Gyn History
 OB History
 Surgical History
 Hospitalization
 Family History
 Social History
 ROS

OBJECTIVE
 Vitals
 Past Results
 Examination

ASSESSMENT
 Physical Therapy Assessment
 Assessment

PLAN
 Treatment
 Procedures
 Diagnostic Imaging
 Lab Reports
 Procedure Orders
 Preventative Medicine
 Next Appointment`);
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
      <div className="px-4 py-2 flex items-center space-x-6 font-bold" style={{ backgroundColor: '#1b9ec8', marginBottom: '10px' }}>
        {['Medical Summary', 'CDSS', 'Labs', 'DI', 'Procedures', 'Growth Chart', 'Imm', 'T.Inj', 'Encounters', 'Patient Docs', 'Flowsheets', 'Notes'].map((link, index) => (
          <a
            key={index}
            href="#"
            className="text-white text-sm hover:text-white visited:text-white no-underline flex items-center"
            style={{ color: 'white' }}
          >
            {link}
            {(link === 'Patient Docs' || link === 'Flowsheets') && (
              <ChevronDown size={12} className="ml-1 text-white" />
            )}
          </a>
        ))}
      </div>
      {/* Tabs and UpToDate Header Row */}
      <div className="flex">
        {/* Left Tabs Section - 3/4 width */}
        <div className="w-3/4">
          <MedicalTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onPopulateData={() => {
              setContent(`SUBJECTIVE
 Chief Complaint
  Diarrhea and vomiting
 HPI
  The patient is a 33-year-old male who presents with a 3-day history of watery diarrhea and vomiting. The diarrhea started 3 days ago and has been occurring 6-8 times per day. The stools are watery, non-bloody, and large volume. He also reports nausea and vomiting that started 2 days ago, occurring 3-4 times per day. He denies fever, chills, abdominal pain, or recent travel. He has not taken any medications for his symptoms.
 Current Medication
  1. Lisinopril 10mg daily
  2. Metformin 1000mg twice daily
 Medical History
  Hypertension, diagnosed 2019
  Type 2 diabetes mellitus, diagnosed 2020
 Allergies / Intolerance
  NKDA
 Gyn History
 OB History
 Surgical History
 Hospitalization
 Family History
  Father: Type 2 diabetes, hypertension
  Mother: Breast cancer (age 45)
 Social History
  Tobacco: Never smoker
  Alcohol: Social drinker, 2-3 drinks per week
  Illicit drugs: Denies
 ROS
  Constitutional: Denies fever, chills, or weight loss
  GI: As per HPI. Denies abdominal pain, blood in stool, or melena
  GU: Denies dysuria or hematuria

OBJECTIVE
 Vitals
  T 98.6°F, BP 142/88, HR 95, RR 18, SpO2 98% RA
 Past Results
 Examination
  General: Alert, oriented, appears mildly dehydrated
  HEENT: Mucous membranes slightly dry, no scleral icterus
  Neck: No lymphadenopathy, no thyromegaly
  Cardiovascular: Regular rate and rhythm, no murmurs
  Pulmonary: Clear to auscultation bilaterally
  Abdomen: Soft, non-tender, non-distended, normal bowel sounds
  Extremities: No edema, good capillary refill
  Neurological: Alert and oriented x3, grossly normal

ASSESSMENT
 Physical Therapy Assessment
 Assessment
  1. Acute gastroenteritis - likely viral
  2. Hypertension - stable
  3. Type 2 diabetes mellitus - stable

PLAN
 Treatment
  - Symptomatic treatment with oral rehydration
  - BRAT diet when tolerated
  - Return if symptoms worsen
  - Continue current medications
  - Monitor BP
  - Continue metformin
  - Monitor blood glucose during illness
 Procedures
 Diagnostic Imaging
 Lab Reports
 Procedure Orders
 Preventative Medicine
 Next Appointment`);
            }}
            onResetData={() => {
              setContent(`SUBJECTIVE
 Chief Complaint
 HPI
 Current Medication
 Medical History
 Allergies / Intolerance
 Gyn History
 OB History
 Surgical History
 Hospitalization
 Family History
 Social History
 ROS

OBJECTIVE
 Vitals
 Past Results
 Examination

ASSESSMENT
 Physical Therapy Assessment
 Assessment

PLAN
 Treatment
 Procedures
 Diagnostic Imaging
 Lab Reports
 Procedure Orders
 Preventative Medicine
 Next Appointment`);
            }}
          />
        </div>
        
        {/* Right UpToDate Header - 1/4 width */}
        <div className="w-1/4">
          <div className="text-white p-2 flex items-center justify-between border-b border-gray-200 bg-[#1c7fa5]">
            <h2 className="text-lg font-semibold italic">UpdateData</h2>
            <div className="flex space-x-1">
              <button className="p-1 hover:bg-teal-700 rounded">
                <ChevronLeft size={16} />
              </button>
              <button className="p-1 hover:bg-teal-700 rounded">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Left Content Area - 3/4 width */}
        <div className="w-3/4">
          {activeTab === 'progress_note' && (
            <ProgressNotePage
              content={content}
              onContentChange={handleContentChange}
              patientInfo={patientInfo}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          )}
          {activeTab === 'scribe' && <ScribePage />}
          {activeTab === 'orders' && <OrdersPage />}
        </div>
        
        {/* Right Sidebar - UpToDate Content - 1/4 width */}
        <div className="w-1/4 bg-white border-l border-gray-200 flex flex-col">
          {/* Search Bar */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="aspirin"
                className="w-full pl-3 pr-8 py-2 border border-gray-300 rounded text-sm"
                defaultValue="aspirin"
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
            <div className="text-orange-700">Oct 26, 1990 (33 yo M) | Acc No. 5022153</div>
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
      </div>
      <MedicalBottomMenu onMenuAction={handleMenuAction} />
    </div>
  );
}
