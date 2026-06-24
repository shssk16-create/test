import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    const response = await fetch(process.env.N8N_WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        history,
        modelName: "gemini-1.5-flash",
        metadata: {
          platform: "Salmeen Portfolio",
          version: "7.0"
        }
      }),
    });

    if (!response.ok) throw new Error("n8n Logic Error");

    const data = await response.json();

    // استخراج الرد من حقل 'reply' كما هو محدد في n8n v7
    return NextResponse.json({ 
      text: data.reply || "أهلاً بك.. سالمين يراجع طلبك الآن.",
      model: data.model || "n8n-hybrid"
    });

  } catch (error) {
    console.error("n8n Connection Error:", error);
    return NextResponse.json({ error: "الخدمة غير متوفرة حالياً" }, { status: 500 });
  }
}
