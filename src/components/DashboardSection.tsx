import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardSectionProps {
  number: string;
  title: string;
  badge?: React.ReactNode; // optional
  children: React.ReactNode;
}

const DashboardSection = ({ number, title, badge, children }: DashboardSectionProps) => {
  return (
    <Card className="border-purple-100 px-2 py-6">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-primary flex items-center gap-2 text-base">
            <span className="bg-secondary flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold text-white">
              {number}
            </span>
            {title}
          </CardTitle>

          {badge}
        </div>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default DashboardSection;
