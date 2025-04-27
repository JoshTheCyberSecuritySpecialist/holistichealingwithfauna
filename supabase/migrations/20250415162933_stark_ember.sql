/*
  # Fix admin authentication

  1. Changes
    - Drop existing policies and functions
    - Create new admin check function using auth.jwt()
    - Update policies to use email-based admin check
    - Add trigger to automatically insert admin record
*/

-- Drop existing policies and functions
DROP POLICY IF EXISTS "Admins can read admin list" ON admins;
DROP POLICY IF EXISTS "Admins can read all bookings" ON bookings;
DROP POLICY IF EXISTS "Admins can update bookings" ON bookings;
DROP FUNCTION IF EXISTS is_admin();

-- Create new admin check function
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admins 
    WHERE email = LOWER(auth.jwt()->>'email')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create new admin policies
CREATE POLICY "Admins can read admin list"
  ON admins
  FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can read all bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can update bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (is_admin());

-- Create trigger function to automatically insert admin record
CREATE OR REPLACE FUNCTION create_admin_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO admins (email)
  VALUES (LOWER(NEW.email))
  ON CONFLICT (email) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_admin_on_signup();