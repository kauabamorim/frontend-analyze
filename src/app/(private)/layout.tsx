import { ThemeProvider } from "next-themes";
import "../globals.css";
import { Navbar } from "@/components/NavBar";
import { UserProvider } from "../context/UserContext";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <UserProvider>
        <Navbar />
        {children}
      </UserProvider>
    </ThemeProvider>
  );
}
