'use client'

import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-3">
      <div className="container mx-auto flex flex-col items-center justify-between px-4">
        <p className="text-gray-400 text-sm">© 2024 Fitness Tracker - All rights reserved.</p>
        <div className="flex space-x-4 mt-2">
          <Link href="/terms" className="text-gray-400 hover:text-white">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-gray-400 hover:text-white">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer