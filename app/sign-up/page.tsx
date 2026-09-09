import { Suspense } from 'react'
import { AuthForm } from '@/components/auth-form'
export default function SignUpPage() { return <Suspense fallback={<main className="auth-shell"><p>Ładowanie...</p></main>}><AuthForm mode="sign-up" /></Suspense> }
