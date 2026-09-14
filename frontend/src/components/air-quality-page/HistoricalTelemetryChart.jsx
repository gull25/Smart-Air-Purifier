import React, { useState, useEffect } from 'react';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchHistoricalTelemetry } from '../../services/analyticsService';

const HistoricalTelemetryChart = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24 Hours');
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const timeframes = ['1 Hour', '6 Hours', '24 Hours', '7 Days', 'Custom'];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchHistoricalTelemetry(selectedTimeframe);
        setChartData(data);
      } catch (err) {
        console.error('Failed to load historical telemetry:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [selectedTimeframe]);

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm flex flex-col gap-space-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex flex-col">
          <div className="flex items-center gap-space-xs text-primary font-label-caps uppercase">
            <span className="material-symbols-outlined text-[16px]">show_chart</span>
            <span>Correlated Environmental Trends</span>
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface">AQI Timeline &amp; Autonomous HVAC Response</h2>
        </div>
        
        {/* Timeframe Selectors */}
        <div className="flex flex-wrap items-center bg-surface-container-low p-1 rounded-xl w-full sm:w-auto">
          {timeframes.map((tf) => (
            <button
              key={tf}
              className={`px-space-md py-space-xs rounded-lg font-label-md text-label-md transition-all ${
                selectedTimeframe === tf
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
              onClick={() => setSelectedTimeframe(tf)}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      
      {/* Chart Legend */}
      <div className="flex flex-wrap items-center gap-space-lg text-body-sm text-on-surface-variant">
        <div className="flex items-center gap-space-xs">
          <span className="w-3 h-1 rounded-full bg-primary"></span>
          <span className="font-label-md text-label-md text-on-surface">AQI Multi-Sensor Composite</span>
        </div>
        <div className="flex items-center gap-space-xs">
          <span className="w-3 h-1 rounded-full bg-secondary"></span>
          <span className="font-label-md text-label-md text-on-surface">MQ135 Gas Analog Index (Normalized)</span>
        </div>
        <div className="flex items-center gap-space-xs">
          <span className="w-4 h-0 border-b-[3px] border-dashed border-tertiary"></span>
          <span className="font-label-md text-label-md text-on-surface">Purifier CFM Adjustment / Speed</span>
        </div>
      </div>
      
      {/* Dynamic Recharts Graph */}
      <div className="w-full h-72 py-space-sm relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-surface-container-low/40 rounded-xl">
             <span className="material-symbols-outlined text-[32px] text-primary animate-spin">sync</span>
          </div>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="aqiAreaGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#006194" stopOpacity={0.32}/>
                  <stop offset="100%" stopColor="#006194" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dae2fd" strokeOpacity={0.2} />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#707881' }} dy={10} minTickGap={30} />
              <YAxis yAxisId="left" domain={[0, 150]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#707881' }} ticks={[0, 50, 100, 150]} />
              
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#1e1e1e', color: '#fff' }}
                itemStyle={{ fontSize: '12px' }}
                labelStyle={{ color: '#707881', fontSize: '12px', marginBottom: '4px' }}
              />
              
              <Area yAxisId="left" type="monotone" dataKey="aqi" name="AQI Composite" fill="url(#aqiAreaGrad)" stroke="#006194" strokeWidth={3.5} />
              <Line yAxisId="left" type="monotone" dataKey="mq135" name="MQ135 Gas Index" stroke="#006a61" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              <Line yAxisId="left" type="stepAfter" dataKey="fanSpeed" name="Fan Speed %" stroke="#006947" strokeWidth={2} strokeDasharray="4 4" dot={false} activeDot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-surface-container-low/40 rounded-xl text-on-surface-variant">
            No telemetry data available for this timeframe.
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low text-body-sm text-on-surface-variant mt-space-md">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-primary text-[20px]">psychology</span>
          <span><strong>AI Inference:</strong> Automated pattern recognition is tracking historical peaks for predictive modelling.</span>
        </div>
        <span className="font-label-caps text-label-caps text-tertiary uppercase">Active Sync</span>
      </div>
    </div>
  );
};

export default HistoricalTelemetryChart;
