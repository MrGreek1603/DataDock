import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabase';

export function Auth() {
  return (
    <div className="max-w-md w-full mx-auto p-6">
      <SupabaseAuth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['github', 'google']}
        redirectTo={`${window.location.origin}/dashboard`}
      />
    </div>
  );
}