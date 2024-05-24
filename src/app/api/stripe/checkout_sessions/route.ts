import { HTTP } from "@/core/http";
import stripe from "stripe";

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request, res: Response) {
  try {
    // Create Price
    const data = await req.json();
    const price = await stripeInstance.prices.create({
      unit_amount:
        data.product === "1 Month"
          ? 10000
          : data.product === "6 Months"
            ? 50000
            : 100000,
      currency: "usd",
      product_data: {
        name: data.product,
      },
    });
    // Create Checkout Sessions from body params.
    const session = await stripeInstance.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${req.headers.get("origin")}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return HTTP.SUCCESS({ clientSecret: session.client_secret });
  } catch (err) {
    return HTTP.INTERNAL_SERVER_ERROR({ message: err });
  }
}
