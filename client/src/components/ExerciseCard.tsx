import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Clock } from 'lucide-react';

interface ExerciseCardProps {
  id: string;
  title: string;
  description: string;
  duration: number;
  level: string;
  category: string;
  thumbnailUrl?: string;
  onPlay?: (id: string) => void;
}

export function ExerciseCard({
  id,
  title,
  description,
  duration,
  level,
  category,
  thumbnailUrl,
  onPlay,
}: ExerciseCardProps) {
  return (
    <Card
      className="group overflow-hidden hover-elevate cursor-pointer"
      onClick={() => onPlay?.(id)}
      data-testid={`card-exercise-${id}`}
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Play className="h-8 w-8 fill-current" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs text-white">
          <Clock className="h-3 w-3" />
          <span>{duration} min</span>
        </div>
      </div>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight">{title}</h3>
          <Badge variant="secondary" className="shrink-0">
            {level}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
