import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, DollarSign, Users, Activity, Plus, Edit, Trash } from 'lucide-react';
import type { Session, Booking, User as UserType } from '@shared/schema';

export default function AdminDashboard() {
  const { toast } = useToast();
  const [sessionDialog, setSessionDialog] = useState(false);
  const [announcementDialog, setAnnouncementDialog] = useState(false);
  const [sessionForm, setSessionForm] = useState({
    title: '',
    description: '',
    instructor: '',
    category: 'Hatha',
    level: 'Beginner',
    duration: 60,
    maxParticipants: 15,
    price: 25,
    schedule: '',
  });
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    content: '',
  });

  const { data: sessions = [] } = useQuery<Session[]>({
    queryKey: ['/api/sessions'],
  });

  const { data: bookings = [] } = useQuery<Booking[]>({
    queryKey: ['/api/bookings'],
  });

  const createSessionMutation = useMutation({
    mutationFn: async (data: typeof sessionForm) => {
      const res = await apiRequest('POST', '/api/sessions', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/sessions'] });
      toast({ title: 'Session created successfully' });
      setSessionDialog(false);
      setSessionForm({
        title: '',
        description: '',
        instructor: '',
        category: 'Hatha',
        level: 'Beginner',
        duration: 60,
        maxParticipants: 15,
        price: 25,
        schedule: '',
      });
    },
    onError: () => {
      toast({ 
        title: 'Failed to create session', 
        description: 'Please try again.',
        variant: 'destructive'
      });
    },
  });

  const deleteSessionMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest('DELETE', `/api/sessions/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/sessions'] });
      toast({ title: 'Session deleted successfully' });
    },
    onError: () => {
      toast({ 
        title: 'Failed to delete session',
        variant: 'destructive'
      });
    },
  });

  const createAnnouncementMutation = useMutation({
    mutationFn: async (data: typeof announcementForm) => {
      const res = await apiRequest('POST', '/api/announcements', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/announcements'] });
      toast({ title: 'Announcement published successfully' });
      setAnnouncementDialog(false);
      setAnnouncementForm({ title: '', content: '' });
    },
    onError: () => {
      toast({ 
        title: 'Failed to publish announcement',
        variant: 'destructive'
      });
    },
  });

  const totalRevenue = bookings.reduce((sum, booking) => {
    const session = sessions.find(s => s.id === booking.sessionId);
    return sum + (session?.price || 0);
  }, 0);

  const handleCreateSession = () => {
    createSessionMutation.mutate(sessionForm);
  };

  const handleDeleteSession = (id: string) => {
    if (confirm('Are you sure you want to delete this session?')) {
      deleteSessionMutation.mutate(id);
    }
  };

  const handlePublishAnnouncement = () => {
    createAnnouncementMutation.mutate(announcementForm);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground font-serif">Manage sessions, bookings, and users</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={sessionDialog} onOpenChange={setSessionDialog}>
              <DialogTrigger asChild>
                <Button data-testid="button-create-session">
                  <Plus className="mr-2 h-4 w-4" />
                  New Session
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Session</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Session Title</Label>
                    <Input 
                      id="title" 
                      value={sessionForm.title}
                      onChange={(e) => setSessionForm({ ...sessionForm, title: e.target.value })}
                      placeholder="e.g., Morning Hatha Yoga" 
                      data-testid="input-session-title" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      value={sessionForm.description}
                      onChange={(e) => setSessionForm({ ...sessionForm, description: e.target.value })}
                      placeholder="Session description" 
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instructor">Instructor</Label>
                    <Input 
                      id="instructor" 
                      value={sessionForm.instructor}
                      onChange={(e) => setSessionForm({ ...sessionForm, instructor: e.target.value })}
                      placeholder="Instructor name" 
                      data-testid="input-instructor" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={sessionForm.category} onValueChange={(value) => setSessionForm({ ...sessionForm, category: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hatha">Hatha</SelectItem>
                          <SelectItem value="Vinyasa">Vinyasa</SelectItem>
                          <SelectItem value="Meditation">Meditation</SelectItem>
                          <SelectItem value="Restorative">Restorative</SelectItem>
                          <SelectItem value="Ashtanga">Ashtanga</SelectItem>
                          <SelectItem value="Yin">Yin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="level">Level</Label>
                      <Select value={sessionForm.level} onValueChange={(value) => setSessionForm({ ...sessionForm, level: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="All Levels">All Levels</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (min)</Label>
                      <Input 
                        id="duration" 
                        type="number" 
                        value={sessionForm.duration}
                        onChange={(e) => setSessionForm({ ...sessionForm, duration: parseInt(e.target.value) || 60 })}
                        placeholder="60" 
                        data-testid="input-duration" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input 
                        id="price" 
                        type="number" 
                        value={sessionForm.price}
                        onChange={(e) => setSessionForm({ ...sessionForm, price: parseInt(e.target.value) || 25 })}
                        placeholder="25" 
                        data-testid="input-price" 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxParticipants">Max Participants</Label>
                      <Input 
                        id="maxParticipants" 
                        type="number" 
                        value={sessionForm.maxParticipants}
                        onChange={(e) => setSessionForm({ ...sessionForm, maxParticipants: parseInt(e.target.value) || 15 })}
                        placeholder="15" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="schedule">Schedule</Label>
                      <Input 
                        id="schedule" 
                        value={sessionForm.schedule}
                        onChange={(e) => setSessionForm({ ...sessionForm, schedule: e.target.value })}
                        placeholder="Mon, Wed 7AM" 
                      />
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={handleCreateSession}
                    disabled={createSessionMutation.isPending}
                    data-testid="button-save-session"
                  >
                    {createSessionMutation.isPending ? 'Creating...' : 'Create Session'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={announcementDialog} onOpenChange={setAnnouncementDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" data-testid="button-post-announcement">
                  <Activity className="mr-2 h-4 w-4" />
                  Post Announcement
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Post Announcement</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="announcement-title">Title</Label>
                    <Input 
                      id="announcement-title" 
                      value={announcementForm.title}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                      placeholder="Announcement title" 
                      data-testid="input-announcement-title" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="announcement-content">Content</Label>
                    <Textarea 
                      id="announcement-content" 
                      value={announcementForm.content}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                      placeholder="Announcement content" 
                      rows={4} 
                      data-testid="input-announcement-content" 
                    />
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={handlePublishAnnouncement}
                    disabled={createAnnouncementMutation.isPending}
                    data-testid="button-publish-announcement"
                  >
                    {createAnnouncementMutation.isPending ? 'Publishing...' : 'Publish'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Bookings" value={bookings.length} icon={Calendar} />
          <StatCard title="Revenue" value={`$${totalRevenue}`} icon={DollarSign} />
          <StatCard title="Total Sessions" value={sessions.length} icon={Activity} />
          <StatCard title="Avg. Participants" value={sessions.length > 0 ? Math.round(sessions.reduce((sum, s) => sum + s.currentParticipants, 0) / sessions.length) : 0} icon={Users} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest session bookings from users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No bookings yet</p>
                ) : (
                  bookings.slice(0, 5).map((booking) => {
                    const session = sessions.find(s => s.id === booking.sessionId);
                    return (
                      <div key={booking.id} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                        <div>
                          <p className="font-medium">User #{booking.userId.slice(0, 8)}</p>
                          <p className="text-sm text-muted-foreground">{session?.title || 'Unknown Session'}</p>
                          <p className="text-xs text-muted-foreground">{booking.sessionDate}</p>
                        </div>
                        <div className="font-semibold">${session?.price || 0}</div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Management</CardTitle>
              <CardDescription>Manage your yoga sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sessions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No sessions yet. Create one to get started!</p>
                ) : (
                  sessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex-1">
                        <p className="font-medium">{session.title}</p>
                        <p className="text-sm text-muted-foreground">{session.instructor}</p>
                        <p className="text-xs text-muted-foreground mt-1">Participants: {session.currentParticipants}/{session.maxParticipants}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteSession(session.id)}
                          disabled={deleteSessionMutation.isPending}
                          data-testid={`button-delete-${session.id}`}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
