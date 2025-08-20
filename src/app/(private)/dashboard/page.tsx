interface AnalysisData {
  viability: string;
  marketPotential: string;
  innovation: string;
  challenges: string;
  suggestions: string;
  fullText: string;
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {!analysisData ? (
            <IdeaForm onSubmit={handleAnalyzeIdea} isLoading={isLoading} />
          ) : (
            <AnalysisResults data={analysisData} idea={currentIdea} />
          )}
        </div>
      </main> */}

      {/* <footer className="border-t border-border/50 bg-gradient-subtle mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>Powered by AI • Desenvolvido para acelerar a inovação</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
