/*
  # Simplify Admin System
  
  1. Changes
    - Drop all existing policies and start fresh
    - Simplify admin access control
    - Remove complex policy checks
    - Add basic RLS policies
    
  2. Security
    - Maintain basic authentication checks
    - Keep public booking creation
    - Simplify admin access
*/

-- First, drop all policies with CASCADE to handle dependencies
DROP POLICY IF EXISTS "enable_admin_access" ON admins CASCADE;
DROP POLICY IF EXISTS "enable_booking_read" ON bookings CASCADE;
DROP POLICY IF EXISTS "enable_booking_update" ON bookings CASCADE;
DROP POLICY IF EXISTS "enable_booking_insert" ON bookings CASCADE;
DROP POLICY IF EXISTS "Admins can read admin list" ON admins CASCADE;
DROP POLICY IF EXISTS "Admins can read all bookings" ON bookings CASCADE;
DROP POLICY IF EXISTS "Admins can update bookings" ON bookings CASCADE;

-- Drop function with CASCADE to handle dependent objects
DROP FUNCTION IF EXISTS public.handle_new_admin() CASCADE;
DROP FUNCTION IF EXISTS is_admin() CASCADE;

-- Recreate tables to ensure clean state
DROP TABLE IF EXISTS admins CASCADE;
CREATE TABLE admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Simple admin policies
CREATE POLICY "admin_access"
ON admins
FOR ALL
TO authenticated
USING (auth.jwt()->>'email' = email);

-- Simple booking policies
CREATE POLICY "booking_read"
ON bookings
FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1 FROM admins
  WHERE admins.email = auth.jwt()->>'email'
));

CREATE POLICY "booking_update"
ON bookings
FOR UPDATE
TO authenticated
USING (EXISTS (
  SELECT 1 FROM admins
  WHERE admins.email = auth.jwt()->>'email'
));

CREATE POLICY "booking_insert"
ON bookings
FOR INSERT
TO public
WITH CHECK (true);

-- Insert current user as admin
INSERT INTO admins (email)
SELECT email FROM auth.users WHERE id = auth.uid()
ON CONFLICT (email) DO NOTHING;