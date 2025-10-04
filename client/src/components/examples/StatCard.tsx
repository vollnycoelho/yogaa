import { StatCard } from '../StatCard';
import { Calendar } from 'lucide-react';

export default function StatCardExample() {
  return (
    <div className="p-8 max-w-xs">
      <StatCard
        title="Total Bookings"
        value={247}
        icon={Calendar}
        description="+12% from last month"
      />
    </div>
  );
}
