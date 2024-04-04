"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'

function Hero() {
  return (
    <div className='flex flex-col justify-center items-center my-20'>
        <div className="text-center max-w-3xl">
            <h2 className='font-bold text-[60px] text-slate-900'>
                Easy scheduling ahead
            </h2>
            <h2 className="text-xl mt-6 text-slate-500">
                Calendly is your scheduling automation platform for eliminating the back-and-forth emails to find the perfect time -- and so much more.
            </h2>
            <div className='flex gap-4 flex-col mt-5'>
                <h3 className='text-sm'>
                    Sign Up free with Google and Facebook
                </h3>
                <div className='flex justify-center gap-8'>
                    <Button className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="fill-white w-4 h-4">
                            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                        </svg>
                        Sign up with Google
                    </Button>
                    <Button className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="fill-white w-4 h-4">
                            <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                        </svg>
                        Sign up with Facebook
                    </Button>
                </div>
                <hr/>
                <h2>
                    <Link href="" className="text-primary">
                        Sign up free with Email.
                    </Link>
                     No Credit card required
                </h2>
            </div>
        </div>
    </div>
  )
}

export default Hero