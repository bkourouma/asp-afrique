'use client'

import { motion } from 'framer-motion'

interface AdminLoadingProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

export function AdminLoading({ 
  message = "Chargement...", 
  size = 'md' 
}: AdminLoadingProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12'
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.p 
        className="mt-4 text-gray-600 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {message}
      </motion.p>
    </div>
  )
}
