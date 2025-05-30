import { useState } from 'react';
import { Search } from 'lucide-react';
import gemIcon from "@assets/gem.png";
import additionalIcon from "@assets/image_1748577102898.png";

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

  const currentData = `CHIEF COMPLAINT: Left ankle pain and swelling after fall

HISTORY OF PRESENT ILLNESS:
The patient is a 28-year-old female who presents with acute onset left ankle pain and swelling following a fall while jogging yesterday evening. She reports stepping into a pothole and twisting her ankle inward. She immediately felt sharp pain and was unable to bear weight. She applied ice overnight and took ibuprofen but pain persists. She is concerned the ankle may be broken and is requesting X-rays. She denies numbness, tingling, or color changes in the foot.

REVIEW OF SYSTEMS:
Constitutional: Denies fever, chills, or systemic symptoms
Musculoskeletal: Left ankle pain and swelling as per HPI
Neurological: Denies numbness or tingling in foot

PAST MEDICAL HISTORY: 
None significant

MEDICATIONS:
Ibuprofen 400mg as needed for pain (started yesterday)

ALLERGIES: NKDA

SOCIAL HISTORY:
Tobacco: Never smoker
Alcohol: Occasional social drinking
Exercise: Regular jogger, 3-4 times per week

FAMILY HISTORY:
Non-contributory

PHYSICAL EXAMINATION:
Vital Signs: T 98.4°F, BP 118/72, HR 82, RR 16, SpO2 99% RA
General: Alert, oriented, appears uncomfortable but in no acute distress
Extremities: Left ankle with moderate swelling and ecchymosis over lateral aspect
  - Tenderness to palpation over lateral malleolus and anterior talofibular ligament
  - Range of motion limited by pain
  - Able to bear partial weight with assistance
  - No deformity or crepitus
  - Distal pulses intact, capillary refill <2 seconds
  - Sensation intact to light touch

ASSESSMENT AND PLAN:
1. Left ankle sprain (suspected lateral ligament injury)
   - Ottawa ankle rules do not indicate need for X-ray
   - RICE protocol (Rest, Ice, Compression, Elevation)
   - Elastic bandage wrap for support
   - Weight bearing as tolerated with crutches if needed
   - Follow up in 1 week if not improving

2. Pain management
   - Continue ibuprofen 400mg every 6 hours with food
   - May use acetaminophen for breakthrough pain`;

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
    'Assessment:',
    'Next Appointment:'
  ];

  const sectionsWithAdditionalIcon = [
    'Examination:',
    'Assessment:',
    'Treatment:',
    'Next Appointment:'
  ];

  const shouldShowGem = (text: string) => {
    return sectionsWithGems.includes(text.trim());
  };

  const shouldShowAdditionalIcon = (text: string) => {
    return sectionsWithAdditionalIcon.includes(text.trim());
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
                {!isParentSection && shouldShowAdditionalIcon(line.trim()) && (
                  <img 
                    src={additionalIcon} 
                    alt="additional" 
                    className="ml-1"
                    style={{ width: '25px', height: '25px' }}
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
                {shouldShowAdditionalIcon(line.trim()) && (
                  <img 
                    src={additionalIcon} 
                    alt="additional" 
                    className="ml-1"
                    style={{ width: '25px', height: '25px' }}
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