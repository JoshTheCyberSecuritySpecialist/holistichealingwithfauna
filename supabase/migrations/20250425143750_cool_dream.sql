/*
  # Fix booking policies to allow public inserts
  
  1. Changes
    - Drop existing policies
    - Create simplified policies
    - Allow public inserts without restrictions
    - Maintain admin read/update access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "allow_public_create_bookings" ON bookings;
DROP POLICY IF EXISTS "allow_admin_read_bookings" ON bookings;
DROP POLICY IF EXISTS "allow_admin_update_bookings" ON bookings;

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow public to create bookings without restrictions
CREATE POLICY "allow_public_create_bookings"
ON bookings
FOR INSERT
TO public
WITH CHECK (true);

-- Allow admins to read bookings
CREATE POLICY "allow_admin_read_bookings"
ON bookings
FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1
  FROM admins
  WHERE admins.email = (auth.jwt() ->> 'email')
));

-- Allow admins to update bookings
CREATE POLICY "allow_admin_update_bookings"
ON bookings
FOR UPDATE
TO authenticated
USING (EXISTS (
  SELECT 1
  FROM admins
  WHERE admins.email = (auth.jwt() ->> 'email')
));