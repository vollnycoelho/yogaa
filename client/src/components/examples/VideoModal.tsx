import { useState } from 'react';
import { VideoModal } from '../VideoModal';
import { Button } from '@/components/ui/button';

export default function VideoModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Play Video</Button>
      <VideoModal
        open={open}
        onClose={() => setOpen(false)}
        videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        title="Sun Salutation Tutorial"
      />
    </div>
  );
}
