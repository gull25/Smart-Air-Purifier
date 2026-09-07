import React, { useState } from 'react';
import useDevice from '../../hooks/useDevice';
import { PageLoader, PageError } from '../../components/common/Loader';
import DeviceManagementHeader from '../../components/device-management-page/DeviceManagementHeader';
import MainNodeProfile from '../../components/device-management-page/MainNodeProfile';
import PeripheralModules from '../../components/device-management-page/PeripheralModules';
import GatewayConfig from '../../components/device-management-page/GatewayConfig';
import LiveUARTTerminal from '../../components/device-management-page/LiveUARTTerminal';
import DiagnosticAlertBanner from '../../components/device-management-page/DiagnosticAlertBanner';
import RebootModal from '../../components/device-management-page/RebootModal';

const INITIAL_LOGS = [
  { timeStr: '[00:14:02:18]', source: 'ESP-IDF', message: 'Boot completed. ESP-IDF v4.4-patch2. Core clock: 240MHz.', colorClass: 'text-primary-fixed-dim' },
  { timeStr: '[00:14:02:19]', source: 'WIFI',    message: 'Station connected to AeroNet-IoT-Secure. IP: 192.168.1.142. RSSI: -54 dBm.', colorClass: 'text-primary-fixed-dim' },
  { timeStr: '[00:14:02:20]', source: 'MQTT',    message: 'Connected to broker.aeropulse.internal:8883 with TLS 1.3.', colorClass: 'text-secondary-fixed' },
  { timeStr: '[00:14:03:01]', source: 'ADC',     message: 'Sample buffer synchronized. Baseline V0: 1.422V. Drift: +0.02%.', colorClass: 'text-tertiary-fixed-dim' },
  { timeStr: '[00:14:03:10]', source: 'TELEMETRY', message: 'Packet sent (384 bytes) -> topic: aeropulse/node-04/telemetry', colorClass: 'text-primary-fixed-dim' },
  { timeStr: '[00:14:03:15]', source: 'FAN',     message: 'PWM target 65% received via AI Edge agent. Tach: 1820 RPM.', colorClass: 'text-secondary-fixed' },
  { timeStr: '[00:14:03:22]', source: 'I2C',     message: 'DP sensor 0x48 delta: 14.2 Pa (Filter optimal, 92% lifetime).', colorClass: 'text-primary-fixed-dim' },
  { timeStr: '[00:14:03:30]', source: 'MQTT',    message: 'Ping acknowledgment from broker (18ms RTT).', colorClass: 'text-primary-fixed-dim' },
];

const DeviceManagement = () => {
  const { status, nodeProfile, peripherals, gatewayConfig, diagnostics, loading, error, refetch } = useDevice();

  // Terminal state is purely local UI — it does not belong in the data layer
  const [isRebootModalOpen, setIsRebootModalOpen] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState(INITIAL_LOGS);

  const appendLog = (source, message, colorClass) => {
    const now = new Date();
    const timeStr = `[00:14:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}]`;
    setTerminalLogs((prev) => [...prev, { timeStr, source, message, colorClass }]);
  };

  if (loading) return <PageLoader message="Loading Device Telemetry..." />;
  if (error) return <PageError message={error} onRetry={refetch} />;

  return (
    <div className="flex flex-col w-full relative">
      <div className="max-w-[1440px] w-full mx-auto px-space-md md:px-page-pad-desktop py-space-xl flex flex-col gap-space-xl">
        <DeviceManagementHeader setIsRebootModalOpen={setIsRebootModalOpen} appendLog={appendLog} data={status} />

        <MainNodeProfile appendLog={appendLog} data={nodeProfile} />

        <PeripheralModules appendLog={appendLog} data={peripherals} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          <GatewayConfig data={gatewayConfig} />
          <LiveUARTTerminal
            terminalLogs={terminalLogs}
            setTerminalLogs={setTerminalLogs}
            appendLog={appendLog}
            setIsRebootModalOpen={setIsRebootModalOpen}
          />
        </div>

        <DiagnosticAlertBanner data={diagnostics} />
      </div>

      <RebootModal isRebootModalOpen={isRebootModalOpen} setIsRebootModalOpen={setIsRebootModalOpen} appendLog={appendLog} />
    </div>
  );
};

export default DeviceManagement;
