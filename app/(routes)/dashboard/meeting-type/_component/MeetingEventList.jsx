"use client"

import { Button } from '@/components/ui/button'
import { app } from '@/config/FirebaseConfig'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore'
import { Clock, Copy, Pen, Settings, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function MeetingEventList() {

    const db = getFirestore(app)
    const {user} = useKindeBrowserClient()

    const [businessInfo, setBusinessInfo] = useState()
    const [eventList, setEventList] = useState([])

    useEffect(() => {
        user && getEventList();
        user && BusinessInfo();
    }, [user])

    const getEventList = async () => {
        setEventList([])

        const q = query(collection(db, 'MeetingEvent'), where("createdBy", "==", user?.email), orderBy('id', 'desc'));
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data())
            setEventList(prevEvent => [...prevEvent, doc.data()])
        })
    }

    const BusinessInfo = async () => {
        const docRef = doc(db, "Business", user.email);
        const docSnap = await getDoc(docRef)
        setBusinessInfo(docSnap.data())
    }

    const onDeleteMeetingEvent = async (event) => {
        await deleteDoc(doc(db, 'MeetingEvent', event?.id)).then(res => {
            toast('Meeting Event Deleted !')
            getEventList();
        })
    }

    const onCopyClickHandler = (event) => {
        const meetingEventUrl =  'http://localhost:3000/' + businessInfo.businessName + '/' + event.id
        navigator.clipboard.writeText(meetingEventUrl);
        toast('Copied to Clicpboard')
    }
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {eventList.length > 0 ? eventList?.map((event, index) => (
            <div 
                style={{borderTopColor: event?.themeColor}}
                key={index}
                className="border shadow-md border-t-8 rounded-lg p-5 flex flex-col gap-3">
                
                <div className="flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Settings className="cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-2 flex flex-col gap-y-3 z-50 bg-white shadow-md">
                            <DropdownMenuItem className="flex gap-2 hover:bg-blue-600 hover:text-white hover:fill-white border-none p-2 rounded-md cursor-pointer outline-none">
                                <Pen/>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                className="flex gap-2 hover:bg-red-600 hover:text-white hover:fill-white border-none p-2 rounded-md cursor-pointer outline-none"
                                onClick={() => onDeleteMeetingEvent(event)}>
                                <Trash />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <h2 className="font-medium text-xl">
                    {event?.eventName}
                </h2>
                <div className="flex justify-between">
                    <h2 className="flex justify-between gap-2">
                        <Clock/>
                        {event?.duration} Min
                    </h2>
                    <h2 className="flex justify-between gap-2">
                        <Clock />
                        {event?.locationType} Min
                    </h2>
                </div>
                <hr/>
                <div className="flex justify-between items-center">
                    <h2 
                        className="flex gap-2 text-sm text-primary cursor-pointer"
                        onClick={() => onCopyClickHandler(event)}
                        >
                        <Copy className="h-4 w-4" />
                        Coly Link
                    </h2>
                    <Button
                        variant="outline"
                        className="rounded-full text-primary border-primary"
                    >
                        Share
                    </Button>
                </div>
            </div>
        )) : <h2>Loading ...</h2>}
    </div>
  )
}

export default MeetingEventList