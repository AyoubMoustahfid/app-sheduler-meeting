"use client"

import React, {useState} from 'react'
import MeetingForm from './_component/MeetingForm'
import PreviewMeeting from './_component/PreviewMeeting'

function CreateMeeting() {

    const [formValue, setFormValue] = useState()
    const [selectedDate, setSelectedDate] = useState(new Date());


  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="shadow-sm border h-screen">
            <MeetingForm 
                setFormValue={(value) => setFormValue(value)}
                selectedDate={selectedDate}
            />
        </div>
        <div className="md:col-span-2">
              <PreviewMeeting 
                formValue={formValue}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
        </div>
    </div>
  )
}

export default CreateMeeting