"use client";

import { Settings, LogOut, CreditCard, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { useUser, logout } from "@/app/context/UserContext";

export function UserProfileDropdown({ isMobile = false }) {
  const { setTheme, theme } = useTheme();
  const user = useUser();
  if (!user) {
    return;
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (isMobile) {
    return (
      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-smooth">
          <div className="flex items-center space-x-2">
            {theme === "dark" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
            <span className="text-sm">Tema</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="h-8"
          >
            {theme === "dark" ? "Claro" : "Escuro"}
          </Button>
        </div>
        <Separator className="my-2" />
        <Button
          variant="ghost"
          className="w-full justify-start text-sm font-normal text-muted-foreground hover:text-foreground"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Gerenciar Plano
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-sm font-normal text-muted-foreground hover:text-foreground"
        >
          <Settings className="mr-2 h-4 w-4" />
          Configurações
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-sm font-normal text-destructive hover:text-destructive cursor-pointer"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end" forceMount>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/10 text-primary">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
              <Badge variant="secondary" className="text-xs">
                Plano {user.plan}
              </Badge>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm">Tema</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="h-8"
            >
              {theme === "dark" ? "Claro" : "Escuro"}
            </Button>
          </div>
          <Separator />
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-sm font-normal"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Gerenciar Plano
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-sm font-normal"
            >
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </Button>
          </div>
          <Separator />
          <Button
            variant="ghost"
            className="w-full justify-start text-sm font-normal text-destructive hover:text-destructive cursor-pointer"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
