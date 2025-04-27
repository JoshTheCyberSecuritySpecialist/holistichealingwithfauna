/*
  # Simplify bookings RLS policy
  
  1. Changes
    - Drop all existing booking policies
    - Create a simple public insert policy
    - Keep admin policies intact
    
  2. Security
    - Allow public booking creation
    - Maintain admin access
*/

-- Drop all existing booking policies to start fresh
DROP POLICY IF EXISTS "allow_public_create_bookings" ON bookings;
DROP POLICY IF EXISTS "allow_admin_read_bookings" ON bookings;
DROP POLICY IF EXISTS "allow_admin_update_bookings" ON bookings;

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create simplified policies
CREATE POLICY "public_create_bookings"
ON bookings
FOR INSERT
TO public;

CREATE POLICY "admin_read_bookings"
ON bookings
FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1 FROM admins
  WHERE admins.email = auth.jwt() ->> 'email'
));

CREATE POLICY "admin_update_bookings"
ON bookings
FOR UPDATE
TO authenticated
USING (EXISTS (
  SELECT 1 FROM admins
  WHERE admins.email = auth.jwt() ->> 'email'
));