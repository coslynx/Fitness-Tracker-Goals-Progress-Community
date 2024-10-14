'use client'

import React, { useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Input } from '@/presentation/components/ui/Input'
import { Button } from '@/presentation/components/ui/Button'
import { Spinner } from '@/presentation/components/ui/Spinner'

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      })
      // Handle successful login
      router.push('/dashboard')
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (session) {
    return null // Redirect if already logged in
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <h2 className='text-2xl font-bold'>Log In</h2>

      {error && <p className='text-red-500 text-sm'>{error}</p>}

      <Input
        type='email'
        id='email'
        name='email'
        label='Email'
        placeholder='Enter your email'
        value={formData.email}
        onChange={handleChange}
        required
      />

      <Input
        type='password'
        id='password'
        name='password'
        label='Password'
        placeholder='Enter your password'
        value={formData.password}
        onChange={handleChange}
        required
      />

      <Button type='submit' disabled={isLoading} fullWidth>
        {isLoading ? <Spinner size='sm' /> : 'Log In'}
      </Button>
    </form>
  )
}

export default LoginForm