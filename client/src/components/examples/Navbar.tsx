import { Navbar } from '../Navbar';
import { AuthProvider } from '@/contexts/AuthContext';

export default function NavbarExample() {
  return (
    <AuthProvider>
      <Navbar />
    </AuthProvider>
  );
}
