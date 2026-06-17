-- ============ RUN THIS IN SUPABASE SQL EDITOR ============

-- Fix 1: Allow users to insert their own profile on registration
CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- Fix 2: Allow listing_images INSERT (FOR ALL USING doesn't cover INSERT)
DROP POLICY IF EXISTS "Users can manage own images" ON listing_images;
CREATE POLICY "Users can manage own images"
  ON listing_images FOR ALL
  USING (
    EXISTS (SELECT 1 FROM listings WHERE id = listing_images.listing_id AND user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM listings WHERE id = listing_images.listing_id AND user_id = auth.uid())
  );

-- Fix 3: Create storage bucket for listing images
INSERT INTO storage.buckets (id, name, public) VALUES ('listings', 'listings', true)
ON CONFLICT (id) DO NOTHING;

-- Fix 4: Allow authenticated users to upload to listings bucket
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'listings' AND auth.role() = 'authenticated'
  );

-- Fix 5: Allow public to read listing images
CREATE POLICY "Anyone can read listing images"
  ON storage.objects FOR SELECT USING (bucket_id = 'listings');
