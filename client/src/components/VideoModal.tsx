import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  videoUrl?: string;
  title?: string;
}

export function VideoModal({ open, onClose, videoUrl, title }: VideoModalProps) {
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0" data-testid="modal-video">
        {title && (
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        <div className="aspect-video w-full">
          {videoUrl && (
            <iframe
              src={getYouTubeEmbedUrl(videoUrl)}
              title={title || 'Video player'}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
