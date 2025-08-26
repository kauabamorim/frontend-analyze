"use client";

import { ArrowLeft } from "lucide-react";
import { AnalysisResults } from "@/components/AnalysisResults";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import apiInstance from "@/lib/apiInstance";

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

export default function ShowIdeaPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string | null>(null);
  const [idea, setIdea] = useState<Idea | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setId(resolved.id);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchIdea = async () => {
      try {
        const { data: response } = await apiInstance.get(`/api/analyze/${id}`);
        setIdea(response);
      } catch (error) {
        console.error("Erro ao buscar histórico de ideias:", error);
      }
    };

    fetchIdea();
  }, [id]);

  if (!idea) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Análise não encontrada
            </h1>
            <p className="text-muted-foreground mb-8">
              A análise solicitada não foi encontrada ou ainda não foi
              processada.
            </p>
            <Link
              href="/history"
              className="inline-flex items-center gap-2 border border-border/50 hover:border-primary/50 transition-smooth px-4 py-2 rounded"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Histórico
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <Link
            href="/history"
            className="inline-flex items-center gap-2 mb-6 border border-border/50 hover:border-primary/50 transition-smooth px-4 py-2 rounded"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Histórico
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-2">
            Resultado da Análise
          </h1>
          <p className="text-muted-foreground">
            Análise detalhada da sua ideia de negócio
          </p>
        </div>

        <AnalysisResults
          data={{
            viability: idea?.viability || "",
            marketPotential: idea?.marketPotential || "",
            innovation: idea?.innovation || "",
            challenges: idea?.challenges || "",
            suggestions: idea?.suggestions || "",
          }}
          idea={idea?.idea}
        />
      </div>
    </div>
  );
}
