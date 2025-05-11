import { verifySesion } from "@/src/auth/dal";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

type RouteParams = {
  params: {
    budgetid: string;
    expenseId: string;
  }
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  await verifySesion();

  const cookieStore = await cookies();
  const token = cookieStore.get('CASHTRACKR_TOKEN')?.value;

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
