import z from "zod";
import type { Route } from "./+types/promote-success-page";

// paymentType=NORMAL&orderId=ad00d236-4320-466e-ba48-33d8a327c400&paymentKey=tgen_202607221317267l4k2&amount=60000

const paramsSchema = z.object({
  paymentType: z.string(),
  orderId: z.uuid(),
  paymentKey: z.string(),
  amount: z.coerce.number(),
});

const TOSS_SECRET_KEY = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success, data } = paramsSchema.safeParse(
    Object.fromEntries(url.searchParams),
  );
  if (!success) {
    return new Response(null, { status: 404 });
  }
  const encryptedSecretKey = `Basic ${Buffer.from(TOSS_SECRET_KEY + ":").toString("base64")}`;
  const response = await fetch(
    `https://api.tosspayments.com/v1/payments/confirm`,
    {
      method: "POST",
      headers: {
        Authorization: encryptedSecretKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: data.orderId,
        paymentKey: data.paymentKey,
        amount: data.amount,
      }),
    },
  );
  const responseData = await response.json();
  return Response.json({ responseData });
};
