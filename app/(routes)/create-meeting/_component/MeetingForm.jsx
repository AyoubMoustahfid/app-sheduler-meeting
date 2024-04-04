"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import LocationOption from '@/app/_utils/LocationOption'
import Image from 'next/image'
import Link from 'next/link'
import ThemeOption from '@/app/_utils/ThemeOption'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { app } from '@/config/FirebaseConfig'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'


function MeetingForm({setFormValue}) {

    const [location, setLocation] = useState()
    const [themeColor, setThemeColor] = useState()
    const [eventName, setEventName] = useState()
    const [duration, setDuration] = useState(30)
    const [locationType, setLocationType] = useState()
    const [locationUrl, setLocationUrl] = useState()

    const {user} = useKindeBrowserClient()
    const db = getFirestore(app)
    const router = useRouter()


    useEffect(() => {
        setFormValue({
            eventName,
            duration,
            locationType,
            locationUrl,
            themeColor
        })
    }, [eventName, duration, locationType, locationUrl, themeColor])

    const onCreateClick = async () => {
        const id = Date.now().toString()
        await setDoc(doc(db, 'MeetingEvent', id), {
            id: id,
            eventName,
            duration,
            locationType,
            locationUrl,
            themeColor,
            businessId: doc(db, 'Business', user?.email),
            createdBy: user?.email 
        })

        toast("New Meeting Event Created!")
        router.replace('/dashboard/meeting-type')
    }

  return (
    <div className="p-4">
        <Link href={`/dashboard`}>
            <h2 className="flex gap-2">
                <ChevronLeft />
                Cancel
            </h2>
        </Link>
        <div className="mt-4">
            <h2 className='font-bold text-2xl my-4'>Create New Event</h2>
            <hr/>
        </div>
        <div className="flex flex-col gap-3 my-4">
            <h2 className="font-bold">Event Home *</h2>
            <Input
                placeholder="Name of your meeting event"
                onChange={(e) => setEventName(e.target.value)}
            />

            <h2>Duration *</h2>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="max-w-40"
                    >
                        {duration} Min
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setDuration(15)}>15 Min</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDuration(30)}>30 Min</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDuration(45)}>45 Min</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDuration(60)}>60 Min</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <h2 className="font-bold">Location *</h2>
            <div className="grid grid-cols-4 gap-3">
                {LocationOption.map((option, index) => (
                    <div 
                        key={index} 
                        onClick={() => setLocationType(option.name)}
                        className={`border flex flex-col justify-center items-center p-3 rounded-lg cursor-pointer hover:bg-blue-100 hover:border-primary ${locationType === option.name && 'bg-blue-100 border-primary'}`}>
                        <Image
                            src={option.icon}
                            width={30}
                            height={30}
                            alt={option.name}
                        />
                        <h2>{option.name}</h2>
                    </div>
                ))}
            </div>
            {locationType && <>
                <h2 className="font-bold">Add {locationType} Url *</h2>
                <Input
                    placeholder="Add Url"
                    onChange={(e) => setLocationUrl(e.target.value)}
                />
            </>}

            <h2>Select Theme Color</h2>
            <div className="flex justify-evenly">
                {ThemeOption.map((color, index) => (
                    <div
                        key={index}
                        className={`h-7 w-7 rounded-full ${themeColor == color && 'border-4 border-black'}`}
                        style={{backgroundColor: color}}
                        onClick={() => setThemeColor(color)}
                    >

                    </div>
                ))}
            </div>
        </div>
        <Button 
            disabled={(!eventName || !duration || !locationType || !locationUrl )} 
            onClick={() => onCreateClick()}
            className="w-full mt-9">
            Create
        </Button>
    </div>
  )
}

export default MeetingForm