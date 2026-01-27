import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { MonitorPlay } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function Login() {
  const { user, profile, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (!loading && user && profile) {
      if (profile.role === 'screen_owner') navigate('/screen-owner');
      else if (profile.role === 'advertiser') navigate('/advertiser');
      else if (profile.role === 'admin') navigate('/admin');
    }
  }, [user, profile, loading, navigate]);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error("Supabase environment variables are missing. Please check your deployment settings.");
      }

      setError(null);
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;
      navigate('/');
    } catch (err: any) {
      console.error('Login error:', err);
      let message = err.message || 'Failed to login';
      if (message === 'Failed to fetch') {
        message = 'Connection to Supabase failed. Please check if your VITE_SUPABASE_URL is correct and accessible.';
      }
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="rounded-xl bg-brand-500/10 p-3 ring-1 ring-brand-500/20">
            <MonitorPlay className="h-10 w-10 text-brand-500" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Sign in to AdScreen
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Or{' '}
          <Link to="/signup" className="font-medium text-brand-400 hover:text-brand-300 transition-colors">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 py-8 px-4 shadow-xl ring-1 ring-slate-800 sm:rounded-xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <div className="mt-2">
                <input
                  {...register('email')}
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="form-input"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="mt-2">
                <input
                  {...register('password')}
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className="form-input"
                />
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-900/30 p-4 border border-red-900/50">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-200">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
