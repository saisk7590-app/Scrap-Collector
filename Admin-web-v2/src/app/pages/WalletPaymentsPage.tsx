import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

const summaryStats = [
  {
    title: 'Total Admin Earnings',
    value: '₹4,58,900',
    icon: Wallet,
    trend: '+18.4%',
    color: 'green',
  },
  {
    title: 'Total Paid to Users',
    value: '₹2,84,650',
    icon: TrendingDown,
    trend: '+12.3%',
    color: 'blue',
  },
  {
    title: 'Pending Payments',
    value: '₹45,200',
    icon: TrendingUp,
    trend: '-5.2%',
    color: 'yellow',
  },
];

const transactions = [
  {
    id: 'TXN001',
    userName: 'Rajesh Kumar',
    amount: '₹2,450',
    type: 'Credit',
    date: '2025-12-29',
    status: 'Completed',
  },
  {
    id: 'TXN002',
    userName: 'Priya Sharma',
    amount: '₹1,820',
    type: 'Debit',
    date: '2025-12-29',
    status: 'Completed',
  },
  {
    id: 'TXN003',
    userName: 'Amit Patel',
    amount: '₹3,150',
    type: 'Credit',
    date: '2025-12-28',
    status: 'Pending',
  },
  {
    id: 'TXN004',
    userName: 'Sneha Reddy',
    amount: '₹890',
    type: 'Debit',
    date: '2025-12-28',
    status: 'Completed',
  },
  {
    id: 'TXN005',
    userName: 'Vikram Singh',
    amount: '₹4,220',
    type: 'Credit',
    date: '2025-12-27',
    status: 'Completed',
  },
  {
    id: 'TXN006',
    userName: 'Anjali Desai',
    amount: '₹1,560',
    type: 'Debit',
    date: '2025-12-27',
    status: 'Completed',
  },
  {
    id: 'TXN007',
    userName: 'Rahul Verma',
    amount: '₹2,980',
    type: 'Credit',
    date: '2025-12-26',
    status: 'Completed',
  },
  {
    id: 'TXN008',
    userName: 'Kavita Iyer',
    amount: '₹750',
    type: 'Debit',
    date: '2025-12-26',
    status: 'Failed',
  },
  {
    id: 'TXN009',
    userName: 'Manoj Gupta',
    amount: '₹3,450',
    type: 'Credit',
    date: '2025-12-25',
    status: 'Completed',
  },
  {
    id: 'TXN010',
    userName: 'Divya Nair',
    amount: '₹1,200',
    type: 'Debit',
    date: '2025-12-25',
    status: 'Pending',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-700';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'Failed':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export function WalletPaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Wallet & Payments
        </h1>
        <p className="text-gray-500 mt-1">
          Track all transactions and payments
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryStats.map((stat, index) => {
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
                    <p className="text-sm text-green-600 mt-2">{stat.trend} from last month</p>
                  </div>
                  <div
                    className={`w-12 h-12 bg-${stat.color}-50 rounded-lg flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Transaction Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Transaction ID
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    User Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Amount (₹)
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {transaction.id}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {transaction.userName}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {transaction.amount}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        className={
                          transaction.type === 'Credit'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }
                      >
                        {transaction.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {transaction.date}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
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
