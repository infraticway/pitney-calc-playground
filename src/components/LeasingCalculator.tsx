import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CalculationResults {
  valorOperacao: number;
  valorReciboAluguel: number;
  creditosPisCofins: number;
  valorLiquidoAluguelPisCofins: number;
  reducaoIR: number;
  valorLiquidoAluguel: number;
  investimentoLiquidoTotal: number;
}

export const LeasingCalculator = () => {
  const [valorBem, setValorBem] = useState<string>("50000000");
  const [prazoMeses, setPrazoMeses] = useState<string>("60");
  const [taxaBanco, setTaxaBanco] = useState<string>("2.50");
  const [iof, setIof] = useState<string>("0.00");
  const [despesasExtras, setDespesasExtras] = useState<string>("0");

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const parseValue = (value: string): number => {
    return parseFloat(value.replace(/[^\d.-]/g, '')) || 0;
  };

  const calculateResults = (): CalculationResults => {
    const vb = parseValue(valorBem);
    const prazo = parseValue(prazoMeses);
    const taxa = parseValue(taxaBanco) / 100;
    const iofPercent = parseValue(iof) / 100;
    const despesas = parseValue(despesasExtras);

    // Valor da operação
    const valorOperacao = vb + despesas;

    // Cálculo do valor do recibo de aluguel (PMT)
    const valorReciboAluguel = prazo > 0 && taxa > 0
      ? (valorOperacao * taxa * Math.pow(1 + taxa, prazo)) / (Math.pow(1 + taxa, prazo) - 1)
      : 0;

    // Créditos PIS e COFINS (9.25% sobre o valor do aluguel)
    const creditosPisCofins = valorReciboAluguel * 0.0925;

    // Valor líquido do aluguel após PIS/COFINS
    const valorLiquidoAluguelPisCofins = valorReciboAluguel - creditosPisCofins;

    // Redução do IR (34% sobre o valor líquido)
    const reducaoIR = valorLiquidoAluguelPisCofins * 0.34;

    // Valor líquido do aluguel após IR
    const valorLiquidoAluguel = valorLiquidoAluguelPisCofins - reducaoIR;

    // Investimento líquido total
    const investimentoLiquidoTotal = valorLiquidoAluguel * prazo;

    return {
      valorOperacao,
      valorReciboAluguel,
      creditosPisCofins,
      valorLiquidoAluguelPisCofins,
      reducaoIR,
      valorLiquidoAluguel,
      investimentoLiquidoTotal,
    };
  };

  const results = calculateResults();

  return (
    <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
      {/* Inputs Card */}
      <Card className="shadow-[var(--shadow-card)] border-border/50">
        <CardHeader>
          <CardTitle className="text-primary">Simulador de Leasing</CardTitle>
          <CardDescription>Preencha os dados para calcular sua operação</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="valorBem">Valor do bem</Label>
            <Input
              id="valorBem"
              type="text"
              value={formatCurrency(parseValue(valorBem))}
              onChange={(e) => setValorBem(e.target.value.replace(/[^\d]/g, ''))}
              className="font-semibold"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prazo">Prazo em meses</Label>
            <Input
              id="prazo"
              type="number"
              value={prazoMeses}
              onChange={(e) => setPrazoMeses(e.target.value)}
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxa">Taxa banco (%)</Label>
            <Input
              id="taxa"
              type="number"
              value={taxaBanco}
              onChange={(e) => setTaxaBanco(e.target.value)}
              step="0.01"
              min="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="iof">IOF (%)</Label>
            <Input
              id="iof"
              type="number"
              value={iof}
              onChange={(e) => setIof(e.target.value)}
              step="0.01"
              min="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="despesas">Despesas extras</Label>
            <Input
              id="despesas"
              type="text"
              value={formatCurrency(parseValue(despesasExtras))}
              onChange={(e) => setDespesasExtras(e.target.value.replace(/[^\d]/g, ''))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Results Card */}
      <Card className="shadow-[var(--shadow-card)] border-border/50 bg-gradient-to-br from-card to-muted/30">
        <CardHeader>
          <CardTitle className="text-primary">Resultados</CardTitle>
          <CardDescription>Análise da operação de leasing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-border/50">
            <span className="text-sm text-muted-foreground">Valor da operação</span>
            <span className="font-semibold text-foreground">{formatCurrency(results.valorOperacao)}</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-border/50">
            <span className="text-sm text-muted-foreground">Prazo</span>
            <span className="font-semibold text-foreground">{prazoMeses} meses</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-border/50">
            <span className="text-sm text-muted-foreground">Valor recibo de aluguel</span>
            <span className="font-semibold text-foreground">{formatCurrency(results.valorReciboAluguel)}</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-border/50">
            <span className="text-sm text-muted-foreground">Créditos PIS e COFINS</span>
            <span className="font-semibold text-accent">{formatCurrency(results.creditosPisCofins)}</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-border/50">
            <span className="text-sm text-muted-foreground">Valor líquido aluguel (PIS/COFINS)</span>
            <span className="font-semibold text-foreground">{formatCurrency(results.valorLiquidoAluguelPisCofins)}</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-border/50">
            <span className="text-sm text-muted-foreground">Redução do I.R.</span>
            <span className="font-semibold text-accent">{formatCurrency(results.reducaoIR)}</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-border/50">
            <span className="text-sm text-muted-foreground">Valor líquido do aluguel</span>
            <span className="font-semibold text-primary">{formatCurrency(results.valorLiquidoAluguel)}</span>
          </div>

          <div className="flex justify-between items-center py-4 mt-4 bg-primary/5 rounded-lg px-4 border border-primary/20">
            <span className="font-semibold text-foreground">Investimento Líquido Total</span>
            <span className="font-bold text-lg text-primary">{formatCurrency(results.investimentoLiquidoTotal)}</span>
          </div>

          <p className="text-xs text-muted-foreground italic mt-6 text-center">
            Este cálculo utiliza valores e taxas de mercado apenas como referência, sem validade para propostas comerciais.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
