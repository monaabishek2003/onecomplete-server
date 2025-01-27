import { error } from "console";
import { Request, Response } from "express";
import Stripe from "stripe";


if(!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY os required bu was found in env variable");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createStripePaymentIntent = async (req: Request,res: Response): Promise<void> => {
  let { amount } = req.body;

  if (!amount || amount <= 0){
    amount = 50;
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    res.json({
      message: "",
      data: {
        clientSecret: paymentIntent.client_secret,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating stripe payment intent", error });
  }
}