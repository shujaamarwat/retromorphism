/*
  # Fix users table INSERT policy

  1. Security Policy Update
    - Drop the existing INSERT policy that uses incorrect `uid()` function
    - Create new INSERT policy using correct `auth.uid()` function
    - This allows authenticated users to insert their own profile during sign-up

  2. Changes
    - Replace `uid()` with `auth.uid()` in the INSERT policy condition
    - Ensures new users can create their profile row during registration
*/

-- Drop the existing INSERT policy with incorrect function name
DROP POLICY IF EXISTS "Users can insert own profile" ON users;

-- Create new INSERT policy with correct auth.uid() function
CREATE POLICY "Users can insert own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);