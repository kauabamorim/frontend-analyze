import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles, Send } from "lucide-react";

interface IdeaFormProps {
  onSubmit: (idea: string) => void;
  isLoading: boolean;
}

export function IdeaForm({ onSubmit, isLoading }: IdeaFormProps) {
  const [idea, setIdea] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onSubmit(idea.trim());
    }
  };

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg flex items-center justify-center animate-pulse">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Analisador de Ideias com IA
          </CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Descreva sua ideia de negócio e receba uma análise completa da nossa
          IA
        </CardDescription>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-border/50 hover:border-primary/50 transition-smooth cursor-pointer"
            onClick={() => (window.location.href = "/history")}
          >
            Ver Histórico
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Textarea
              placeholder="Ex: Aplicativo que conecta pequenos produtores rurais com consumidores urbanos..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              className="min-h-[120px] resize-none border-border/50 focus:border-primary/50 bg-background/50 transition-smooth"
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            disabled={!idea.trim() || isLoading}
            className="w-full bg-gradient-primary hover:shadow-glow transition-bounce disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            style={{
              background: "linear-gradient(to right, #3b82f6, #9333ea)",
              color: "white",
            }}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Analisando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Analisar Ideia
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
