import React from 'react';
import { FileText } from 'lucide-react';

export default function ReportPdfTab() {
  return (
    <div className="space-y-6 animate-fadeIn h-[85vh]">
      <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 shadow-xl h-full flex flex-col">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center border-b border-slate-800 pb-4 shrink-0">
          <FileText className="w-6 h-6 mr-3 text-blue-500" />
          Architecture Research Report
        </h2>
        <div className="flex-grow w-full rounded-lg overflow-hidden border border-slate-700 bg-slate-800">
          <iframe
            src="https://drive.google.com/file/d/10Rjgxipc8UfQ5kfsDayc7jXULFq8prfU/preview"
            className="w-full h-full"
            title="Architecture Research Report PDF"
            style={{ border: 'none' }}
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  );
}
