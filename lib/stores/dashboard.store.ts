/**
 * Dashboard Store
 * Zustand store for dashboard data and metrics
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { api } from '@/lib/api';

interface DashboardMetrics {
    totalRevenue: number;
    totalExpenses: number;
    netProfit: number;
    revenueTrend: string;
    expensesTrend: string;
    profitTrend: string;
}

interface RecentActivity {
    id: string;
    description: string;
    amount: number;
    type: 'debit' | 'credit';
    date: string;
    status: string;
    category?: string;
}

interface ChartDataPoint {
    date: string;
    revenue: number;
    expenses: number;
}

interface DashboardState {
    // State
    metrics: DashboardMetrics | null;
    recentActivity: RecentActivity[];
    chartData: ChartDataPoint[];
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchMetrics: () => Promise<void>;
    fetchRecentActivity: () => Promise<void>;
    fetchChartData: (period?: string) => Promise<void>;
    fetchAll: () => Promise<void>;
    clearError: () => void;
    reset: () => void;
}

const initialState = {
    metrics: null,
    recentActivity: [],
    chartData: [],
    isLoading: false,
    error: null,
};

// Helper to calculate metrics from ledger data
const calculateMetricsFromLedger = (ledgerAccounts: any[]): DashboardMetrics => {
    // TODO: This is a temporary solution until backend provides dashboard endpoint
    // Calculate totals from ledger accounts
    const revenue = ledgerAccounts
        .filter(acc => acc.type === 'INCOME')
        .reduce((sum, acc) => sum + (acc.balance || 0), 0);

    const expenses = ledgerAccounts
        .filter(acc => acc.type === 'EXPENSE')
        .reduce((sum, acc) => sum + (acc.balance || 0), 0);

    const netProfit = revenue - expenses;

    return {
        totalRevenue: revenue,
        totalExpenses: expenses,
        netProfit: netProfit,
        revenueTrend: '+12.5%', // TODO: Calculate from historical data
        expensesTrend: '+4.2%',
        profitTrend: '+18.2%',
    };
};

export const useDashboardStore = create<DashboardState>()(
    devtools(
        (set, get) => ({
            ...initialState,

            fetchMetrics: async () => {
                set({ isLoading: true, error: null });
                try {
                    // TODO: Replace with actual dashboard metrics endpoint when available
                    // For now, calculate from ledger data
                    const ledgerAccounts = await api.ledger.list();
                    const metrics = calculateMetricsFromLedger(ledgerAccounts);

                    set({ metrics, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to fetch dashboard metrics',
                        isLoading: false
                    });
                    throw error;
                }
            },

            fetchRecentActivity: async () => {
                set({ isLoading: true, error: null });
                try {
                    // TODO: Replace with actual recent activity endpoint when available
                    // For now, use ledger accounts as placeholder
                    const ledgerAccounts = await api.ledger.list();

                    const recentActivity: RecentActivity[] = ledgerAccounts.slice(0, 5).map((acc: any) => ({
                        id: acc.id?.toString() || acc.uuid,
                        description: acc.name || 'Transaction',
                        amount: acc.balance || 0,
                        type: acc.type === 'INCOME' ? 'credit' : 'debit',
                        date: new Date().toISOString().split('T')[0],
                        status: 'cleared',
                        category: acc.type,
                    }));

                    set({ recentActivity, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to fetch recent activity',
                        isLoading: false
                    });
                    throw error;
                }
            },

            fetchChartData: async (period: string = '7d') => {
                set({ isLoading: true, error: null });
                try {
                    // TODO: Replace with actual chart data endpoint when available
                    // For now, generate sample data based on period
                    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
                    const chartData: ChartDataPoint[] = Array.from({ length: days }, (_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() - (days - i - 1));
                        return {
                            date: date.toISOString().split('T')[0],
                            revenue: Math.floor(Math.random() * 100000) + 50000,
                            expenses: Math.floor(Math.random() * 50000) + 20000,
                        };
                    });

                    set({ chartData, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to fetch chart data',
                        isLoading: false
                    });
                    throw error;
                }
            },

            fetchAll: async () => {
                set({ isLoading: true, error: null });
                try {
                    await Promise.all([
                        get().fetchMetrics(),
                        get().fetchRecentActivity(),
                        get().fetchChartData(),
                    ]);
                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to fetch dashboard data',
                        isLoading: false
                    });
                    throw error;
                }
            },

            clearError: () => {
                set({ error: null });
            },

            reset: () => {
                set(initialState);
            },
        }),
        { name: 'DashboardStore' }
    )
);
