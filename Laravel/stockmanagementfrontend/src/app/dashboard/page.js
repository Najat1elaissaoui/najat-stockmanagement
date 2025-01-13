"use client";

import ProtectedRoute from "@/protected/protectedRoute";
import OverviewComponent from "@/components/dashboard/OverviewComponent";
import ChartComponent from "@/components/dashboard/ChartComponent";
import TableComponent from "@/components/dashboard/TableComponent";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      
      <OverviewComponent />

      <ChartComponent />

      <TableComponent />

    </ProtectedRoute>
  );
}
