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

  const currentData = `SUBJECTIVE:
 Chief Complaint:
  Two-week follow-up for left ear infection and right wrist pain after a fall.

HISTORY OF PRESENT ILLNESS:
John York, a 5-year-old male, presents for a two-week follow-up of his left ear infection. His mother reports that he completed the full course of amoxicillin without issues. Within two days of starting the medication, his fever resolved, ear pain subsided, and he returned to his normal self with improved appetite. He finished the last dose a few days ago and has been symptom-free since.

Two days ago, John fell from the monkey bars at the playground, landing on his outstretched right hand. He cried immediately after the fall and has been complaining of right wrist pain since. His mother notes that he's been favoring his left hand and that there's some swelling in the right wrist. She has been administering ibuprofen for pain relief.

REVIEW OF SYSTEMS:
CONSTITUTIONAL: Negative for fever or fussiness.
HEENT: Negative for ear pain, discharge, or other symptoms.
MUSCULOSKELETAL: Positive for right wrist pain and limited use of right hand.
NEUROLOGICAL: Negative for tingling or numbness in fingers.
All other systems reviewed and negative.

PAST MEDICAL HISTORY: 
Recent left acute otitis media (treated with amoxicillin)

MEDICATIONS:
Ibuprofen as needed for wrist pain

ALLERGIES: NKDA

SOCIAL HISTORY:

FAMILY HISTORY:

PHYSICAL EXAMINATION:
GENERAL: Well-appearing male, cooperative during examination.
HEENT:
  Ears:
    Right: External auditory canal clear, tympanic membrane pearly gray with normal light reflex.
    Left: Tympanic membrane no longer erythematous or bulging. Some residual fluid noted behind the eardrum.
MUSCULOSKELETAL:
  Right wrist: Mild swelling noted. Point tenderness over distal radius. Range of motion limited due to pain. No obvious deformity or bruising.
  Fingers: Full range of motion. Capillary refill normal.

ASSESSMENT AND PLAN:
1. Resolved left otitis media:
   - Infection has cleared. Residual fluid behind eardrum is expected to resolve over time.
   - No further treatment needed for the ear at this time.

2. Right wrist fracture:
   - X-ray confirms a small buckle (torus) fracture on the right wrist.
   - Plan:
     a) Referral to Pediatric Orthopedics specialist sent.
     b) Orthopedics will likely replace temporary splint with a short arm cast.
     c) Continue ibuprofen for pain management as needed.
     d) Orthopedics will determine follow-up schedule and treatment duration.

Patient Instructions:
1. Keep temporary splint on until seen by Orthopedics.
2. Continue ibuprofen for pain relief as needed.
3. Await call from Pediatric Orthopedics office for appointment scheduling (expected within 1-2 days).
4. Appointment with Orthopedics should occur within the next 1-2 days.
5. Avoid strenuous activities with the right arm until cleared by Orthopedics.
6. Return to clinic or seek immediate care if wrist pain worsens, or if any new symptoms develop.`;

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
    
    // Find the range of the previous visit summary content
    let summaryStartIndex = -1;
    let summaryEndIndex = -1;
    
    lines.forEach((line, index) => {
      if (line.includes('Previous visit Summary:')) {
        summaryStartIndex = index;
      }
      if (summaryStartIndex !== -1 && summaryEndIndex === -1 && line.includes('SUBJECTIVE:')) {
        summaryEndIndex = index;
      }
    });
    
    return (
      <div className="p-4 min-h-[600px]">
        {lines.map((line, index) => {
          if (line.trim() === '') {
            return <div key={index} className="h-4"></div>;
          }
          
          const isParentSection = !line.startsWith(' ') && line.trim() !== '' && !line.includes('Previous visit Summary:') && (summaryStartIndex === -1 || index < summaryStartIndex || index >= summaryEndIndex);
          const isChildSection = line.startsWith(' ') && !line.startsWith('  ') && line.trim() !== '';
          const isDataContent = line.startsWith('  ') && line.trim() !== '';
          const isPreviousVisitSummary = line.includes('Previous visit Summary:');
          const isPreviousVisitContent = summaryStartIndex !== -1 && index > summaryStartIndex && index < summaryEndIndex && !line.includes('Previous visit Summary:') && line.trim() !== '';
          
          if (isPreviousVisitSummary) {
            return (
              <div 
                key={index} 
                className="text-black font-bold mb-2"
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontWeight: 'bold'
                }}
              >
                {line.trim()}
              </div>
            );
          } else if (isPreviousVisitContent) {
            return (
              <div 
                key={index} 
                className="text-black mb-4"
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontWeight: 'normal',
                  lineHeight: '1.5'
                }}
              >
                {line.trim()}
              </div>
            );
          } else if (isParentSection) {
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