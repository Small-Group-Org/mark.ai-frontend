import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [convertedContent, setConvertedContent] = useState<{[key: string]: string}>({});

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-['Inter']">
      {/* Header Section */}
      <header className="w-full px-6 py-4 flex justify-between items-center border-b border-[#1e293b]">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">Convert.md</span>
          <span className="text-[#60a5fa] text-lg">Office to Markdown</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-[#d1d5db] hover:text-white transition">Features</a>
          <a href="#" className="text-[#d1d5db] hover:text-white transition">About</a>
          <a href="#" className="text-[#d1d5db] hover:text-white transition">FAQ</a>
          <Button variant="outline" className="bg-[#1e293b] text-white border-none">
            Sign in
          </Button>
          <Button className="bg-[#2563eb] text-white hover:bg-[#1d4ed8]">
            Sign up
          </Button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-[1200px]">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Convert Office Files to <span className="text-[#60a5fa]">Markdown</span>
          </h1>
          <p className="text-xl text-[#93c5fd] max-w-2xl mx-auto">
            Drag and drop your files to convert them into clean, formatted markdown
          </p>
        </div>

        {/* File Upload Area */}
        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          className="w-full p-8 border-2 border-dashed border-[#1e293b] rounded-xl 
                     bg-[#0f172a]/50 hover:bg-[#1e293b]/20 transition-all
                     cursor-pointer text-center mb-8"
        >
          <div className="max-w-md mx-auto">
            <input
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
              multiple
              accept=".doc,.docx,.pdf,.ppt,.pptx,.xls,.xlsx"
            />
            <label 
              htmlFor="file-upload"
              className="flex flex-col items-center space-y-4 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-[#1e293b] flex items-center justify-center">
                <svg className="w-8 h-8 text-[#60a5fa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium">Drop files here or click to upload</p>
                <p className="text-sm text-[#64748b]">Supports PDF, Word, PowerPoint, and Excel files</p>
              </div>
            </label>
          </div>
        </div>

        {/* File List */}
        {selectedFiles.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Converted Files</h2>
              <Button className="bg-[#2563eb] text-white hover:bg-[#1d4ed8]">
                Download All
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {selectedFiles.map((file, index) => (
                <div 
                  key={index}
                  className="bg-[#1e293b] rounded-lg p-4 hover:bg-[#1e293b]/80 transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium truncate">{file.name}</span>
                    <Button variant="ghost" size="sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                      </svg>
                    </Button>
                  </div>
                  <div className="text-sm text-[#64748b]">
                    {(file.size / 1024).toFixed(1)} KB
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Cosmic Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#1B2735_0%,_#090A0F_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(33,78,194,0.05)_0%,_transparent_70%)]" />
        <div className="absolute top-1/3 right-1/5 w-2/5 h-2/5 bg-[radial-gradient(circle_at_50%_50%,_rgba(156,39,176,0.05)_0%,_transparent_80%)]" />
      </div>

      {/* Footer */}
      <footer className="w-full px-6 py-4 border-t border-[#1e293b] mt-auto">
        <div className="container mx-auto flex justify-between items-center text-sm text-[#64748b]">
          <span>© 2024 Convert.md</span>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}