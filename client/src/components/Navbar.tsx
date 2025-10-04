import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/DemoAuthContext';
import { LogOut, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [location] = useLocation();
  const { user, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = user
    ? [
        { href: '/', label: 'Home' },
        { href: '/sessions', label: 'Sessions' },
        { href: '/exercises', label: 'Exercises' },
        ...(isAdmin
          ? [{ href: '/admin', label: 'Admin Dashboard' }]
          : [{ href: '/dashboard', label: 'My Dashboard' }]),
      ]
    : [
        { href: '/', label: 'Home' },
        { href: '/sessions', label: 'Sessions' },
        { href: '/exercises', label: 'Exercises' },
      ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/">
            <a className="flex items-center gap-2" data-testid="link-home">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-lg font-semibold">S</span>
              </div>
              <span className="hidden text-lg font-semibold sm:inline-block">
                Sarvaswasthyam
              </span>
            </a>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a>
                  <Button
                    variant={location === link.href ? 'secondary' : 'ghost'}
                    size="sm"
                    data-testid={`link-${link.label.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.label}
                  </Button>
                </a>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  data-testid="button-profile"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.fullName || user.username}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  data-testid="button-logout"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <a>
                  <Button size="sm" data-testid="button-login">
                    Login
                  </Button>
                </a>
              </Link>
            )}
          </div>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <a onClick={() => setMobileMenuOpen(false)}>
                        <Button
                          variant={location === link.href ? 'secondary' : 'ghost'}
                          className="w-full justify-start"
                          size="lg"
                        >
                          {link.label}
                        </Button>
                      </a>
                    </Link>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  {user ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 px-3 py-2">
                        <User className="h-5 w-5" />
                        <span className="font-medium">{user.fullName || user.username}</span>
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2"
                        size="lg"
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="h-5 w-5" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Link href="/login">
                      <a onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full" size="lg">
                          Login
                        </Button>
                      </a>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
