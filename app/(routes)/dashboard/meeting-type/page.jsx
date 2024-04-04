import React from 'react'
import MeetingEventList from './_component/MeetingEventList'
import { Input } from '@/components/ui/input'

function MeetingType() {
  return (
      <div className="p-5">
          <div className="flex flex-col gap-5">
              <h2 className="font-bold text-3xl">
                  Meeting Event Type
              </h2>
              <Input
                  placeholder="Search"
                  className="max-w-xs"
              />
              <hr />
          </div>
          <MeetingEventList/>
      </div>
    )
}

export default MeetingType