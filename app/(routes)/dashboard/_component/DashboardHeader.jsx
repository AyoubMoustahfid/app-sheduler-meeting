"use client"

import React from 'react'
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


function DashboardHeader() {

    const {user} = useKindeBrowserClient()

  return user && (
    <div className="">
        <div>
            <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center justify-end w-full mb-3 pb-2 border-b-2 border-slat-400">
                    <Image
                        src={user?.picture}
                        alt="picture"
                        width={40}
                        height={40}
                        className="rounded"
                    />
                    <ChevronDown className="float-right" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>
                        <LogoutLink>
                            Logout
                        </LogoutLink>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    </div>
  )
}

export default DashboardHeader