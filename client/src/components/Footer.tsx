import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href="tel:+15551234567" className="hover:text-primary">
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href="mailto:info@sarvaswasthyam.com" className="hover:text-primary">
                  info@sarvaswasthyam.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>123 Wellness Street, Peace City, PC 12345</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Hours</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Monday - Friday: 6:00 AM - 9:00 PM</p>
              <p>Saturday - Sunday: 7:00 AM - 8:00 PM</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">About</h3>
            <p className="text-sm text-muted-foreground font-serif">
              Sarvaswasthyam Yoga & Fitness is dedicated to transforming lives through the ancient practice of yoga and modern fitness techniques.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sarvaswasthyam Yoga & Fitness. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
