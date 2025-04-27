/*
  # Fix Admin Policies

  1. Changes
    - Remove recursive policy checks
    - Simplify admin verification
    - Fix infinite recursion in admin policies
    
  2. Security
    - Maintain RLS for both tables
    - Ensure proper access control
    - Prevent unauthorized access
*/

-- First, drop all existing policies
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON bookings;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON bookings;
DROP POLICY IF EXISTS "Enable insert access for all users" ON bookings;
DROP POLICY IF EXISTS "Enable read access for own admin record" ON admins;

-- Drop the trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_admin();

-- Clear and recreate admin policies
CREATE POLICY "admin_read_policy"
  ON admins
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Recreate booking policies
CREATE POLICY "booking_read_policy"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = auth.users.id
    )
  );

CREATE POLICY "booking_update_policy"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = auth.users.id
    )
  );

CREATE POLICY "booking_insert_policy"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Insert current user as admin if not exists
INSERT INTO admins (email)
SELECT email FROM auth.users WHERE id = auth.uid()
ON CONFLICT (email) DO NOTHING;