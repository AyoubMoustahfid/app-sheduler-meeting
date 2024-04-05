"use client"

import { Button } from '@/components/ui/button'
import { app } from '@/config/FirebaseConfig'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore'
import { Clock, Copy, MapPin, Pen, Settings, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Image from "next/image"
import ShareEvent from './ShareEvent'


function MeetingEventList({ searchQuery }) {

    const db = getFirestore(app)
    const {user} = useKindeBrowserClient()

    const [businessInfo, setBusinessInfo] = useState()
    const [eventList, setEventList] = useState([])
    const [showShareModal, setShowShareModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);


    useEffect(() => {
        user && getEventList();
        user && BusinessInfo();
    }, [user])

    const openShareModal = (event) => {
        setSelectedEvent(event);
        setShowShareModal(true);
    };
    
    const getEventList = async () => {
        setEventList([])

        const q = query(collection(db, 'MeetingEvent'), where("createdBy", "==", user?.email), orderBy('id', 'desc'));
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
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

    // Filter event list based on search query
    const filteredEvents = eventList.filter((event) =>
        event?.eventName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="h-full">
          {filteredEvents.length > 0 ?
              (
                  <>
                      {!filteredEvents ? (
                          <div className="h-full grid place-items-center">
                              <div role="status" className="flex flex-col items-center">
                                  <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                  </svg>
                                  <span className="text-black">Loading...</span>
                              </div>
                          </div>
                      ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                                {filteredEvents?.map((event, index) => (
                                  <div
                                      style={{ borderTopColor: event?.themeColor }}
                                      key={index}
                                      className="border shadow-md border-t-8 rounded-lg p-5 flex flex-col gap-3 h-max bg-white">
                                      <div className="flex justify-end">
                                          <DropdownMenu>
                                              <DropdownMenuTrigger asChild>
                                                  <Settings className="cursor-pointer" />
                                              </DropdownMenuTrigger>
                                              <DropdownMenuContent className="p-2 flex flex-col gap-y-3 z-50 bg-white shadow-md">
                                                  <DropdownMenuItem className="flex gap-2 hover:bg-blue-600 hover:text-white hover:fill-white border-none p-2 rounded-md cursor-pointer outline-none">
                                                      <Pen />
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
                                              <Clock />
                                              {event?.duration} Min
                                          </h2>
                                          <h2 className="flex justify-between gap-2">
                                            <MapPin />
                                              {event?.locationType} 
                                          </h2>
                                      </div>
                                      <hr />
                                      <div className="flex justify-between items-center">
                                          <h2
                                              className="flex gap-2 text-sm text-primary cursor-pointer"
                                              onClick={() => onCopyClickHandler(event)}
                                          >
                                              <Copy className="h-4 w-4" />
                                              Coly Link
                                          </h2>
                                          <Button
                                            onClick={() => openShareModal(event)}
                                              variant="outline"
                                              className="rounded-full text-primary border-primary"
                                          >
                                              Share
                                          </Button>
                                      </div>
                                        {showShareModal && selectedEvent === event && (
                                            <ShareEvent
                                                eventData={selectedEvent}
                                                onClose={() => setShowShareModal(false)}
                                                onCopy={() => onCopyClickHandler(event)}
                                            />
                                        )}
                                  </div>
                              ))}
                          </div>
                      )}
                  </>
              ) : (
              <div className="h-full grid place-items-center">
                  <div className="text-center ">
                      <Image
                          src="/img_no_scheduled.png"
                          alt="no meeting scheduled"
                          width={300}
                          height={300}
                      />
                      <h2 className="font-semibold text-lg">
                          No Data
                      </h2>
                      <p className="text-slate-500">
                          No data, please create a meeting
                      </p>
                  </div>
              </div>
              )
          }
    </div>
  )
}

export default MeetingEventList