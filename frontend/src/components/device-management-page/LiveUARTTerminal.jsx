import React, { useState, useRef, useEffect } from 'react';

const LiveUARTTerminal = ({ terminalLogs, setTerminalLogs, appendLog, setIsRebootModalOpen }) => {
  const [cliInput, setCliInput] = useState('');
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  const execCli = () => {
    if (!cliInput.trim()) return;
    const cmd = cliInput.trim().toLowerCase();
    appendLog('USER', cmd, 'text-on-primary-fixed');
    setCliInput('');

    setTimeout(() => {
      if (cmd === 'help') {
        appendLog('CLI', 'Available commands: help, ping, adc-read, wifi-status, filter-state, reboot, clear', 'text-secondary-fixed');
      } else if (cmd === 'ping') {
        appendLog('CLI', 'ESP32 ping response: 18ms • RSSI: -54 dBm', 'text-tertiary-fixed-dim');
      } else if (cmd === 'adc-read') {
        appendLog('CLI', 'MQ135 ADC0: Raw 1744 (1.418V) | Rs/Ro: 3.58 | Cal: Optimal', 'text-tertiary-fixed-dim');
      } else if (cmd === 'wifi-status') {
        appendLog('CLI', 'SSID: AeroNet-IoT-Secure | Ch: 6 | IP: 192.168.1.142 | GW: 192.168.1.1', 'text-primary-fixed-dim');
      } else if (cmd === 'clear') {
        setTerminalLogs([]);
      } else if (cmd === 'reboot') {
        setIsRebootModalOpen(true);
      } else {
        appendLog('CLI', `Unknown command: '${cmd}'. Type 'help' for manual.`, 'text-error');
      }
    }, 300);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      execCli();
    }
  };

  return (
    <div className="lg:col-span-7 bg-inverse-surface text-inverse-on-surface p-space-lg rounded-2xl shadow-xl flex flex-col justify-between font-mono gap-space-md relative">
      <div className="flex items-center justify-between pb-space-xs border-b border-outline/30">
        <div className="flex items-center gap-space-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-error inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#f59e0b] inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-tertiary-fixed-dim inline-block"></span>
          </div>
          <span className="text-body-sm text-inverse-on-surface font-semibold">ESP32 UART0 Console • 115200 Baud</span>
        </div>
        <div className="flex items-center gap-space-xs">
          <span className="text-[11px] px-2 py-0.5 rounded bg-surface-variant/20 text-tertiary-fixed-dim">STREAMING LIVE</span>
          <button 
            className="text-inverse-on-surface/60 hover:text-inverse-on-surface text-[12px] px-2 py-0.5 rounded bg-inverse-surface/80 hover:bg-inverse-surface" 
            onClick={() => setTerminalLogs([])}
            type="button"
          >
            Clear
          </button>
        </div>
      </div>
      
      {/* Terminal Output Stream */}
      <div 
        className="flex flex-col gap-1.5 h-64 overflow-y-auto text-[12px] leading-relaxed text-inverse-on-surface/90 font-mono pr-space-xs" 
        ref={terminalRef}
      >
        {terminalLogs.map((log, index) => (
          <div key={index}>
            <span className="text-inverse-on-surface/40">{log.timeStr}</span> <span className={log.colorClass}>[{log.source}]</span> {log.message}
          </div>
        ))}
      </div>
      
      {/* CLI Command Input */}
      <div className="flex items-center gap-space-xs pt-space-xs border-t border-outline/30">
        <span className="text-tertiary-fixed-dim font-bold">&gt;</span>
        <input 
          className="bg-transparent border-0 focus:outline-none text-[13px] text-inverse-on-surface w-full placeholder-inverse-on-surface/40 font-mono" 
          onChange={(e) => setCliInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type command (e.g. 'help', 'ping', 'adc-read', 'reboot')..." 
          type="text" 
          value={cliInput}
        />
        <button 
          className="px-space-sm py-1 rounded bg-primary-fixed-dim text-on-primary-fixed text-label-md font-semibold hover:opacity-90 transition-opacity" 
          onClick={execCli}
          type="button"
        >
          Exec
        </button>
      </div>
    </div>
  );
};

export default LiveUARTTerminal;
