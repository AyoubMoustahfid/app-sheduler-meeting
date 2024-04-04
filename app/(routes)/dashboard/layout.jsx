import React from 'react'
import SideNavBar from './_component/SideNavBar'
import DashboardHeader from './_component/DashboardHeader'
import { Toaster } from '@/components/ui/sonner'

function DashboardLayout({children}) {
  return (
    <div>
        <div className="hidden md:block w-64 bg-slate-50 h-screen fixed">
            <SideNavBar/>
        </div>
        <div className=' md:ml-64'>
            <DashboardHeader/>
            <Toaster/>
              {children}
        </div>
    </div>
  )
}

export default DashboardLayout