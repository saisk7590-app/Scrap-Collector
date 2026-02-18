import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Search, Eye, Ban } from 'lucide-react';

const users = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    city: 'Mumbai',
    walletBalance: '₹2,450',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    phone: '+91 98765 43211',
    city: 'Delhi',
    walletBalance: '₹1,820',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Amit Patel',
    phone: '+91 98765 43212',
    city: 'Ahmedabad',
    walletBalance: '₹3,150',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    phone: '+91 98765 43213',
    city: 'Hyderabad',
    walletBalance: '₹890',
    status: 'Blocked',
  },
  {
    id: 5,
    name: 'Vikram Singh',
    phone: '+91 98765 43214',
    city: 'Jaipur',
    walletBalance: '₹4,220',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Anjali Desai',
    phone: '+91 98765 43215',
    city: 'Pune',
    walletBalance: '₹1,560',
    status: 'Active',
  },
  {
    id: 7,
    name: 'Rahul Verma',
    phone: '+91 98765 43216',
    city: 'Bangalore',
    walletBalance: '₹2,980',
    status: 'Active',
  },
  {
    id: 8,
    name: 'Kavita Iyer',
    phone: '+91 98765 43217',
    city: 'Chennai',
    walletBalance: '₹750',
    status: 'Active',
  },
];

export function UserManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">User Management</h1>
        <p className="text-gray-500 mt-1">Manage all registered users</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Users</CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search by name or phone..."
                  className="pl-9 w-64"
                />
              </div>
              <select className="px-3 py-2 border border-gray-200 rounded-md text-sm">
                <option>All Status</option>
                <option>Active</option>
                <option>Blocked</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    User Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Phone Number
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    City
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Wallet Balance
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {user.phone}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {user.city}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {user.walletBalance}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        className={
                          user.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={
                            user.status === 'Active'
                              ? 'text-red-600 hover:text-red-700 hover:bg-red-50'
                              : 'text-green-600 hover:text-green-700 hover:bg-green-50'
                          }
                        >
                          <Ban className="w-4 h-4 mr-1" />
                          {user.status === 'Active' ? 'Block' : 'Unblock'}
                        </Button>
                      </div>
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
