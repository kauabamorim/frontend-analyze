"use client";
import { AnalysisResults } from "@/components/AnalysisResults";
import { IdeaForm } from "@/components/IdeaForm";
import apiInstance from "@/lib/apiInstance";
import { useState } from "react";
import { toast } from "sonner";

interface AnalysisData {
  viability: string;
  marketPotential: string;
  innovation: string;
  challenges: string;
  suggestions: string;
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [currentIdea, setCurrentIdea] = useState<string>("");

  const handleAnalyzeIdea = async (idea: string) => {
    setIsLoading(true);
    setCurrentIdea(idea);

    try {
      const { data: response } = await apiInstance.post("/api/analyze", {
        idea,
      });

      setAnalysisData(response.mappedAnalysis);
      toast.success("Análise concluída!", {
        description: "Sua ideia foi analisada com sucesso pela nossa IA.",
      });
    } catch (error) {
      toast.error("Ocorreu um erro ao analisar sua ideia. Tente novamente.");
      console.log("Error during idea analysis:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleNewAnalysis = () => {
  //   setAnalysisData(null);
  //   setCurrentIdea("");
  // };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {!analysisData ? (
            <IdeaForm onSubmit={handleAnalyzeIdea} isLoading={isLoading} />
          ) : (
            <AnalysisResults data={analysisData} idea={currentIdea} />
          )}
        </div>
      </main>
    </div>
  );
}
