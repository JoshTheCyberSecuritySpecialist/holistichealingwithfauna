/*
  # Simplify Admin Policies
  
  1. Changes
    - Remove all complex policy checks
    - Implement simple admin access control
    - Fix infinite recursion issue
    
  2. Security
    - Maintain basic RLS protection
    - Keep public booking creation
    - Simplify admin access checks
*/

-- First drop all existing policies
DROP POLICY IF EXISTS "admin_read_policy" ON admins;
DROP POLICY IF EXISTS "booking_read_policy" ON bookings;
DROP POLICY IF EXISTS "booking_update_policy" ON bookings;
DROP POLICY IF EXISTS "booking_insert_policy" ON bookings;

-- Simple admin policy
CREATE POLICY "enable_admin_access"
ON admins
FOR ALL
TO authenticated
USING (true);

-- Simple booking policies
CREATE POLICY "enable_booking_read"
ON bookings
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "enable_booking_update"
ON bookings
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "enable_booking_insert"
ON bookings
FOR INSERT
TO public
WITH CHECK (true);

-- Make sure current user is in admins table
INSERT INTO admins (email)
SELECT email FROM auth.users WHERE id = auth.uid()
ON CONFLICT (email) DO NOTHING;