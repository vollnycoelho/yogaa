import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ExerciseCard } from '@/components/ExerciseCard';
import { VideoModal } from '@/components/VideoModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import type { Exercise } from '@shared/schema';
import meditationImage from '@assets/generated_images/Meditation_session_image_9674324d.png';
import powerYogaImage from '@assets/generated_images/Power_yoga_session_0ab6d541.png';
import indoorImage from '@assets/generated_images/Indoor_yoga_studio_session_520d01bc.png';

const thumbnailMap: Record<string, string> = {
  'Vinyasa': meditationImage,
  'Strength': powerYogaImage,
  'Relaxation': indoorImage,
  'Breathwork': meditationImage,
  'Balance': powerYogaImage,
};

export default function Exercises() {
  const [videoModal, setVideoModal] = useState<{ open: boolean; exercise?: Exercise }>({ open: false });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const { data: exercises = [], isLoading } = useQuery<Exercise[]>({
    queryKey: ['/api/exercises'],
  });

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || exercise.difficulty === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const handlePlayVideo = (exercise: any) => {
    setVideoModal({ open: true, exercise });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Exercise Library</h1>
          <p className="text-muted-foreground font-serif">Watch instructional videos to perfect your practice</p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search exercises..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search"
            />
          </div>
        </div>

        <Tabs value={selectedLevel} onValueChange={setSelectedLevel} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="all" data-testid="tab-all">All Levels</TabsTrigger>
            <TabsTrigger value="Beginner" data-testid="tab-beginner">Beginner</TabsTrigger>
            <TabsTrigger value="Intermediate" data-testid="tab-intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="Advanced" data-testid="tab-advanced">Advanced</TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading exercises...</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  {...exercise}
                  thumbnailUrl={thumbnailMap[exercise.category] || indoorImage}
                  onPlay={() => handlePlayVideo(exercise)}
                />
              ))}
            </div>

            {filteredExercises.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No exercises found matching your search</p>
              </div>
            )}
          </>
        )}
      </div>

      <VideoModal
        open={videoModal.open}
        onClose={() => setVideoModal({ open: false })}
        videoUrl={videoModal.exercise?.videoUrl}
        title={videoModal.exercise?.name}
      />

      <Footer />
    </div>
  );
}
