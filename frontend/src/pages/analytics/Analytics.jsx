import React from 'react';
import useAnalytics from '../../hooks/useAnalytics';
import { PageLoader, PageError } from '../../components/common/Loader';
import AnalyticsHeader from '../../components/analytics-page/AnalyticsHeader';
import KPISummaryRow from '../../components/analytics-page/KPISummaryRow';
import AIDiagnosticBanner from '../../components/analytics-page/AIDiagnosticBanner';
import AQITrendsChart from '../../components/analytics-page/AQITrendsChart';
import ComplianceDonutChart from '../../components/analytics-page/ComplianceDonutChart';
import GasMatrixComposition from '../../components/analytics-page/GasMatrixComposition';
import HistoricalAnomaliesTable from '../../components/analytics-page/HistoricalAnomaliesTable';

const Analytics = () => {
  const {
    kpiSummary,
    aiDiagnostic,
    aqiTrends,
    compliance,
    gasMatrix,
    anomalies,
    loading,
    error,
    refetch,
    dateRange,
    setDateRange,
  } = useAnalytics();

  if (loading) return <PageLoader message="Loading Analytics..." />;
  if (error) return <PageError message={error} onRetry={refetch} />;

  return (
    <div className="flex flex-col w-full">
      <div className="px-space-md md:px-space-xl py-space-xl flex flex-col gap-space-xl max-w-[1440px] mx-auto w-full">
        <AnalyticsHeader dateRange={dateRange} onDateRangeChange={setDateRange} />

        <KPISummaryRow data={kpiSummary} />

        <AIDiagnosticBanner data={aiDiagnostic} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          <AQITrendsChart data={aqiTrends} />
          <ComplianceDonutChart data={compliance} />
        </div>

        <GasMatrixComposition data={gasMatrix} />

        <HistoricalAnomaliesTable data={anomalies} />
      </div>
    </div>
  );
};

export default Analytics;
