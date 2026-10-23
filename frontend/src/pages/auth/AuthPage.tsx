import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { submitAuth } from '../../features/auth/api';
import { postLoginPath } from '../../features/auth/roles';

type AuthFields = { name:string; email:string; password:string; mfaCode?:string };

export function Auth({ register }: { register:boolean }) {
  const form = useForm<AuthFields>();
  const [error,setError] = useState('');
  const navigate = useNavigate();
  const client = useQueryClient();
  const [params] = useSearchParams();
  return <div className="auth-layout">
    <section className="auth-intro"><h1>{register?'Your next adventure starts here.':'Welcome back to the outdoors.'}</h1><p>Discover Places. Meet Local Guides.</p><p>Browse freely, connect with local knowledge, and keep your booking requests in one place.</p><Link to="/destinations">Keep exploring destinations</Link></section>
    <section className="auth-panel"><h2>{register?'Create your account':'Sign in'}</h2><p>{register?'A few details, then you’re ready to plan.':'Pick up where your plans left off.'}</p>
      <form className="form-stack" onSubmit={form.handleSubmit(async values => { setError(''); try { const account=await submitAuth(register,values); client.setQueryData(['me'],account); navigate(postLoginPath(account,params.get('next')),{replace:true}); } catch(reason) { setError((reason as Error).message); } })}>
        {register&&<label>Name<input autoComplete="name" required minLength={2} {...form.register('name',{required:true})}/></label>}
        <label>Email<input type="email" autoComplete="email" required {...form.register('email',{required:true})}/></label>
        <label>Password<input type="password" autoComplete={register?'new-password':'current-password'} required minLength={register?12:undefined} {...form.register('password',{required:true})}/>{register&&<small>Use at least 12 characters.</small>}</label>
        {!register&&<label>Administrator verification code <span className="optional">(admin accounts only)</span><input inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} {...form.register('mfaCode',{pattern:/^\d{6}$/})}/></label>}
        {error&&<p className="feedback error" role="alert">{error}</p>}
        <button disabled={form.formState.isSubmitting}>{form.formState.isSubmitting?'Please wait…':register?'Create account':'Sign in'}</button>
      </form>
      <p>{register?'Already have an account?':'New to ImpaExplore?'} <Link to={register?'/login':'/register'}>{register?'Sign in':'Create account'}</Link></p>
    </section>
  </div>;
}
