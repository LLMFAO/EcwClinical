import { useState } from 'react';
import { Search } from 'lucide-react';
import gemIcon from "@assets/gem.png";

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
  onContentChange 
}: ProgressNotePageProps) {
  const [isDragging, setIsDragging] = useState(false);

  const templateStructure = `SUBJECTIVE:
 Chief Complaint:
 HPI:
 Current Medication:
 Medical History:
 Allergies / Intolerance:
 Gyn History:
 OB History:
 Surgical History:
 Hospitalization:
 Family History:
 Social History:
 ROS:

OBJECTIVE:
 Vitals:
 Past Results:
 Examination:

ASSESSMENT:
 Physical Therapy Assessment:
 Assessment:

PLAN:
 Treatment:
 Procedures:
 Diagnostic Imaging:
 Lab Reports:
 Procedure Orders:
 Preventative Medicine:
 Next Appointment:`;

  const currentData = `CHIEF COMPLAINT: Diarrhea and vomiting

HISTORY OF PRESENT ILLNESS:
The patient is a 33-year-old male who presents with a 3-day history of watery diarrhea and vomiting. The diarrhea started 3 days ago and has been occurring 6-8 times per day. The stools are watery, non-bloody, and large volume. He also reports nausea and vomiting that started 2 days ago, occurring 3-4 times per day. He denies fever, chills, abdominal pain, or recent travel. He has not taken any medications for his symptoms.

REVIEW OF SYSTEMS:
Constitutional: Denies fever, chills, or weight loss
GI: As per HPI. Denies abdominal pain, blood in stool, or melena
GU: Denies dysuria or hematuria

PAST MEDICAL HISTORY: 
Hypertension, diagnosed 2019
Type 2 diabetes mellitus, diagnosed 2020

MEDICATIONS:
1. Lisinopril 10mg daily
2. Metformin 1000mg twice daily

ALLERGIES: NKDA

SOCIAL HISTORY:
Tobacco: Never smoker
Alcohol: Social drinker, 2-3 drinks per week
Illicit drugs: Denies

FAMILY HISTORY:
Father: Type 2 diabetes, hypertension
Mother: Breast cancer (age 45)

PHYSICAL EXAMINATION:
Vital Signs: T 98.6°F, BP 142/88, HR 95, RR 18, SpO2 98% RA
General: Alert, oriented, appears mildly dehydrated
HEENT: Mucous membranes slightly dry, no scleral icterus
Neck: No lymphadenopathy, no thyromegaly
Cardiovascular: Regular rate and rhythm, no murmurs
Pulmonary: Clear to auscultation bilaterally
Abdomen: Soft, non-tender, non-distended, normal bowel sounds
Extremities: No edema, good capillary refill
Neurological: Alert and oriented x3, grossly normal

ASSESSMENT AND PLAN:
1. Acute gastroenteritis - likely viral
   - Symptomatic treatment with oral rehydration
   - BRAT diet when tolerated
   - Return if symptoms worsen

2. Hypertension - stable
   - Continue current medications
   - Monitor BP

3. Type 2 diabetes mellitus - stable
   - Continue metformin
   - Monitor blood glucose during illness`;

  const populateWithCurrentData = () => {
    onContentChange(currentData);
  };

  const sectionsWithGems = [
    'Chief Complaint:',
    'HPI:',
    'Current Medication:',
    'Allergies / Intolerance:',
    'ROS:',
    'Examination:',
    'Procedures:',
    'Next Appointment:'
  ];

  const shouldShowGem = (text: string) => {
    return sectionsWithGems.includes(text.trim());
  };

  const renderFormattedContent = () => {
    if (!content || content === templateStructure) {
      // Show template with proper formatting
      const lines = templateStructure.split('\n');
      return (
        <div className="p-4 min-h-[600px]">
          {lines.map((line, index) => {
            if (line.trim() === '') {
              return <div key={index} className="h-4"></div>;
            }
            
            const isParentSection = !line.startsWith(' ') && line.trim() !== '';
            
            return (
              <div 
                key={index} 
                className={`${isParentSection ? 'text-black font-black' : 'text-[#d46c23] font-black ml-4 flex items-center'}`}
                style={{
                  fontFamily: 'Arial Black, Arial, sans-serif',
                  fontWeight: 900,
                  WebkitFontSmoothing: 'none',
                  MozOsxFontSmoothing: 'unset'
                }}
              >
                {line.trim()}
                {!isParentSection && shouldShowGem(line.trim()) && (
                  <img 
                    src={gemIcon} 
                    alt="gem" 
                    className="ml-2"
                    style={{ width: '15px', height: '15px' }}
                  />
                )}
              </div>
            );
          })}
        </div>
      );
    }

    // Show populated content with mixed formatting
    const lines = content.split('\n');
    return (
      <div className="p-4 min-h-[600px]">
        {lines.map((line, index) => {
          if (line.trim() === '') {
            return <div key={index} className="h-4"></div>;
          }
          
          const isParentSection = !line.startsWith(' ') && line.trim() !== '';
          const isChildSection = line.startsWith(' ') && !line.startsWith('  ') && line.trim() !== '';
          const isDataContent = line.startsWith('  ') && line.trim() !== '';
          
          if (isParentSection) {
            return (
              <div 
                key={index} 
                className="text-black font-black"
                style={{
                  fontFamily: 'Arial Black, Arial, sans-serif',
                  fontWeight: 900,
                  WebkitFontSmoothing: 'none',
                  MozOsxFontSmoothing: 'unset'
                }}
              >
                {line.trim()}
              </div>
            );
          } else if (isChildSection) {
            return (
              <div 
                key={index} 
                className="text-[#d46c23] font-black ml-4 flex items-center"
                style={{
                  fontFamily: 'Arial Black, Arial, sans-serif',
                  fontWeight: 900,
                  WebkitFontSmoothing: 'none',
                  MozOsxFontSmoothing: 'unset'
                }}
              >
                {line.trim()}
                {shouldShowGem(line.trim()) && (
                  <img 
                    src={gemIcon} 
                    alt="gem" 
                    className="ml-2"
                    style={{ width: '15px', height: '15px' }}
                  />
                )}
              </div>
            );
          } else if (isDataContent) {
            return (
              <div 
                key={index} 
                className="text-black ml-8"
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontWeight: 'normal',
                  WebkitFontSmoothing: 'none',
                  MozOsxFontSmoothing: 'unset'
                }}
              >
                {line.trim()}
              </div>
            );
          } else {
            return (
              <div key={index} className="text-black">
                {line}
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="flex-1 p-0">
      <div className="bg-white rounded border border-gray-200">


        {/* Content Editor */}
        <div className="relative">
          <div className="min-h-[600px] relative">
            {renderFormattedContent()}
            
            {/* Drag and drop overlay */}
            {isDragging && (
              <div className="absolute inset-0 bg-blue-50 border-2 border-dashed border-blue-300 flex items-center justify-center">
                <div className="text-blue-600 text-lg font-medium">
                  Drop content here to add to notes
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}