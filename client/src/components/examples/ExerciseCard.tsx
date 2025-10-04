import { ExerciseCard } from '../ExerciseCard';
import meditationImage from '@assets/generated_images/Meditation_session_image_9674324d.png';

export default function ExerciseCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <ExerciseCard
        id="1"
        title="Sun Salutation Flow"
        description="Learn the classic sun salutation sequence for morning energy"
        duration={15}
        level="Beginner"
        category="Vinyasa"
        thumbnailUrl={meditationImage}
        onPlay={(id) => console.log('Play exercise:', id)}
      />
    </div>
  );
}
