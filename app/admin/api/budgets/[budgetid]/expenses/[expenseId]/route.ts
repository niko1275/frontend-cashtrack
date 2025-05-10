import { verifySesion } from "@/src/auth/dal";
import { cookies } from "next/headers";

export async function GET(
  request: Request,
  { params }: {  params: { budgetid: string; expenseId: string } }
) {
  await verifySesion();

  const cookieStore = cookies(); // NO necesitas 'await'
  const token = (await cookieStore).get('CASHTRACKR_TOKEN')?.value;

  const url = `${process.env.API_URL}/presupuesto/${params.budgetid}/Gastos/${params.expenseId}`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const json = await res.json();

  if (!res.ok) {
    return Response.json(json.error ?? { error: "Error desconocido" }, { status: 403 });
  }

  return Response.json(json);
}
