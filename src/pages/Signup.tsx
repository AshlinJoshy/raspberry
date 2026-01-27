import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { MonitorPlay } from 'lucide-react';

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(2, 'Full name is required'),
  role: z.enum(['screen_owner', 'advertiser']),
  companyName: z.string().optional(),
});

type SignupFormInputs = z.infer<typeof signupSchema>;

export default function Signup() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: 'screen_owner',
    }
  });

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      setError(null);
      // 1. Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('No user returned from signup');

      // 2. Create profile
      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        role: data.role,
        full_name: data.fullName,
        company_name: data.companyName,
      });

      if (profileError) {
        console.error('Profile creation failed:', profileError);
        throw new Error('Failed to create profile');
      }

      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
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
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Or{' '}
          <Link to="/login" className="font-medium text-brand-400 hover:text-brand-300 transition-colors">
            sign in to existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 py-8 px-4 shadow-xl ring-1 ring-slate-800 sm:rounded-xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="form-label">Email address</label>
              <div className="mt-2">
                <input
                  {...register('email')}
                  id="email"
                  type="email"
                  className="form-input"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="form-label">Password</label>
              <div className="mt-2">
                <input
                  {...register('password')}
                  id="password"
                  type="password"
                  className="form-input"
                />
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <div className="mt-2">
                <input
                  {...register('fullName')}
                  id="fullName"
                  type="text"
                  className="form-input"
                />
                {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="role" className="form-label">I am a...</label>
              <div className="mt-2">
                <select
                  {...register('role')}
                  id="role"
                  className="form-input"
                >
                  <option value="screen_owner">Screen Owner (I have screens)</option>
                  <option value="advertiser">Advertiser (I want to buy ads)</option>
                </select>
                {errors.role && <p className="text-red-400 text-xs mt-1">{errors.role.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="companyName" className="form-label">Company Name (Optional)</label>
              <div className="mt-2">
                <input
                  {...register('companyName')}
                  id="companyName"
                  type="text"
                  className="form-input"
                />
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
                {isSubmitting ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
