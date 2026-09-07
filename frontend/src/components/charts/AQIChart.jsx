import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';

const AQIChart = ({ data }) => {
  const { series, gas, co2, pm25 } = data || {};

  return (
    <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Real-Time AQI &amp; Gas Dynamics</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Past 2 Hours Continuous Telemetry + 30-Minute Machine Learning Extrapolation</p>
        </div>
        <div className="flex items-center gap-space-sm font-label-caps text-label-caps">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-primary"></span>
            <span className="text-on-surface-variant">Recorded AQI</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-b-2 border-dashed border-error"></span>
            <span className="text-error">Predicted (+30m)</span>
          </div>
        </div>
      </div>
      <div className="w-full h-72 py-space-sm">
        {series && series.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="aqi-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#006194" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#006194" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dae2fd" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#707881' }} dy={10} />
              <YAxis domain={[0, 'dataMax + 20']} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#707881' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                labelStyle={{ color: '#707881', fontSize: '12px', marginBottom: '4px' }}
              />
              
              {/* Recorded Data Line */}
              <Line 
                type="monotone" 
                dataKey="aqi" 
                stroke="#006194" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 6, fill: '#006194', stroke: '#fff', strokeWidth: 2 }}
                name="Recorded AQI"
              />
              
              {/* Predicted Data Line */}
              <Line 
                type="monotone" 
                dataKey="predictedAqi" 
                stroke="#ba1a1a" 
                strokeWidth={3} 
                strokeDasharray="5 5"
                dot={{ r: 4, fill: '#ba1a1a', stroke: '#fff', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: '#ba1a1a', stroke: '#fff', strokeWidth: 2 }}
                name="Predicted AQI"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
            Waiting for telemetry data...
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-space-sm pt-space-sm">
        <div className="flex items-center gap-2 p-space-xs rounded-lg bg-surface-container-low">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant">{gas?.name || 'MQ135 Gas'}</span>
            <span className="font-label-md text-label-md text-on-surface font-semibold">{gas?.value || 0} {gas?.unit}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 p-space-xs rounded-lg bg-surface-container-low">
          <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant">{co2?.name || 'CO2'}</span>
            <span className="font-label-md text-label-md text-on-surface font-semibold">{co2?.value || 0} {co2?.unit}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 p-space-xs rounded-lg bg-surface-container-low">
          <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant">{pm25?.name || 'PM2.5 Estimate'}</span>
            <span className="font-label-md text-label-md text-on-surface font-semibold">{pm25?.value || 0} {pm25?.unit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AQIChart;
