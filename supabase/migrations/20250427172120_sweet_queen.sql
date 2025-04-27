/*
  # Fix bookings RLS policy

  1. Changes
    - Drop and recreate the public insert policy for bookings table with proper conditions
    - Ensure all required fields are validated
    - Allow public users to create bookings without authentication

  2. Security
    - Maintains data validation for required fields
    - Keeps existing admin policies intact
    - Ensures bookings can only be created with valid data
*/

-- Drop existing policy
DROP POLICY IF EXISTS "allow_public_create_bookings" ON bookings;

-- Create new policy with proper conditions
CREATE POLICY "allow_public_create_bookings"
ON bookings
FOR INSERT
TO public
WITH CHECK (
  -- Ensure all required fields are present and valid
  client_name IS NOT NULL AND
  client_email IS NOT NULL AND
  client_phone IS NOT NULL AND
  service_id IS NOT NULL AND
  booking_date IS NOT NULL AND
  booking_time IS NOT NULL AND
  total IS NOT NULL AND
  total > 0 AND
  -- Ensure status is either null (will use default 'pending') or a valid status
  (status IS NULL OR status = 'pending')
);