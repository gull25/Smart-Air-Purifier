import React from 'react';
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const isHistorical = payload.some(p => p.dataKey === 'aqiHistorical');
    const isForecast = payload.some(p => p.dataKey === 'aqiForecast' && p.value !== null);
    
    // Now point has both
    
    return (
      <div className="bg-surface-container-high text-on-surface p-space-sm rounded-lg shadow-md border border-outline-variant font-sans">
        <p className="font-label-md mb-1 text-on-surface-variant font-semibold">{label}</p>
        
        {payload.map((entry, index) => {
          if (entry.value == null) return null;
          
          let name = entry.name;
          let color = entry.color;
          if (entry.dataKey === 'aqiHistorical') name = 'Historical AQI';
          if (entry.dataKey === 'aqiForecast') name = 'Projected AQI';
          if (entry.dataKey === 'aqiUpper') name = 'Upper Bound';
          if (entry.dataKey === 'aqiLower') name = 'Lower Bound';
          
          return (
            <p key={index} style={{ color }} className="font-body-sm flex justify-between gap-4">
              <span>{name}:</span>
              <span className="font-mono font-bold">{entry.value}</span>
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

const ForecastChart = ({ data }) => {
  const { peakAqi = 0, currentAqi = 0, peakTime = '0', dampenPercent = 0, series = [] } = data || {};

  return (
    <div className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm flex flex-col gap-space-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-space-xs">
            <h2 className="font-headline-md text-headline-md text-on-surface">Dual-Domain AQI Temporal Trajectory</h2>
            <span className="px-space-xs py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-caps text-label-caps uppercase">Telemetry + Inference</span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Real-time ESP32 MQ135 readings linked directly into forward LSTM projection window</p>
        </div>
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-space-md font-body-sm text-body-sm text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span className="w-3 h-1 bg-[#006194] rounded-full"></span>
            <span>Historical Sensor</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 border-t-2 border-dashed border-amber-500"></span>
            <span>Projected Trend</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-2 bg-amber-400/20 rounded"></span>
            <span>87% Confidence Band</span>
          </div>
        </div>
      </div>

      {/* Dynamic Recharts Chart Canvas */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[760px] w-full h-80 relative">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={series}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <defs>
                <linearGradient id="histArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#006194" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#006194" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dae2fd" />
              <XAxis 
                dataKey="time" 
                tick={{ fill: '#707881', fontSize: 12, fontFamily: 'sans-serif' }}
                tickMargin={10}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                domain={[0, Math.max(150, peakAqi + 20)]}
                tick={{ fill: '#707881', fontSize: 12, fontFamily: 'sans-serif' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => Math.round(val)}
              />
              <Tooltip content={<CustomTooltip />} />

              {/* Baseline references */}
              <ReferenceLine y={50} stroke="#6ffbbe" strokeDasharray="3 3" opacity={0.8}>
              </ReferenceLine>
              
              <ReferenceLine y={100} stroke="#dae2fd" strokeDasharray="4 4" opacity={0.5}>
              </ReferenceLine>

              {/* Historical Area */}
              <Area
                type="monotone"
                dataKey="aqiHistorical"
                stroke="none"
                fill="url(#histArea)"
                isAnimationActive={false}
              />

              {/* Confidence Band Area (Upper/Lower) */}
              {/* To do a band in Recharts, we can use an Area with dataKey representing an array [lower, upper] */}
              <Area 
                type="monotone" 
                dataKey={(data) => (data.aqiForecast !== null ? [data.aqiLower, data.aqiUpper] : null)} 
                stroke="none" 
                fill="#f59e0b" 
                fillOpacity={0.15} 
                isAnimationActive={false}
              />

              {/* Historical Line */}
              <Line
                type="monotone"
                dataKey="aqiHistorical"
                stroke="#006194"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 6, fill: '#006194' }}
                isAnimationActive={false}
              />

              {/* Forecast Line */}
              <Line
                type="monotone"
                dataKey="aqiForecast"
                stroke="#d97706"
                strokeWidth={3}
                strokeDasharray="6 4"
                dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 6, fill: '#f59e0b' }}
                isAnimationActive={false}
              />

            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Live Context Callout below chart */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-space-md rounded-xl bg-surface-container gap-space-sm">
        <div className="flex items-center gap-space-sm">
          <span className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">insights</span>
          </span>
          <p className="font-body-md text-body-md text-on-surface">
            <span className="font-semibold text-on-surface">Simulated Trajectory:</span> Atmospheric load set to crest at <strong>AQI {peakAqi}</strong> in {peakTime} mins due to localized volatile vapor influx. Auto-remediation will dampen peak by <strong>{dampenPercent}%</strong> if engaged.
          </p>
        </div>
        <span className="font-label-caps text-label-caps text-secondary whitespace-nowrap uppercase tracking-wider font-bold">Autopilot Active</span>
      </div>
    </div>
  );
};

export default ForecastChart;
