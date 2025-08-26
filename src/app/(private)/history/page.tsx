"use client";
import { useEffect, useState } from "react";
import { IdeaHistoryCard } from "../../../components/IdeaHistoryCardProps";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, Download, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import apiInstance from "@/lib/apiInstance";
import { useRouter } from "next/navigation";

type Idea = {
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

const HistoryPage = () => {
  const router = useRouter();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [filterAuthor, setFilterAuthor] = useState("todos");

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const { data: response } = await apiInstance.get("/api/user/history");
        setIdeas(response);
      } catch (error) {
        console.error("Erro ao buscar histórico de ideias:", error);
      }
    };

    fetchIdeas();
  }, []);

  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch =
      idea.idea.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.idea.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "todos" || idea.status === filterStatus;
    const matchesAuthor =
      filterAuthor === "todos" || idea.author === filterAuthor;

    return matchesSearch && matchesStatus && matchesAuthor;
  });

  const handleViewIdea = (id: string) => {
    router.push(`/history/${id}`);
  };

  const stats = {
    total: ideas.length,
    completed: ideas.filter((i) => i.status.toUpperCase() === "COMPLETED")
      .length,
    pending: ideas.filter((i) => i.status.toUpperCase() === "PENDING").length,
    error: ideas.filter((i) => i.status.toUpperCase() === "ERROR").length,
  };

  const uniqueAuthors = [...new Set(ideas.map((idea) => idea.author))];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Histórico de Ideias
              </h1>
              <p className="text-muted-foreground mt-1">
                Visualize e gerencie todas as ideias analisadas
              </p>
            </div>
            <Button className="gap-2 bg-gradient-primary hover:shadow-glow transition-smooth">
              <Download className="w-4 h-4" />
              Exportar Relatório
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-sm text-muted-foreground">Total</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>{" "}
                  <div>
                    <p className="text-2xl font-bold">{stats.completed}</p>
                    <p className="text-sm text-muted-foreground">Concluídas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>{" "}
                  <div>
                    <p className="text-2xl font-bold">{stats.pending}</p>
                    <p className="text-sm text-muted-foreground">Pendentes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[var(--destructive)]"></div>{" "}
                  <div>
                    <p className="text-2xl font-bold">{stats.error}</p>
                    <p className="text-sm text-muted-foreground">Com Erro</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por título ou descrição..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-border/50 focus:border-primary/50"
                    />
                  </div>
                </div>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-[180px] border-border/50">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os status</SelectItem>
                    <SelectItem value="COMPLETED">Concluídas</SelectItem>
                    <SelectItem value="PENDING">Pendentes</SelectItem>
                    <SelectItem value="ERROR">Com erro</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterAuthor} onValueChange={setFilterAuthor}>
                  <SelectTrigger className="w-full sm:w-[180px] border-border/50">
                    <SelectValue placeholder="Autor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os autores</SelectItem>
                    {uniqueAuthors.map((author) => (
                      <SelectItem key={author} value={author}>
                        {author}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Mostrando {filteredIdeas.length} de {ideas.length} ideias
              </p>
              {searchTerm && (
                <Badge variant="secondary" className="gap-1">
                  <Search className="w-3 h-3" />
                  {searchTerm}
                </Badge>
              )}
            </div>

            <div className="grid gap-4">
              {filteredIdeas.length > 0 ? (
                filteredIdeas.map((idea) => (
                  <IdeaHistoryCard
                    key={idea.id}
                    idea={idea}
                    onView={handleViewIdea}
                  />
                ))
              ) : (
                <Card className="bg-gradient-card border-border/50 p-8 text-center">
                  <p className="text-muted-foreground">
                    Nenhuma ideia encontrada com os filtros aplicados.
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
