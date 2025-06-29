/*
  # Fix Users Table INSERT Policy

  1. Security Policy Update
    - Drop the existing INSERT policy that uses incorrect `uid()` function
    - Create new INSERT policy using correct `auth.uid()` function
    - This allows users to insert their own profile data after sign-up

  2. Changes
    - Replace `uid()` with `auth.uid()` in the INSERT policy condition
    - Ensures proper authentication check for user profile creation
*/

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Users can insert own profile" ON users;

-- Create the corrected INSERT policy using auth.uid()
CREATE POLICY "Users can insert own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);