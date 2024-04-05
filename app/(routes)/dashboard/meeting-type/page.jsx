"use client"

import React, { useState } from 'react';
import MeetingEventList from './_component/MeetingEventList';
import { Input } from '@/components/ui/input';

function MeetingType() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="min-h-full grid grid-rows-[auto_1fr] gap-y-4">
            <div className="grid grid-cols-2 justify-between content-between items-center w-full gap-5">
                <h2 className="font-bold text-xl col-span-2 sm:col-span-1">
                    Meeting Event Type
                </h2>
                <div className="flex justify-end w-full col-span-2 sm:col-span-1">
                    <Input
                        placeholder="Search"
                        className="max-w-full sm:max-w-xs"
                        value={searchQuery}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="h-full pt-10">
                <MeetingEventList searchQuery={searchQuery} />
            </div>
        </div>
    );
}

export default MeetingType;
