CREATE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY definer
SET search_path = ''
AS $$
BEGIN
    IF NEW.raw_app_meta_data IS NOT NULL THEN
        IF NEW.raw_app_meta_data ? 'provider' AND NEW.raw_app_meta_data ->> 'provider' = 'email' THEN
            INSERT INTO public.profiles (profile_id, name, username, role)
            VALUES (NEW.id, 'Anonymous', 'mr.' || substr(md5(random()::text), 1, 8), 'developer');
        END IF;
    END IF;
    RETURN NEW;
END;
$$;
 
CREATE TRIGGER user_to_profile_trigger
AFTER INSERT ON auth.users 
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();