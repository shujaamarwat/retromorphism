/*
  # Add INSERT policy for users table

  1. Security
    - Add policy to allow authenticated users to insert their own user record
    - This enables the sign-up process to create user profiles after Supabase auth user creation

  2. Changes
    - Add INSERT policy for users table that allows users to insert records where the ID matches their auth.uid()
*/

-- Add INSERT policy for users table to allow new user registration
CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = id);