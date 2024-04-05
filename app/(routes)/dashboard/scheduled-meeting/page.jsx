"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { app } from '@/config/FirebaseConfig'
import { format } from 'date-fns'
import ScheduledMeetingList from './_component/ScheduledMeetingList';

function ScheduledMeeting() {

    const db = getFirestore(app);
    const { user } = useKindeBrowserClient();
    const [meetingList, setMeetingList] = useState([]);

    useEffect(() => {
        user && getScheduledMeetings();
    }, [user])

    /**
     * Used to Get business prev Meetings
     */
    const getScheduledMeetings = async () => {
        setMeetingList([])
        const q = query(collection(db, 'ScheduledMeetings'), where('businessEmail', '==', user.email));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(doc => {
            setMeetingList(prev => [...prev, doc.data()])
        })

    }

    /**
     * Used to Filter the Meeting 
     * @param {*} type 
     * @returns 
     */
    const filterMeetingList = (type) => {
        if (type == 'upcoming') {
            return meetingList.filter(item => item.formatedTimeStamp >= format(new Date(), 't'));
        }
        else {
            return meetingList.filter(item => item.formatedTimeStamp < format(new Date(), 't'));

        }
    }

    return (
        <div className='h-full grid grid-rows-[auto_1fr]'>
            <div className="mb-5 py-3 ">
                <h2 className='font-bold text-2xl'>Scheduled Meetings</h2>
            </div>
            <div className="h-full">
                <Tabs defaultValue="upcoming">
                    <TabsList>
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        <TabsTrigger value="expired">Expired</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upcoming">
                        <ScheduledMeetingList
                            meetingList={filterMeetingList('upcoming')}
                        />
                    </TabsContent>
                    <TabsContent value="expired">
                        <ScheduledMeetingList
                            meetingList={filterMeetingList('expired')}
                        />
                    </TabsContent>
                </Tabs>
            </div>

        </div>
    )
}

export default ScheduledMeeting