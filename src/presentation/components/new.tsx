'use client'

import React from 'react'
import Link from 'next/link'
import { useStore } from '@/lib/store'
import { useSession } from 'next-auth/react'
import { GoalType } from '@/types/goal'

const NewButton = () => {
  const store = useStore()
  const { data: session } = useSession()

  if (session?.user?.id) {
    return (
      <Link href="/goals" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        New Goal
      </Link>
    )
  } else {
    return null
  }
}

export default NewButton