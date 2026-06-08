import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { DashboardPage } from './DashboardPage';
import { ProductsPage } from './ProductsPage';
import { OrdersPage } from './OrdersPage';
import { CustomersPage } from './CustomersPage';
import { ReportsPage } from './ReportsPage';
import { SettingsPage } from './SettingsPage';
import { AdminPage, AppModule } from '../../types';
import { products, orders, customers } from '../../data';

interface AdminDashboardProps {
  onExitAdmin: () => void;
  onNavigate: (module: AppModule) => void;
}

export function AdminDashboard({ onExitAdmin, onNavigate }: AdminDashboardProps) {
  const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex">
      <AdminSidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onExitAdmin={onExitAdmin}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-60'}`}>
        <AdminHeader
          currentPage={currentPage}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className="flex-1 p-6 overflow-y-auto">
          {currentPage === 'dashboard' && <DashboardPage orders={orders} customers={customers} />}
          {currentPage === 'products' && <ProductsPage products={products} />}
          {currentPage === 'orders' && <OrdersPage orders={orders} />}
          {currentPage === 'customers' && <CustomersPage customers={customers} />}
          {currentPage === 'reports' && <ReportsPage />}
          {currentPage === 'settings' && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}
