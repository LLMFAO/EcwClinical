import { useState } from 'react';

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

  const handlePaste = async (e: ClipboardEvent) => {
    const text = e.clipboardData?.getData('text') || '';
    if (text) {
      onContentChange(content + text);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'v') {
      // Paste will be handled by the paste event
      return;
    }
  };

  return (
    <div className="flex-1 p-4">
      <div className="bg-white rounded border border-gray-200">
        {/* Content Editor */}
        <div className="p-4 relative">
          <div className="min-h-[600px] relative">
            <textarea
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              className="w-full h-full min-h-[600px] border-none outline-none resize-none font-mono text-sm leading-relaxed p-4 bg-white"
              placeholder="Enter your medical notes here..."
              style={{
                fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                lineHeight: '1.6',
                border: 'none',
                outline: 'none',
                background: 'transparent'
              }}
            />
            
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