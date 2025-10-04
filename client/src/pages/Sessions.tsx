import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SessionCard } from '@/components/SessionCard';
import { BookingModal } from '@/components/BookingModal';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Session } from '@shared/schema';
import indoorImage from '@assets/generated_images/Indoor_yoga_studio_session_520d01bc.png';
import meditationImage from '@assets/generated_images/Meditation_session_image_9674324d.png';
import powerYogaImage from '@assets/generated_images/Power_yoga_session_0ab6d541.png';

const imageMap: Record<string, string> = {
  'Hatha': indoorImage,
  'Meditation': meditationImage,
  'Vinyasa': powerYogaImage,
  'Restorative': indoorImage,
  'Ashtanga': powerYogaImage,
  'Yin': meditationImage,
};

export default function Sessions() {
  const [bookingModal, setBookingModal] = useState<{ open: boolean; session?: Session }>({ open: false });
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  const { data: sessions = [], isLoading } = useQuery<Session[]>({
    queryKey: ['/api/sessions'],
  });

  const filteredSessions = sessions.filter((session) => {
    if (categoryFilter !== 'all' && session.category !== categoryFilter) return false;
    if (levelFilter !== 'all' && session.level !== levelFilter) return false;
    return true;
  });

  const handleBookSession = (session: Session) => {
    setBookingModal({ open: true, session });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Yoga Sessions</h1>
          <p className="text-muted-foreground font-serif">Browse and book from our expert-led yoga classes</p>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-4">
          <div className="space-y-2 w-full sm:w-auto">
            <Label>Category</Label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48" data-testid="select-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Hatha">Hatha</SelectItem>
                <SelectItem value="Vinyasa">Vinyasa</SelectItem>
                <SelectItem value="Meditation">Meditation</SelectItem>
                <SelectItem value="Restorative">Restorative</SelectItem>
                <SelectItem value="Ashtanga">Ashtanga</SelectItem>
                <SelectItem value="Yin">Yin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 w-full sm:w-auto">
            <Label>Level</Label>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full sm:w-48" data-testid="select-level">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(categoryFilter !== 'all' || levelFilter !== 'all') && (
            <Button
              variant="ghost"
              onClick={() => {
                setCategoryFilter('all');
                setLevelFilter('all');
              }}
              className="mt-auto"
              data-testid="button-clear-filters"
            >
              Clear Filters
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading sessions...</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSessions.map((session) => (
                <SessionCard
                  key={session.id}
                  {...session}
                  imageUrl={imageMap[session.category] || indoorImage}
                  onBook={() => handleBookSession(session)}
                />
              ))}
            </div>

            {filteredSessions.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No sessions found matching your filters</p>
              </div>
            )}
          </>
        )}
      </div>

      <BookingModal
        open={bookingModal.open}
        onClose={() => setBookingModal({ open: false })}
        sessionId={bookingModal.session?.id}
        sessionTitle={bookingModal.session?.title}
        sessionPrice={bookingModal.session?.price}
      />

      <Footer />
    </div>
  );
}
