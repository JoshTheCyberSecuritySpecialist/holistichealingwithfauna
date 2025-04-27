/*
  # Fix bookings RLS policies

  1. Changes
    - Drop existing public insert policy that's not working correctly
    - Create new public insert policy with proper checks
    
  2. Security
    - Allow public users to create bookings without authentication
    - Maintain admin read/update access
*/

-- Drop the existing public insert policy
DROP POLICY IF EXISTS "allow_public_create_bookings" ON bookings;

-- Create new public insert policy with proper checks
CREATE POLICY "allow_public_create_bookings"
ON bookings
FOR INSERT
TO public
WITH CHECK (
  -- Basic validation checks
  client_name IS NOT NULL AND
  client_email IS NOT NULL AND
  client_phone IS NOT NULL AND
  service_id IS NOT NULL AND
  booking_date IS NOT NULL AND
  booking_time IS NOT NULL AND
  total IS NOT NULL AND
  total > 0
);