import { BarChart, Bar, XAxis, YAxis } from 'recharts';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import DashboardSection from '@/components/DashboardSection';
import StarRating from '@/components/StarRating';
import { vendorChartConfig } from '@/data';
import type { Applicant } from '@/types';

interface AnalyticsSectionProps {
  applicants: Applicant[];
}

const AnalyticsSection = ({ applicants }: AnalyticsSectionProps) => {
  // ── Only process applicants that have vendor-facing fields populated ──
  const vendorApplicants = applicants.filter(
    (a) => a.name !== undefined && a.timesSelected !== undefined,
  );

  const chartData = [...vendorApplicants]
    .sort((a, b) => b.timesSelected - a.timesSelected)
    .map((a, i) => ({
      name: a.name.split(' ')[0],
      times: a.timesSelected,
      fill: i === 0 ? '#491f7a' : i === 1 ? '#894eef' : '#c4a8f7',
    }));

  const mostSelected = chartData[0];
  const leastSelected = [...chartData]
    .filter((d) => d.times > 0)
    .sort((a, b) => a.times - b.times)[0];
  const neverSelected = vendorApplicants.filter((a) => a.timesSelected === 0);
  const findApplicant = (firstName: string) =>
    vendorApplicants.find((a) => a.name.startsWith(firstName));

  return (
    <DashboardSection number="iii" title="Hirer Analytics">
      <Tabs defaultValue="chart">
        <TabsList className="mb-4 rounded-xl bg-purple-50 p-0">
          <TabsTrigger
            value="chart"
            className="data-[state=active]:bg-secondary h-full! rounded-xl px-3 text-xs data-[state=active]:text-white"
          >
            Selection Frequency
          </TabsTrigger>
          <TabsTrigger
            value="highlights"
            className="data-[state=active]:bg-secondary h-full! rounded-xl px-3 text-xs data-[state=active]:text-white"
          >
            Highlights
          </TabsTrigger>
          <TabsTrigger
            value="never"
            className="data-[state=active]:bg-secondary h-full rounded-xl px-3 text-xs data-[state=active]:text-white"
          >
            Never Selected
          </TabsTrigger>
        </TabsList>

        <div className="h-70">
          <TabsContent value="chart">
            <p className="mb-3 text-xs text-gray-400">
              Hirers sorted by how many times they've been selected across all vendors.
            </p>
            <ChartContainer config={vendorChartConfig} className="h-60 w-full">
              <BarChart data={chartData} barSize={36}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={24}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="times"
                  radius={[8, 8, 0, 0]}
                  fill="#c4a8f7"
                  shape={(props: any) => {
                    const { x, y, width, height, index } = props;
                    const fill = index === 0 ? '#491f7a' : index === 1 ? '#894eef' : '#c4a8f7';
                    return (
                      <rect x={x} y={y} width={width} height={height} fill={fill} rx={8} ry={8} />
                    );
                  }}
                />
              </BarChart>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="highlights">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="space-y-1 rounded-2xl border border-green-100 bg-green-50 px-4 py-4">
                <p className="text-xs font-semibold tracking-widest text-green-600 uppercase">
                  Most Selected
                </p>
                <p className="text-lg font-bold text-green-800">{mostSelected?.name ?? '—'}</p>
                <p className="text-sm text-green-700">{mostSelected?.times ?? 0} times selected</p>
                {mostSelected && findApplicant(mostSelected.name) && (
                  <StarRating value={findApplicant(mostSelected.name)!.reputation} />
                )}
              </div>
              <div className="space-y-1 rounded-2xl border border-yellow-100 bg-yellow-50 px-4 py-4">
                <p className="text-xs font-semibold tracking-widest text-yellow-600 uppercase">
                  Least Selected
                </p>
                <p className="text-lg font-bold text-yellow-800">{leastSelected?.name ?? '—'}</p>
                <p className="text-sm text-yellow-700">
                  {leastSelected?.times ?? 0} times selected
                </p>
                {leastSelected && findApplicant(leastSelected.name) && (
                  <StarRating value={findApplicant(leastSelected.name)!.reputation} />
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="never">
            {neverSelected.length === 0 ? (
              <p className="text-sm text-gray-400">All hirers have been selected at least once.</p>
            ) : (
              <div className="space-y-2">
                {neverSelected.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-2xl border border-purple-100 bg-purple-50/60 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold">{a.name}</p>
                      <p className="text-xs text-gray-400">
                        {a.eventType} · {a.date}
                      </p>
                    </div>
                    <StarRating value={a.reputation} />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </DashboardSection>
  );
};

export default AnalyticsSection;
