import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Calendar } from 'lucide-react';

interface SessionCardProps {
  id: string;
  title: string;
  instructor: string;
  category: string;
  level: string;
  duration: number;
  price: number;
  schedule: string;
  currentParticipants: number;
  maxParticipants: number;
  imageUrl?: string;
  onBook?: (id: string) => void;
}

export function SessionCard({
  id,
  title,
  instructor,
  category,
  level,
  duration,
  price,
  schedule,
  currentParticipants,
  maxParticipants,
  imageUrl,
  onBook,
}: SessionCardProps) {
  const isAvailable = currentParticipants < maxParticipants;
  const availableSpots = maxParticipants - currentParticipants;

  return (
    <Card className="overflow-hidden hover-elevate" data-testid={`card-session-${id}`}>
      {imageUrl && (
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="space-y-2 p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight">{title}</h3>
          <Badge variant={level === 'Beginner' ? 'secondary' : level === 'Intermediate' ? 'default' : 'outline'}>
            {level}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{instructor}</p>
      </CardHeader>
      <CardContent className="space-y-3 p-6 pt-0">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{schedule}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">
            {isAvailable ? (
              <>
                <span className="font-medium text-foreground">{availableSpots}</span> spots left
              </>
            ) : (
              <span className="text-destructive">Fully booked</span>
            )}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2 p-6 pt-0">
        <div className="text-2xl font-semibold">₹{price}</div>
        <Button
          disabled={!isAvailable}
          onClick={() => onBook?.(id)}
          data-testid={`button-book-${id}`}
        >
          {isAvailable ? 'Book Now' : 'Full'}
        </Button>
      </CardFooter>
    </Card>
  );
}
