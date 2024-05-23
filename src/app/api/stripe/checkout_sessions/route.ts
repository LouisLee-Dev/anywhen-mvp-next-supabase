import { HTTP } from "@/core/http";
import stripe from "stripe";

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request, res: Response) {
  try {
    // Create Checkout Sessions from body params.
    const session = await stripeInstance.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of
          // the product you want to sell
          price: "100",
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${req.headers.get("origin")}/return?session_id={CHECKOUT_SESSION_ID}`,
    });
    console.log(session);

    return HTTP.SUCCESS({ clientSecret: session.client_secret });
  } catch (err) {
    return HTTP.INTERNAL_SERVER_ERROR({ message: err });
  }
}
