import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Confirmation() {
    return (
        <div className='flex flex-col items-center justify-center gap-6
    p-20'>
            <CheckCircle className='h-9 w-9 text-green-500' />
            <h2 className='font-bold text-3xl'>You successfully scheduled a meeting!</h2>
            <h2 className='text-lg text-gray-500'>We have received your request, your advisor will get in touch soon</h2>
            <Link href="/"><Button>Done</Button></Link>

        </div>
    )
}

export default Confirmation