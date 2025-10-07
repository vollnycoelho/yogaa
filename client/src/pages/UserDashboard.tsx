import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, User, Mail, X } from 'lucide-react';
import type { Booking, Session } from '@shared/schema';

interface BookingWithSession extends Booking {
  session?: Session;
}

export default function UserDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: bookings = [], isLoading } = useQuery<Booking[]>({
    queryKey: ['/api/bookings'],
  });

  const { data: sessions = [] } = useQuery<Session[]>({
    queryKey: ['/api/sessions'],
  });

  const bookingsWithSessions: BookingWithSession[] = bookings.map((booking) => ({
    ...booking,
    session: sessions.find((s) => s.id === booking.sessionId),
  }));

  const cancelBookingMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest('DELETE', `/api/bookings/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      queryClient.invalidateQueries({ queryKey: ['/api/sessions'] });
      toast({ 
        title: 'Booking cancelled', 
        description: 'Your booking has been cancelled successfully.' 
      });
    },
    onError: () => {
      toast({ 
        title: 'Cancellation failed', 
        description: 'Unable to cancel booking. Please try again.',
        variant: 'destructive'
      });
    },
  });

  const handleCancelBooking = (id: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      cancelBookingMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
          <p className="text-muted-foreground font-serif">Manage your bookings and profile</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg">Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold">{bookings.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold">{bookings.length}</div>
            </CardContent>
          </Card>
          <Card className="sm:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base md:text-lg">Member Since</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">2024</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <Card>
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
                <CardDescription>Your upcoming yoga sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <p className="text-sm text-muted-foreground">Loading bookings...</p>
                ) : bookingsWithSessions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No bookings yet. Book a session to get started!</p>
                ) : (
                  bookingsWithSessions.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4"
                      data-testid={`booking-${booking.id}`}
                    >
                      <div className="space-y-1 flex-1">
                        <h3 className="font-semibold">{booking.session?.title || 'Unknown Session'}</h3>
                        <p className="text-sm text-muted-foreground">{booking.session?.instructor || 'Unknown Instructor'}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{booking.sessionDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{booking.session?.schedule || 'TBD'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{booking.status}</Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCancelBooking(booking.id)}
                          disabled={cancelBookingMutation.isPending}
                          data-testid={`button-cancel-${booking.id}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          <div className="order-1 lg:order-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">{user?.fullName || user?.username}</p>
                    <p className="text-sm text-muted-foreground">Member</p>
                  </div>
                </div>
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>@{user?.username}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4" data-testid="button-edit-profile">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
