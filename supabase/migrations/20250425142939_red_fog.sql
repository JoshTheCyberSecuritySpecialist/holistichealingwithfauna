/*
  # Fix bookings table RLS policies

  1. Changes
    - Drop and recreate the public insert policy with explicit conditions
    - Ensure policy allows all required fields

  2. Security
    - Maintains existing admin read/update policies
    - Explicitly defines allowed fields for public booking creation
    - Ensures data validation through policy conditions
*/

-- Drop existing public insert policy
DROP POLICY IF EXISTS "allow_public_create_bookings" ON bookings;

-- Create new public insert policy with explicit conditions
CREATE POLICY "allow_public_create_bookings"
ON bookings
FOR INSERT
TO public
WITH CHECK (
  -- Ensure required fields are not null
  service_id IS NOT NULL AND
  booking_date IS NOT NULL AND
  booking_time IS NOT NULL AND
  client_name IS NOT NULL AND
  client_email IS NOT NULL AND
  client_phone IS NOT NULL AND
  total IS NOT NULL AND
  -- Ensure status starts as pending
  (status IS NULL OR status = 'pending')
);