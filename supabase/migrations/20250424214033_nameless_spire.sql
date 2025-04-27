/*
  # Fix Bookings RLS Policies

  1. Changes
    - Drop existing RLS policies for bookings table
    - Create new policies that:
      - Allow public users to create bookings
      - Allow admins to read and update bookings
      - Ensure proper access control

  2. Security
    - Enable RLS on bookings table
    - Add policies for:
      - Public insert access
      - Admin read access
      - Admin update access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "allow_public_create_bookings" ON bookings;
DROP POLICY IF EXISTS "allow_admin_read_bookings" ON bookings;
DROP POLICY IF EXISTS "allow_admin_update_bookings" ON bookings;

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create bookings (public access)
CREATE POLICY "allow_public_create_bookings"
ON bookings
FOR INSERT
TO public
WITH CHECK (true);

-- Allow admins to read all bookings
CREATE POLICY "allow_admin_read_bookings"
ON bookings
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admins
    WHERE admins.email = auth.jwt() ->> 'email'
  )
);

-- Allow admins to update bookings
CREATE POLICY "allow_admin_update_bookings"
ON bookings
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admins
    WHERE admins.email = auth.jwt() ->> 'email'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admins
    WHERE admins.email = auth.jwt() ->> 'email'
  )
);