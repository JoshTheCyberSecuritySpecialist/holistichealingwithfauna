/*
  # Fix Bookings RLS Policies

  1. Changes
    - Drop existing problematic policies
    - Create new, properly configured policies for bookings table
  
  2. Security
    - Allow public users to create bookings
    - Allow authenticated users (admins) to read and update bookings
    - Ensure proper access control while maintaining functionality
*/

-- Drop existing policies that might conflict
DROP POLICY IF EXISTS "allow_public_create" ON bookings;
DROP POLICY IF EXISTS "Allow authenticated users to read all bookings" ON bookings;
DROP POLICY IF EXISTS "Allow authenticated users to update bookings" ON bookings;
DROP POLICY IF EXISTS "allow_admin_read" ON bookings;
DROP POLICY IF EXISTS "allow_admin_update" ON bookings;

-- Create new policies with proper permissions
CREATE POLICY "allow_public_create_bookings"
ON bookings
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "allow_admin_read_bookings"
ON bookings
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admins
    WHERE admins.email = auth.jwt()->>'email'
  )
);

CREATE POLICY "allow_admin_update_bookings"
ON bookings
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admins
    WHERE admins.email = auth.jwt()->>'email'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admins
    WHERE admins.email = auth.jwt()->>'email'
  )
);