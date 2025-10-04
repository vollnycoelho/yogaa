import { useState } from 'react';
import { BookingModal } from '../BookingModal';
import { Button } from '@/components/ui/button';

export default function BookingModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Open Booking Modal</Button>
      <BookingModal
        open={open}
        onClose={() => setOpen(false)}
        sessionTitle="Morning Hatha Yoga"
        sessionPrice={25}
      />
    </div>
  );
}
