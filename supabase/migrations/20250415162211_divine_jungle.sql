/*
  # Create bookings table

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
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `bookings` table
    - Add policy for authenticated users to read all bookings
    - Add policy for public users to create bookings
*/

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

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users (admin) to read all bookings
CREATE POLICY "Allow authenticated users to read all bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users (admin) to update bookings
CREATE POLICY "Allow authenticated users to update bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow public to create bookings
CREATE POLICY "Allow public to create bookings"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);