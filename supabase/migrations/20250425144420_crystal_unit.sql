/*
  # Fix bookings RLS policies

  1. Changes
    - Drop and recreate the public insert policy for bookings table to ensure it's properly configured
    - Keep existing policies for admin access

  2. Security
    - Maintains RLS enabled on bookings table
    - Allows public users to create new bookings
    - Preserves admin access for reading and updating bookings
*/

-- Drop the existing public insert policy
DROP POLICY IF EXISTS "allow_public_create_bookings" ON bookings;

-- Recreate the public insert policy with proper configuration
CREATE POLICY "allow_public_create_bookings"
ON bookings
FOR INSERT
TO public
WITH CHECK (true);

-- Verify RLS is still enabled
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;