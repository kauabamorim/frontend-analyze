"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";

export function SignUpPage() {
  const form = useForm();

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const { data: response } = await axios.post(
        `${process.env.NEXT_PUBLIC_ANALYZE_API_BASE_URL}/api/user/register`,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        }
      );
      form.reset();
      console.log(response);
      toast(response?.message || "Usuário registrado com sucesso!");
      window.location.href = "/signin";
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      toast("Erro ao registrar usuário.");
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Analise</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Create your account
          </h1>
          <p className="text-gray-600 text-sm">
            Comece hoje e ganhe{" "}
            <span className="font-medium text-blue-600">
              2 consultas grátis
            </span>{" "}
            instantaneamente!
          </p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">Cadastrar-se</CardTitle>
            <CardDescription className="text-center">
              Insira seus dados para criar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Primeiro nome</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    {...form.register("firstName")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Sobrenome</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    {...form.register("lastName")}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...form.register("email")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Crie uma senha forte"
                  {...form.register("password")}
                />
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Criar Conta
              </Button>
            </form>

            <div className="text-center text-sm text-gray-600">
              Ao se cadastrar, você concorda com nossos{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Termos de Serviço
              </Link>{" "}
              e{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Política de Privacidade
              </Link>
            </div>

            <div className="text-center text-sm">
              Já possui uma conta?{" "}
              <Link
                href="/signin"
                className="text-blue-600 hover:underline font-medium"
              >
                Entrar
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
