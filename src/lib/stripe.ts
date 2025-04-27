import { loadStripe } from '@stripe/stripe-js';
import { supabase } from './supabase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const processPayment = async (bookingId: string, amount: number) => {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to load');

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    const functionUrl = `${supabaseUrl.replace(/\/$/, '')}/functions/v1/create-checkout-session`;
    
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        bookingId,
        amount,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create checkout session');
    }

    if (!data || !data.id) {
      throw new Error('Invalid session response from server');
    }

    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};