import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Calendar, CreditCard, CheckCircle } from 'lucide-react';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  sessionId?: string;
  sessionTitle?: string;
  sessionPrice?: number;
}

export function BookingModal({ open, onClose, sessionId, sessionTitle, sessionPrice }: BookingModalProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleNext = () => {
    console.log('Step completed:', step, formData);
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const createBookingMutation = useMutation({
    mutationFn: async (data: { sessionId: string; sessionDate: string }) => {
      const res = await apiRequest('POST', '/api/bookings', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      queryClient.invalidateQueries({ queryKey: ['/api/sessions'] });
      toast({ 
        title: 'Booking confirmed!', 
        description: 'Your session has been booked successfully.' 
      });
      setStep(1);
      setFormData({
        date: '',
        time: '',
        name: '',
        email: '',
        phone: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
      });
      onClose();
    },
    onError: () => {
      toast({ 
        title: 'Booking failed', 
        description: 'Unable to complete booking. Please try again.',
        variant: 'destructive'
      });
    },
  });

  const handleComplete = () => {
    if (!sessionId || !formData.date || !formData.time) {
      toast({ 
        title: 'Missing information', 
        description: 'Please select both date and time for your booking.',
        variant: 'destructive'
      });
      return;
    }

    createBookingMutation.mutate({
      sessionId,
      sessionDate: `${formData.date} ${formData.time}`,
    });
  };

  const progressValue = (step / 3) * 100;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-testid="modal-booking">
        <DialogHeader>
          <DialogTitle>Book Session</DialogTitle>
          <Progress value={progressValue} className="mt-2" />
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Step 1: Select Date & Time</span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="session">Training Session</Label>
              <Input
                id="session"
                value={sessionTitle || ''}
                disabled
                data-testid="input-session"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Preferred Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                data-testid="input-date"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Preferred Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                data-testid="input-time"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Step 2: Your Information</span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                data-testid="input-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                data-testid="input-email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                data-testid="input-phone"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CreditCard className="h-4 w-4" />
              <span>Step 3: Payment</span>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Amount</span>
                <span className="text-2xl font-semibold">₹{sessionPrice || 0}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="card">Card Number</Label>
              <Input
                id="card"
                value={formData.cardNumber}
                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                placeholder="1234 5678 9012 3456"
                data-testid="input-card"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry</Label>
                <Input
                  id="expiry"
                  value={formData.expiry}
                  onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                  placeholder="MM/YY"
                  data-testid="input-expiry"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  value={formData.cvv}
                  onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                  placeholder="123"
                  data-testid="input-cvv"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack} data-testid="button-back">
              Back
            </Button>
          )}
          <div className="flex-1" />
          {step < 3 ? (
            <Button onClick={handleNext} data-testid="button-next">
              Continue
            </Button>
          ) : (
            <Button 
              onClick={handleComplete} 
              disabled={createBookingMutation.isPending}
              data-testid="button-complete"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              {createBookingMutation.isPending ? 'Processing...' : 'Complete Booking'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
