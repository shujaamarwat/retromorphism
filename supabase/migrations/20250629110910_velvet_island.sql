/*
  # Fix Users Table RLS Policy

  1. Security Updates
    - Update the INSERT policy for users table to properly handle new user creation
    - Ensure the policy allows authenticated users to insert their own profile during sign-up
    - The policy should check that the user ID being inserted matches the authenticated user's ID

  2. Changes
    - Drop existing INSERT policy if it exists
    - Create new INSERT policy that properly handles user creation during sign-up process
*/

-- Drop existing INSERT policy for users table
DROP POLICY IF EXISTS "Users can insert own profile" ON users;

-- Create new INSERT policy that allows authenticated users to insert their own profile
CREATE POLICY "Users can insert own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Ensure the other policies are correctly set up
DROP POLICY IF EXISTS "Users can read own profile" ON users;
CREATE POLICY "Users can read own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON users;
CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);