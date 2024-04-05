import React from 'react'
import SideNavBar from './_component/SideNavBar'
import DashboardHeader from './_component/DashboardHeader'
import { Toaster } from '@/components/ui/sonner'

function DashboardLayout({children}) {
  return (
      <div className="grid grid-cols-12 min-h-screen">
        <div className="hidden md:block md:col-span-1 lg:col-span-3 bg-slate-50 h-screen">
            <SideNavBar/>
        </div>
        <div className='h-full col-span-12 md:col-span-11 lg:col-span-9 min-h-full p-4 space-y-4'>
            <div className="grid grid-rows-[auto_1fr] h-full">
                <div>
                    <DashboardHeader />
                </div>
                <div className="h-full">
                    {children}
                </div>
            </div>
            <Toaster/>
        </div>
    </div>
  )
}

export default DashboardLayout