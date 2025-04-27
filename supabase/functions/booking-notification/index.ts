import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { record } = await req.json();

    // Send email to client
    const { error: clientEmailError } = await supabase
      .from('emails')
      .insert([
        {
          to: record.client_email,
          subject: 'Booking Confirmation - Fauna Healing',
          html: `
            <h2>Thank you for booking with Fauna Healing!</h2>
            <p>Your appointment details:</p>
            <ul>
              <li>Date: ${record.booking_date}</li>
              <li>Time: ${record.booking_time}</li>
              <li>Service: ${record.service_id}</li>
              <li>Total: $${record.total}</li>
            </ul>
            <p>We'll confirm your appointment shortly.</p>
          `
        }
      ]);

    if (clientEmailError) throw clientEmailError;

    // Send email to admin
    const { error: adminEmailError } = await supabase
      .from('emails')
      .insert([
        {
          to: 'admin@faunahealing.com', // Replace with actual admin email
          subject: 'New Booking Received',
          html: `
            <h2>New booking received!</h2>
            <p>Client: ${record.client_name}</p>
            <p>Email: ${record.client_email}</p>
            <p>Phone: ${record.client_phone}</p>
            <p>Service: ${record.service_id}</p>
            <p>Date: ${record.booking_date}</p>
            <p>Time: ${record.booking_time}</p>
            <p>Total: $${record.total}</p>
          `
        }
      ]);

    if (adminEmailError) throw adminEmailError;

    return new Response(
      JSON.stringify({ message: 'Notifications sent successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});