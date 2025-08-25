import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalysisCardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
  color: "success" | "warning" | "info" | "primary";
}

const colorMap = {
  success: "bg-success/10 border-success/20 text-success",
  warning: "bg-warning/10 border-warning/20 text-warning",
  info: "bg-info/10 border-info/20 text-info",
  primary: "bg-primary/10 border-primary/20 text-primary",
};

export function AnalysisCard({
  title,
  content,
  icon,
  color,
}: AnalysisCardProps) {
  return (
    <Card className="group hover:shadow-elevated transition-smooth bg-gradient-card border-border/50 hover:border-primary/20 animate-slide-up">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${colorMap[color]} transition-smooth group-hover:scale-110`}
          >
            {icon}
          </div>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{content}</p>
      </CardContent>
    </Card>
  );
}
