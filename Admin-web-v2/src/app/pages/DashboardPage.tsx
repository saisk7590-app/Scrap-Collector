import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Users,
  Truck,
  TrendingUp,
  Recycle,
  Wallet,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const stats = [
  {
    title: 'Total Users',
    value: '2,845',
    icon: Users,
    trend: '+12.5%',
    trendUp: true,
  },
  {
    title: "Today's Pickup Requests",
    value: '45',
    icon: Truck,
    trend: '+8.2%',
    trendUp: true,
  },
  {
    title: 'Pending Pickups',
    value: '23',
    icon: TrendingUp,
    trend: '-5.1%',
    trendUp: false,
  },
  {
    title: 'Completed Pickups',
    value: '186',
    icon: Recycle,
    trend: '+15.3%',
    trendUp: true,
  },
  {
    title: 'Total Scrap Collected (kg)',
    value: '15,240',
    icon: Recycle,
    trend: '+22.8%',
    trendUp: true,
  },
  {
    title: 'Total Revenue (₹)',
    value: '₹4,58,900',
    icon: Wallet,
    trend: '+18.4%',
    trendUp: true,
  },
];

const dailyPickupsData = [
  { day: 'Mon', pickups: 32 },
  { day: 'Tue', pickups: 45 },
  { day: 'Wed', pickups: 38 },
  { day: 'Thu', pickups: 52 },
  { day: 'Fri', pickups: 48 },
  { day: 'Sat', pickups: 61 },
  { day: 'Sun', pickups: 55 },
];

const scrapCategoryData = [
  { name: 'Plastic', value: 35, color: '#22c55e' },
  { name: 'Paper', value: 25, color: '#3b82f6' },
  { name: 'Metal', value: 20, color: '#f59e0b' },
  { name: 'Glass', value: 12, color: '#ef4444' },
  { name: 'Electronics', value: 8, color: '#8b5cf6' },
];

const recentActivities = [
  {
    id: 'PID001',
    userName: 'Rajesh Kumar',
    scrapType: 'Plastic Bottles',
    status: 'Completed',
    date: '2025-12-29',
  },
  {
    id: 'PID002',
    userName: 'Priya Sharma',
    scrapType: 'Old Newspapers',
    status: 'In Progress',
    date: '2025-12-29',
  },
  {
    id: 'PID003',
    userName: 'Amit Patel',
    scrapType: 'Metal Scrap',
    status: 'Pending',
    date: '2025-12-28',
  },
  {
    id: 'PID004',
    userName: 'Sneha Reddy',
    scrapType: 'Electronic Waste',
    status: 'Completed',
    date: '2025-12-28',
  },
  {
    id: 'PID005',
    userName: 'Vikram Singh',
    scrapType: 'Glass Bottles',
    status: 'Cancelled',
    date: '2025-12-27',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-700';
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-700';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'Cancelled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                    <p
                      className={`text-sm mt-2 ${
                        stat.trendUp ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {stat.trend} from last week
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Pickups</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyPickupsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="pickups" fill="#22c55e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Scrap Categories Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={scrapCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {scrapCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Pickup ID
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    User Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Scrap Type
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentActivities.map((activity) => (
                  <tr key={activity.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {activity.id}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {activity.userName}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {activity.scrapType}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {activity.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
