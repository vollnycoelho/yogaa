import { SessionCard } from '../SessionCard';
import heroImage from '@assets/generated_images/Indoor_yoga_studio_session_520d01bc.png';

export default function SessionCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <SessionCard
        id="1"
        title="Morning Hatha Yoga"
        instructor="Priya Sharma"
        category="Hatha"
        level="Beginner"
        duration={60}
        price={25}
        schedule="Mon, Wed, Fri 7AM"
        currentParticipants={8}
        maxParticipants={15}
        imageUrl={heroImage}
        onBook={(id) => console.log('Book session:', id)}
      />
    </div>
  );
}
