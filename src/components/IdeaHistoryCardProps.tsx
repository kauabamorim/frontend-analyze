import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Eye, User } from "lucide-react";

interface IdeaHistoryCardProps {
  idea: {
    id: string;
    createdAt: string;
    author: string;
    status: "COMPLETED" | "PENDING" | "ERROR";
    viability?: string;
    marketPotential?: string;
    innovation?: string;
    challenges?: string;
    suggestions?: string;
    idea: string;
  };
  onView: (id: string) => void;
}

const statusMap = {
  PENDING: {
    label: "Analisando",
    color:
      "bg-[var(--secondary)] text-[var(--secondary-foreground)] border-[var(--border)]",
  },
  COMPLETED: {
    label: "Concluída",
    color: "bg-green-500 text-white-700 ",
  },
  ERROR: {
    label: "Erro",
    color:
      "bg-[var(--destructive)] text-[var(--destructive)] border-[var(--border)]",
  },
};

export function IdeaHistoryCard({ idea, onView }: IdeaHistoryCardProps) {
  const status = statusMap[idea.status];

  return (
    <Card className="group hover:shadow-elevated transition-smooth bg-gradient-card border-border/50 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold mb-2 line-clamp-1">
              {idea.idea}
            </CardTitle>
            {/* <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {idea.description}
            </p> */}
          </div>
          <Badge className={`ml-3 ${status.color}`}>{status.label}</Badge>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{idea.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            <span>{new Date(idea.createdAt).toLocaleDateString("pt-BR")}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          {/* <div className="flex gap-2">
            {idea.tags?.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div> */}

          <Button
            size="sm"
            variant="outline"
            onClick={() => onView(idea.id)}
            className="gap-2 border-border/50 hover:border-primary/50 transition-smooth cursor-pointer"
            disabled={idea.status.toUpperCase() !== "COMPLETED"}
          >
            <Eye className="w-4 h-4" />
            Ver Análise
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
