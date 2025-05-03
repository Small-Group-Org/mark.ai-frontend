import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import LeftPanel from '../components/dashboard/LeftPanel';
import RightPanel from '../components/dashboard/RightPanel';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <LeftPanel />
      <RightPanel />
    </DashboardLayout>
  );
};

export default Dashboard;