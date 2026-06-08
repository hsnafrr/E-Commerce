import React, { useState } from 'react';
import { Save, Bell, Shield, CreditCard, Globe, Store } from 'lucide-react';

const sections = [
  { id: 'store', label: 'Store Info', icon: Store },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'regional', label: 'Regional', icon: Globe },
];

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState('store');
  const [saved, setSaved] = useState(false);
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'ShopNest',
    storeEmail: 'hello@shopnest.com',
    storePhone: '+1 (555) 000-1234',
    storeAddress: '123 Commerce St, New York, NY 10001',
    currency: 'USD',
    timezone: 'America/New_York',
  });
  const [notifications, setNotifications] = useState({
    newOrder: true,
    lowStock: true,
    newCustomer: false,
    weeklyReport: true,
    marketing: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {/* Sidebar nav */}
      <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-3 h-fit">
        {sections.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-[10px] text-sm font-medium transition-all mb-1 ${
              activeSection === id
                ? 'bg-orange-50 text-[#FF6B00]'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="md:col-span-3 space-y-5">
        {activeSection === 'store' && (
          <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-6">
            <h3 className="text-base font-bold text-gray-900 mb-5">Store Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Store Name</label>
                  <input
                    value={storeSettings.storeName}
                    onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Store Email</label>
                  <input
                    value={storeSettings.storeEmail}
                    onChange={(e) => setStoreSettings({ ...storeSettings, storeEmail: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone</label>
                  <input
                    value={storeSettings.storePhone}
                    onChange={(e) => setStoreSettings({ ...storeSettings, storePhone: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Currency</label>
                  <select
                    value={storeSettings.currency}
                    onChange={(e) => setStoreSettings({ ...storeSettings, currency: e.target.value })}
                    className="input-field"
                  >
                    {['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Store Address</label>
                <input
                  value={storeSettings.storeAddress}
                  onChange={(e) => setStoreSettings({ ...storeSettings, storeAddress: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Timezone</label>
                <select
                  value={storeSettings.timezone}
                  onChange={(e) => setStoreSettings({ ...storeSettings, timezone: e.target.value })}
                  className="input-field"
                >
                  {['America/New_York', 'America/Los_Angeles', 'America/Chicago', 'Europe/London', 'Asia/Tokyo'].map((tz) => (
                    <option key={tz}>{tz}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-6">
            <h3 className="text-base font-bold text-gray-900 mb-5">Notification Preferences</h3>
            <div className="space-y-4">
              {[
                { key: 'newOrder', label: 'New Order Alerts', desc: 'Notify when a new order is placed' },
                { key: 'lowStock', label: 'Low Stock Warnings', desc: 'Alert when product stock falls below 10 units' },
                { key: 'newCustomer', label: 'New Customer Registration', desc: 'Notify when new customers sign up' },
                { key: 'weeklyReport', label: 'Weekly Summary Report', desc: 'Receive weekly performance digest' },
                { key: 'marketing', label: 'Marketing Emails', desc: 'Promotions and campaign notifications' },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, [key]: !notifications[key as keyof typeof notifications] })}
                    className={`relative w-11 h-6 rounded-full transition-all duration-200 ${
                      notifications[key as keyof typeof notifications] ? 'bg-[#FF6B00]' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
                      notifications[key as keyof typeof notifications] ? 'left-6' : 'left-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'security' && (
          <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-6">
            <h3 className="text-base font-bold text-gray-900 mb-5">Security Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Current Password</label>
                <input type="password" placeholder="Enter current password" className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">New Password</label>
                <input type="password" placeholder="Enter new password" className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Confirm New Password</label>
                <input type="password" placeholder="Confirm new password" className="input-field" />
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-[10px] p-4">
                <p className="text-xs text-blue-700">Two-factor authentication is <strong>enabled</strong> for your account.</p>
              </div>
            </div>
          </div>
        )}

        {(activeSection === 'payments' || activeSection === 'regional') && (
          <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-6">
            <h3 className="text-base font-bold text-gray-900 mb-3">
              {activeSection === 'payments' ? 'Payment Configuration' : 'Regional Settings'}
            </h3>
            <div className="text-center py-10 text-gray-400">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                {activeSection === 'payments' ? <CreditCard size={20} /> : <Globe size={20} />}
              </div>
              <p className="text-sm">Settings for this section coming soon.</p>
            </div>
          </div>
        )}

        {/* Save button */}
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-[10px] transition-all ${
            saved
              ? 'bg-green-500 text-white'
              : 'bg-[#FF6B00] hover:bg-[#E65F00] text-white hover:shadow-md'
          }`}
        >
          <Save size={16} />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
