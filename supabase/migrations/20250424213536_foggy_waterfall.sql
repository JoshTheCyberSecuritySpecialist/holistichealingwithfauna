/*
  # Fix Booking RLS Policies
  
  1. Changes
    - Drop existing booking policies
    - Add new policies for public booking creation
    - Maintain admin access policies
    
  2. Security
    - Allow public users to create bookings
    - Maintain admin read/update access
    - Ensure proper access control
*/

-- Drop existing booking policies
DROP POLICY IF EXISTS "booking_read" ON bookings;
DROP POLICY IF EXISTS "booking_update" ON bookings;
DROP POLICY IF EXISTS "booking_insert" ON bookings;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON bookings;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON bookings;
DROP POLICY IF EXISTS "Enable insert access for all users" ON bookings;

-- Create new booking policies
CREATE POLICY "allow_public_create"
ON bookings
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "allow_admin_read"
ON bookings
FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1 FROM admins
  WHERE admins.email = auth.jwt()->>'email'
));

CREATE POLICY "allow_admin_update"
ON bookings
FOR UPDATE
TO authenticated
USING (EXISTS (
  SELECT 1 FROM admins
  WHERE admins.email = auth.jwt()->>'email'
));