/*
  # Create bookings and admin tables

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `service_id` (text)
      - `add_ons` (text array)
      - `booking_date` (date)
      - `booking_time` (text)
      - `client_name` (text)
      - `client_email` (text)
      - `client_phone` (text)
      - `notes` (text)
      - `total` (numeric)
      - `status` (text)
      - `created_at` (timestamp)
    - `admins`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for admin access
*/

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id text NOT NULL,
  add_ons text[] DEFAULT '{}',
  booking_date date NOT NULL,
  booking_time text NOT NULL,
  client_name text NOT NULL,
  client_email text NOT NULL,
  client_phone text NOT NULL,
  notes text,
  total numeric NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Create policies for admins
CREATE POLICY "Admins can read all bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.id = auth.uid()
    )
  );

-- Create policy for admin table
CREATE POLICY "Admins can read admin list"
  ON admins
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.id = auth.uid()
    )
  );