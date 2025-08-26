import { AnalysisCard } from "./AnalysisCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  TrendingUp,
  Lightbulb,
  AlertTriangle,
  Target,
  FileText,
} from "lucide-react";

interface AnalysisData {
  viability: string;
  marketPotential: string;
  innovation: string;
  challenges: string;
  suggestions: string;
}

interface AnalysisResultsProps {
  data: AnalysisData;
  idea: string;
}

export function AnalysisResults({ data, idea }: AnalysisResultsProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-500" />
            <CardTitle>Ideia Analisada</CardTitle>
            <Badge variant="secondary" className="ml-auto">
              Análise Completa
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground italic leading-relaxed">{idea}</p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnalysisCard
          title="Viabilidade Técnica"
          content={data.viability}
          icon={<CheckCircle className="w-5 h-5 text-green-500" />}
          color="primary"
        />

        <AnalysisCard
          title="Potencial de Mercado"
          content={data.marketPotential}
          icon={<TrendingUp className="w-5 h-5 text-cyan-500" />}
          color="primary"
        />

        <AnalysisCard
          title="Grau de Inovação"
          content={data.innovation}
          icon={<Lightbulb className="w-5 h-5 text-yellow-500" />}
          color="primary"
        />

        <AnalysisCard
          title="Possíveis Desafios"
          content={data.challenges}
          icon={<AlertTriangle className="w-5 h-5 text-red-500" />}
          color="primary"
        />

        <div className="md:col-span-2 lg:col-span-3">
          <AnalysisCard
            title="Sugestões de Melhoria"
            content={data.suggestions}
            icon={<Target className="w-5 h-5 text-purple-500" />}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}
