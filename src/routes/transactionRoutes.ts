import { Router } from "express";
import { createStripePaymentIntent } from "../controllers/transactionController";

const router = Router();

router.post("/stripe/payment-intent",createStripePaymentIntent)