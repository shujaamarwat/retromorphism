/*
  # Add INSERT policy for users table

  1. Security Changes
    - Add RLS policy to allow authenticated users to insert their own profile data
    - Policy ensures users can only create profiles with their own auth.uid()
    - This enables user profile creation during the sign-up process

  2. Policy Details
    - Table: `users`
    - Operation: INSERT
    - Target: authenticated users
    - Condition: new row's id must match the authenticated user's id (auth.uid())
*/

-- Create policy to allow users to insert their own profile data
CREATE POLICY "Users can insert own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);