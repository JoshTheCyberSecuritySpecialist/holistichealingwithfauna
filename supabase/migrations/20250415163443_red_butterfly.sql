/*
  # Fix admin policies and recursion - final version

  1. Changes
    - Drop all existing policies and start fresh
    - Create simple, direct policies without recursion
    - Add proper admin record creation
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow admin access" ON admins;
DROP POLICY IF EXISTS "Allow admin read bookings" ON bookings;
DROP POLICY IF EXISTS "Allow admin update bookings" ON bookings;
DROP POLICY IF EXISTS "Allow public to create bookings" ON bookings;

-- Recreate booking policies
CREATE POLICY "Enable read access for authenticated users"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable update access for authenticated users"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert access for all users"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Recreate admin policies
CREATE POLICY "Enable read access for own admin record"
  ON admins
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt()->>'email');

-- Function to create admin record
CREATE OR REPLACE FUNCTION public.handle_new_admin()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.admins (email)
  VALUES (NEW.email)
  ON CONFLICT (email) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new admin creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_admin();

-- Insert admin record for existing user if not exists
INSERT INTO admins (email)
SELECT email 
FROM auth.users 
WHERE id = auth.uid()
ON CONFLICT (email) DO NOTHING;