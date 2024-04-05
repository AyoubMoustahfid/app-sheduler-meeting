"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Briefcase, Calendar, Clock, Plus, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useWindowSize } from "@uidotdev/usehooks";

function SideNavBar() {
    const menu = [
        {
            id: 1,
            name: "Meeting Type",
            path: "/dashboard/meeting-type",
            icon: Briefcase
        },
        {
            id: 2,
            name: "Scheduled Meeting",
            path: "/dashboard/scheduled-meeting",
            icon: Calendar
        },
        {
            id: 3,
            name: "Availability",
            path: "/dashboard/availibility",
            icon: Clock
        },
        {
            id: 4,
            name: "Settings",
            path: "/dashboard/settings",
            icon: Settings
        }
    ]

    const path = usePathname()
    const [activePath, setActivePath] = useState(path)
    const {width} = useWindowSize();
    const [demension, setDemension] = useState(width)

    useEffect(() => {
        path && setActivePath(path)
    }, [path])

    useEffect(() => setDemension(width), [width])

  return (
    <div className="p-5 py-14 transform transition-transform duration-150 ease-in">
        <div className="flex justify-center">
            <Image
                  src={demension <= 998 ? '/favicon.svg' : '/logo.svg'}
                  width={demension <= 998 ? 30 : 150}
                  height={demension <= 998 ? 30 : 150}
                alt='logo'
            />
        </div>

        <Link href="/create-meeting">
            <Button className="flex gap-2 w-full mt-7 px-0 lg:px-2 rounded-md">
                <Plus />
                <p className="hidden lg:block">Create</p>
            </Button>
        </Link>

        <div className="mt-5 flex flex-col gap-5">
            {menu.map((item, index) => (
                <Link href={item.path} key={index}>
                    <Button
                        variant="ghost"
                        className={`w-full grid grid-cols-5 gap-2 justify-start items-center px-0 lg:px-2 ${activePath === item.path && "text-primary bg-blue-100" }`}
                    >
                        <item.icon
                            className="col-span-5 lg:col-span-1 text-center lg:text-left w-full"
                        />
                        <p className="lg:col-span-4 hidden lg:block text-left">{item.name}</p>
                    </Button>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SideNavBar