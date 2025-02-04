import React, { useState } from 'react';
import { Calendar } from '@contentful/f36-datepicker';

export default function BasicExample() {
  const [selectedDay, setSelectedDay] = useState(new Date());

  return (
    <Calendar mode="single" selected={selectedDay} onSelect={setSelectedDay} />
  );
}
