import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { submitAdminAuth } from '../../features/auth/api';
import { useAuth } from '../../features/auth/AuthProvider';

export function AdminLogin() {
  const form = useForm<{ email: string; password: string; mfaCode: string }>();
  const { user, signOut } = useAuth();
  const client = useQueryClient();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [leaving, setLeaving] = useState(false);
  if (user) return <section className="admin-login-card"><p className="eyebrow">Admin portal</p><h1>Use an administrator account</h1><p>You are currently signed in as {user.name}. Sign out before accessing the administration portal with a different account.</p><button disabled={leaving} onClick={async()=>{setLeaving(true);await signOut();setLeaving(false);}}>{leaving?'Signing out…':'Sign out'}</button></section>;
  return <section className="admin-login-card">
    <p className="eyebrow">Admin portal</p><h1>Sign in to administration</h1><p>Authorized platform personnel only. Public and guide accounts cannot enter this workspace.</p>
    <form className="form-stack" onSubmit={form.handleSubmit(async values => { setError(''); try { const account = await submitAdminAuth(values); client.setQueryData(['me'], account); navigate('/admin/dashboard', { replace: true }); } catch (reason) { setError((reason as Error).message); } })}>
      <label>Email<input type="email" autoComplete="username" required {...form.register('email', { required: true })}/></label>
      <label>Password<input type="password" autoComplete="current-password" required {...form.register('password', { required: true })}/></label>
      <label>Authenticator code<input inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required {...form.register('mfaCode', { required: true, pattern:/^\d{6}$/ })}/></label>
      {error && <p className="feedback error" role="alert">{error}</p>}
      <button disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? 'Checking access…' : 'Sign in securely'}</button>
    </form>
  </section>;
}
