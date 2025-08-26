"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, History, Users, Menu, X } from "lucide-react";
import { UserProfileDropdown } from "./UserProfileDropdown";
import Link from "next/link";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { to: "/dashboard", label: "Analisar", icon: Brain },
    { to: "/history", label: "Histórico", icon: History },
    { to: "/users", label: "Usuários", icon: Users },
  ];

  return (
    <nav className="border-b border-border/50 bg-gradient-subtle sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Analise
              </h1>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                href={to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-smooth text-muted-foreground hover:text-foreground hover:bg-accent/50`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
            <UserProfileDropdown />
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-2">
              {navItems.map(({ to, label, icon: Icon }) => (
                <a
                  key={to}
                  href={to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-smooth ${
                    window.location.pathname === to
                      ? "bg-primary/20 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </a>
              ))}
            </div>
            <UserProfileDropdown />
          </div>
        )}
      </div>
    </nav>
  );
}
