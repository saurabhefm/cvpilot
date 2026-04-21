"use client";

import React, { useState } from "react";
import Hero from "@/components/sections/Hero";
import UploadZone from "@/components/sections/UploadZone";
import FeatureGrid from "@/components/sections/FeatureGrid";
import TailoringModule from "@/components/sections/TailoringModule";
import SummaryModule from "@/components/sections/SummaryModule";
import Pricing from "@/components/sections/Pricing";
import SnippetModal from "@/components/ui/SnippetModal";
import TemplateSelector from "@/components/sections/TemplateSelector";
import StepTracker from "@/components/ui/StepTracker";

const steps = [
  { id: 1, label: "Upload" },
  { id: 2, label: "Template" },
  { id: 3, label: "Tailor" }
];

export default function Home() {
  const [file, setFile] = useState<string | null>(null);
  const [matchScore, setMatchScore] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [modal, setModal] = useState<{ open: boolean; title: string; placeholder: string; action: string }>({
    open: false,
    title: "",
    placeholder: "",
    action: ""
  });

  const openModal = (title: string, placeholder: string, action: string) => {
    setModal({ open: true, title, placeholder, action });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleFileUpload = (name: string) => {
    setFile(name);
    setCurrentStep(2);
    
    // Save to localStorage for the builder
    if (typeof window !== "undefined") {
      const cleanName = name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      const mockProfile = {
        name: "Saurabh Sahu",
        email: "saurabhsahu143@gmail.com",
        phone: "+91 9392495712",
        location: "Pune, India (Remote)",
        jobTitle: "CI/CD & DevOps Engineer",
        summary: "Hands-on DevOps Engineer with a focus on CI/CD automation and pipeline deployment support. Proficient in building automated workflows using Jenkins, Git, and ArgoCD to streamline application delivery in cloud-native environments.",
        experience: [
          { 
            company: "NTT DATA", 
            role: "DevOps Engineer", 
            period: "Feb 2025 - Present",
            bullets: [
              "Pipeline Automation: Implementing and maintaining end-to-end CI/CD processes using Jenkins, ArgoCD & Actions.",
              "Deployment Support: Managing infrastructure and application deployments using CICD tool.",
              "Version Control: Managing source code repositories and branching strategies through Bitbucket, Git, and GitHub."
            ]
          },
          { 
            company: "Previous Tech", 
            role: "Cloud Systems Associate", 
            period: "2022 - 2025",
            bullets: [
               "Spearheaded infrastructure-as-code initiatives using Terraform.",
               "Managed multi-cloud environments for scaling microservices."
            ]
          }
        ],
        education: [
          { school: "Premier Engineering College", degree: "B.Tech Computer Science", year: "2022" }
        ],
        skills: ["Kubernetes", "Docker", "ArgoCD", "Jenkins", "Terraform", "Git", "Bitbucket", "Ansible", "YAML", "Shell Scripting"]
      };
      
      localStorage.setItem("cv_file_name", name);
      localStorage.setItem("cv_full_profile", JSON.stringify(mockProfile));
      localStorage.setItem("cv_user_name", cleanName);
    }

    // Auto-scroll to templates after a short delay for feedback
    setTimeout(() => scrollToSection("templates"), 800);
  };

  const handleTemplateSelect = (id: string) => {
    setSelectedTemplate(id);
    if (typeof window !== "undefined") {
      localStorage.setItem("cv_selected_template", id);
    }
    setCurrentStep(3);
    setTimeout(() => scrollToSection("tailor"), 800);
  };

  const onStepClick = (stepId: number) => {
    const ids = ["upload", "templates", "tailor"];
    scrollToSection(ids[stepId - 1]);
    setCurrentStep(stepId);
  };

  return (
    <>
      <div id="hero">
        <Hero matchScore={matchScore} openModal={openModal} />
      </div>
      
      <div id="upload">
        <UploadZone onFileUpload={handleFileUpload} />
      </div>
      
      <div id="features">
        <FeatureGrid />
      </div>
      
      <div id="templates">
        <TemplateSelector 
          selectedTemplate={selectedTemplate} 
          onSelect={handleTemplateSelect} 
        />
      </div>

      <div id="tailor">
        <TailoringModule 
          hasFile={!!file} 
          onGenerate={(score) => setMatchScore(score)} 
        />
      </div>

      <StepTracker 
        currentStep={currentStep} 
        steps={steps} 
        onStepClick={onStepClick} 
      />
      
      <div id="summary">
        <SummaryModule />
      </div>
      
      <div id="pricing">
        <Pricing />
      </div>

      <SnippetModal 
        isOpen={modal.open}
        onClose={() => setModal({ ...modal, open: false })}
        title={modal.title}
        placeholder={modal.placeholder}
        actionLabel={modal.action}
      />
    </>
  );
}
