/*
  # Fix RLS policies for user sign-up

  1. Policy Updates
    - Update users table INSERT policy to work during sign-up
    - Update virtuas table INSERT policy to work during sign-up
    - Ensure proper authentication context

  2. Security
    - Maintain security while allowing sign-up process
    - Users can only insert their own data
*/

-- Drop existing policies that might be causing issues
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Users can manage own virtuas" ON public.virtuas;

-- Create new INSERT policy for users table that works during sign-up
CREATE POLICY "Users can insert own profile" 
  ON public.users 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = id);

-- Create separate policies for virtuas table
CREATE POLICY "Users can insert own virtuas" 
  ON public.virtuas 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can select own virtuas" 
  ON public.virtuas 
  FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own virtuas" 
  ON public.virtuas 
  FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own virtuas" 
  ON public.virtuas 
  FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);