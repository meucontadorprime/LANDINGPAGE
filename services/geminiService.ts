import { GoogleGenAI, Type } from "@google/genai";
import { DiagnosticResponse } from "../types.ts";

export const getAccountingDiagnostic = async (painPoints: string): Promise<DiagnosticResponse> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error("ERRO: API_KEY não encontrada no ambiente. Verifique as configurações do Vercel.");
    throw new Error("Configuração de API ausente.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Você é um consultor sênior da "Meu Contador Prime", uma empresa de contabilidade estratégica de elite. 
      Analise o seguinte relato do usuário: "${painPoints}".

      REGRAS DE FILTRAGEM:
      1. Se o relato envolver temas como: empréstimos financeiros, cálculos isolados de rescisão trabalhista, questões puramente jurídicas/advocacia, solicitações de férias, 13º salário ou rotinas de departamento pessoal operacionais que não envolvem gestão contábil estratégica, considere como FORA DE ESCOPO.
      2. Para casos fora de escopo: defina isAccountingRelated como false, retorne score 0 e uma lista de recomendações vazia. No campo "analysis", redija uma mensagem extremamente polida, culta e profissional explicando que a Meu Contador Prime dedica-se exclusivamente à inteligência contábil, planejamento tributário e consultoria de gestão estratégica para empresas, não abrangendo serviços de intermediação financeira, advocacia ou cálculos operacionais isolados de RH.

      Para casos dentro do escopo:
      - Analise as dores com profundidade.
      - isAccountingRelated: true.
      - score: 0 a 100 baseada na gravidade dos problemas.
      - analysis: Análise detalhada.
      - recommendations: 3 a 4 ações estratégicas.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isAccountingRelated: {
              type: Type.BOOLEAN,
              description: "Indica se o assunto pertence ao escopo de contabilidade estratégica."
            },
            score: {
              type: Type.NUMBER,
              description: "Um score de 0 a 100 sobre o nível de urgência/melhoria."
            },
            analysis: {
              type: Type.STRING,
              description: "O diagnóstico ou a mensagem de esclarecimento educada."
            },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Recomendações estratégicas (vazio se for fora de escopo)."
            }
          },
          required: ["isAccountingRelated", "score", "analysis", "recommendations"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Resposta vazia da IA.");

    // Extração robusta de JSON (remove possíveis marcações de markdown ```json ... ```)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? jsonMatch[0] : text;

    return JSON.parse(jsonStr) as DiagnosticResponse;
  } catch (error) {
    console.error("Erro detalhado na chamada da Gemini API:", error);
    throw error;
  }
};