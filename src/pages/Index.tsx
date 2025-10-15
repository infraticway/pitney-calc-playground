import { Button } from "@/components/ui/button";
import { LeasingCalculator } from "@/components/LeasingCalculator";
import { Mail, ExternalLink } from "lucide-react";
import logoSerlogistico from "@/assets/logo_serlogistico.png";
import logoPitney from "@/assets/logo_pitney.png";

const Index = () => {
  const handleContactEmail = () => {
    window.location.href = "mailto:pbs@pitneybowes.com.br";
  };

  const handleEquipmentsSite = () => {
    window.open("https://www.pitneybowesbrasil.com.br", "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-8">
              <img 
                src={logoSerlogistico} 
                alt="Serlogístico" 
                className="h-12 md:h-16 object-contain transition-transform hover:scale-105"
              />
              <img 
                src={logoPitney} 
                alt="Pitney Bowes" 
                className="h-10 md:h-14 object-contain transition-transform hover:scale-105"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleContactEmail}
                className="gap-2 shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-card)] transition-all duration-300"
              >
                <Mail className="h-4 w-4" />
                Fale com nossa equipe
              </Button>
              <Button 
                onClick={handleEquipmentsSite}
                variant="secondary"
                className="gap-2 shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-card)] transition-all duration-300"
              >
                <ExternalLink className="h-4 w-4" />
                Equipamentos Pitney
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              Simulador de Leasing de Equipamentos
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Calcule o investimento líquido total da sua operação de leasing de forma rápida e precisa
            </p>
          </div>

          {/* Calculator */}
          <LeasingCalculator />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 py-8 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Serlogístico & Pitney Bowes. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <img 
                src={logoSerlogistico} 
                alt="Serlogístico" 
                className="h-8 object-contain opacity-60 hover:opacity-100 transition-opacity"
              />
              <img 
                src={logoPitney} 
                alt="Pitney Bowes" 
                className="h-7 object-contain opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
