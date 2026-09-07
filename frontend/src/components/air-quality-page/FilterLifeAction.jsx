import React from 'react';

const FilterLifeAction = () => {
  const handleReset = () => {
    if (window.confirm('AeroPulse Security Check: Confirm resetting HEPA & Carbon filter telemetry timers back to 100%?')) {
      alert('Filter operational hours cycle reset. Calibration profile updated.');
    }
  };

  const handleOrder = () => {
    alert('Navigating to genuine AeroPulse OEM Cartridge selection (H13 True HEPA + Honeycomb Charcoal Dual-Pack).');
  };

  return (
    <div className="lg:col-span-4 bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm flex flex-col justify-between">
      <div className="flex flex-col gap-space-2xs">
        <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Consumable Lifecycle</span>
        <h3 className="font-headline-sm text-headline-sm text-on-surface">Remaining Lifespan</h3>
      </div>
      
      <div className="my-space-lg flex flex-col items-center justify-center text-center p-space-md bg-surface-container-low rounded-xl">
        <div className="flex items-baseline gap-1">
          <span className="font-telemetry-value-lg text-telemetry-value-lg text-primary tracking-tight">142</span>
          <span className="font-headline-sm text-headline-sm text-on-surface">Days</span>
        </div>
        <span className="font-body-md text-body-md text-on-surface-variant mt-1">Est. replacement: October 18, 2025</span>
        <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden mt-space-md">
          <div className="bg-primary h-full rounded-full" style={{ width: '78%' }}></div>
        </div>
      </div>
      
      {/* Order & Reset Action CTAs */}
      <div className="flex flex-col gap-space-sm">
        <button 
          className="w-full flex items-center justify-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-space-sm px-space-md rounded-xl transition-all shadow-sm" 
          onClick={handleOrder}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
          <span>Order Replacement Filters</span>
        </button>
        <button 
          className="w-full flex items-center justify-center gap-space-xs bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md py-space-sm px-space-md rounded-xl transition-all" 
          onClick={handleReset}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">restart_alt</span>
          <span>Reset Filter Counter</span>
        </button>
      </div>
    </div>
  );
};

export default FilterLifeAction;
