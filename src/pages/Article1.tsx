
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Article1 = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="animated-gradient-background" />
      
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Collaboration UX for the Age of AI
        </h1>
        
        <div className="text-gray-400 mb-8">
          <p>Published: May 10, 2025</p>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-lg leading-relaxed mb-6">
            In the emerging era of AI-powered workplaces, collaboration practices are rapidly evolving. 
            This article explores how user experience design must adapt to facilitate seamless human-AI teamwork.
          </p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4">The New Collaborative Paradigm</h2>
          
          <p className="mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
            laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4">Designing for Human-AI Teams</h2>
          
          <p className="mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
            laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4">Key Principles</h2>
          
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
            <li>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
            <li>Ut enim ad minim veniam, quis nostrud exercitation</li>
            <li>Duis aute irure dolor in reprehenderit in voluptate</li>
          </ul>
          
          <p className="mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
            laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          
          <p className="text-lg font-bold mt-10 mb-2">
            Note: This is placeholder content. The article will be updated with final content.
          </p>
        </div>
      </div>
      
      <footer className="bg-black/80 border-t border-white/10 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} genie/os. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <Link to="/" className="text-gray-400 hover:text-white text-sm mx-3">Home</Link>
              <Link to="/article1" className="text-gray-400 hover:text-white text-sm mx-3">Articles</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Article1;
