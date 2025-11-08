import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface AnalysisRequest {
  imageUrl: string;
  base64Data?: string;
}

interface AnalysisResult {
  estabelecimento: string;
  cnpj: string | null;
  endereco: string | null;
  telefone: string | null;
  valor_total: number;
  data_emissao: string;
  hora_emissao: string | null;
  numero_nota: string | null;
  categoria: string;
  items: Array<{
    quantidade: number;
    descricao: string;
    valor_unitario: number;
    valor_total: number;
  }>;
  insight: string;
}

async function analyzeNotaWithGPT(imageUrl: string): Promise<AnalysisResult> {
  const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
  if (!openaiApiKey) {
    throw new Error("OPENAI_API_KEY not configured");
  }

  const prompt = `Analyze this fiscal note/receipt image and extract the following information in JSON format:
{
  "estabelecimento": "Store/business name",
  "cnpj": "Business tax ID or null",
  "endereco": "Address or null",
  "telefone": "Phone or null",
  "valor_total": total amount as number,
  "data_emissao": "YYYY-MM-DD format",
  "hora_emissao": "HH:MM:SS format or null",
  "numero_nota": "Invoice number or null",
  "categoria": "Category (alimentacao, transporte, casa, compras, saude, educacao, lazer, vestuario, beleza, pets, tecnologia, outros)",
  "items": [
    {
      "quantidade": number,
      "descricao": "Item description",
      "valor_unitario": unit price,
      "valor_total": total price
    }
  ],
  "insight": "A brief financial insight or recommendation based on the purchase"
}

Return ONLY valid JSON, no additional text.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt,
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API error:", error);
      throw new Error(`OpenAI API error: ${error.error?.message || "Unknown error"}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse JSON from GPT response");
    }
    
    const result = JSON.parse(jsonMatch[0]) as AnalysisResult;
    return result;
  } catch (error) {
    console.error("Error analyzing with GPT:", error);
    throw error;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { imageUrl } = (await req.json()) as AnalysisRequest;

    if (!imageUrl) {
      return new Response(
        JSON.stringify({ error: "imageUrl is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const result = await analyzeNotaWithGPT(imageUrl);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Internal server error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
