import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import DashboardSection from '@/components/DashboardSection';
import StarRating from '@/components/StarRating';
import { vendorChartConfig } from '@/data';
import type { Application } from '@/types';
import { getReputationMap } from '@/utils';

interface AnalyticsSectionProps {
  applicants: Application[];
}

// Counts how many times each hirer has been approved across all applications
// Returns Map<hirerId, approvedCount>
const getTimesSelectedMap = (applicants: Application[]) => {
  const map = new Map<string, number>();

  for (const a of applicants) {
    if (a.status === 'approved') {
      map.set(a.hirerId, (map.get(a.hirerId) ?? 0) + 1);
    }
  }

  return map;
};

const AnalyticsSection = ({ applicants }: AnalyticsSectionProps) => {
  // Count approved applications per hirer — recalculates when applicants list changes
  const timesSelectedMap = useMemo(() => getTimesSelectedMap(applicants), [applicants]);

  // Load average reputation per hirer from hire_history — computed once on mount
  const reputationMap = useMemo(getReputationMap, []);

  // Deduplicate hirers so each hirer only appears once in the chart
  const uniqueHirers = useMemo(() => {
    const seen = new Set<string>();

    return applicants.filter((applicant) => {
      if (seen.has(applicant.hirerId)) return false;

      seen.add(applicant.hirerId);
      return true;
    });
  }, [applicants]);

  // Build chart data — one entry per unique hirer, sorted by approval count descending
  const chartData = useMemo(
    () =>
      [...uniqueHirers]
        .map((a) => ({
          hirerId: a.hirerId,
          // Use first name only to keep chart labels short
          name: (a.hirerName ?? a.hirerId).split(' ')[0],
          times: timesSelectedMap.get(a.hirerId) ?? 0,
          reputation: reputationMap.get(a.hirerId) ?? 0,
        }))
        .sort((a, b) => b.times - a.times),
    [uniqueHirers, timesSelectedMap, reputationMap],
  );

  // Most chosen — first item after sorting by times descending
  const mostSelected = chartData[0];

  // Least chosen — lowest approved count, excluding hirers with zero approvals
  const leastSelected = [...chartData]
    .filter((d) => d.times > 0)
    .sort((a, b) => a.times - b.times)[0];

  // Rejected applicants — applications with status 'rejected'
  // These are hirers whose applications were explicitly rejected by the vendor
  const rejectedApplicants = useMemo(
    () => applicants.filter((a) => a.status === 'rejected'),
    [applicants],
  );

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
            value="rejected"
            className="data-[state=active]:bg-secondary h-full rounded-xl px-3 text-xs data-[state=active]:text-white"
          >
            Rejected
          </TabsTrigger>
        </TabsList>

        <div className="h-70">
          {/* Tab 1 — Bar chart of approval frequency per hirer */}
          <TabsContent value="chart">
            <p className="mb-3 text-xs text-gray-400">
              Hirers sorted by how many times they've been approved across all applications.
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
                  shape={(props: any) => {
                    const { x, y, width, height, index } = props;
                    // Gradient coloring: darkest for most selected, lightest for rest
                    const fill = index === 0 ? '#491f7a' : index === 1 ? '#894eef' : '#c4a8f7';
                    return (
                      <rect x={x} y={y} width={width} height={height} fill={fill} rx={8} ry={8} />
                    );
                  }}
                />
              </BarChart>
            </ChartContainer>
          </TabsContent>

          {/* Tab 2 — Most and least chosen hirer highlights */}
          <TabsContent value="highlights">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {/* Most chosen hirer */}
              <div className="space-y-1 rounded-2xl border border-green-100 bg-green-50 px-4 py-4">
                <p className="text-xs font-semibold tracking-widest text-green-600 uppercase">
                  Most Selected
                </p>
                <p className="text-lg font-bold text-green-800">{mostSelected?.name ?? '—'}</p>
                <p className="text-sm text-green-700">{mostSelected?.times ?? 0} times selected</p>
                {mostSelected && <StarRating value={mostSelected.reputation} />}
              </div>

              {/* Least chosen hirer — only among those approved at least once */}
              <div className="space-y-1 rounded-2xl border border-yellow-100 bg-yellow-50 px-4 py-4">
                <p className="text-xs font-semibold tracking-widest text-yellow-600 uppercase">
                  Least Selected
                </p>
                <p className="text-lg font-bold text-yellow-800">{leastSelected?.name ?? '—'}</p>
                <p className="text-sm text-yellow-700">
                  {leastSelected?.times ?? 0} times selected
                </p>
                {leastSelected && <StarRating value={leastSelected.reputation} />}
              </div>
            </div>
          </TabsContent>

          {/* Tab 3 — Hirers whose applications were explicitly rejected */}
          <TabsContent value="rejected">
            {rejectedApplicants.length === 0 ? (
              <p className="text-sm text-gray-400">No rejected applicants.</p>
            ) : (
              <div className="space-y-2">
                {rejectedApplicants.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-2xl border border-red-100 bg-red-50/60 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold">{a.hirerName ?? a.hirerId}</p>
                      <p className="text-xs text-gray-400">
                        {a.eventName} · {a.date}
                      </p>
                    </div>
                    <StarRating value={reputationMap.get(a.hirerId) ?? 0} />
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
