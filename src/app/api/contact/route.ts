import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {

    const incoming = await req.formData();

    const name = (incoming.get("name") ?? "").toString().trim();
    const email = (incoming.get("email") ?? "").toString().trim();
    const message = (incoming.get("message") ?? "").toString().trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Brak wymaganych pól." },
        { status: 400 }
      );
    }

    incoming.delete("access_key");
    incoming.set("access_key", process.env.WEB3FORMS_KEY ?? "");

    if (!incoming.has("botcheck")) incoming.set("botcheck", "");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: incoming, 
    });

    const json = await res.json();

    return NextResponse.json(json, { status: res.ok ? 200 : 400 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Błąd serwera." },
      { status: 500 }
    );
  }
}
