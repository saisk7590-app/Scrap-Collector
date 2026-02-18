import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Search, Eye } from 'lucide-react';

const pickupRequests = [
  {
    id: 'PR001',
    userName: 'Rajesh Kumar',
    scrapCategory: 'Plastic Bottles',
    estimatedWeight: '15 kg',
    address: '123, MG Road, Mumbai - 400001',
    scheduledDate: '2025-12-30',
    status: 'Requested',
  },
  {
    id: 'PR002',
    userName: 'Priya Sharma',
    scrapCategory: 'Old Newspapers',
    estimatedWeight: '25 kg',
    address: '456, Connaught Place, Delhi - 110001',
    scheduledDate: '2025-12-30',
    status: 'Assigned',
  },
  {
    id: 'PR003',
    userName: 'Amit Patel',
    scrapCategory: 'Metal Scrap',
    estimatedWeight: '40 kg',
    address: '789, CG Road, Ahmedabad - 380009',
    scheduledDate: '2025-12-29',
    status: 'In Progress',
  },
  {
    id: 'PR004',
    userName: 'Sneha Reddy',
    scrapCategory: 'Electronic Waste',
    estimatedWeight: '8 kg',
    address: '321, Banjara Hills, Hyderabad - 500034',
    scheduledDate: '2025-12-29',
    status: 'Completed',
  },
  {
    id: 'PR005',
    userName: 'Vikram Singh',
    scrapCategory: 'Glass Bottles',
    estimatedWeight: '12 kg',
    address: '654, MI Road, Jaipur - 302001',
    scheduledDate: '2025-12-28',
    status: 'Completed',
  },
  {
    id: 'PR006',
    userName: 'Anjali Desai',
    scrapCategory: 'Cardboard Boxes',
    estimatedWeight: '30 kg',
    address: '987, FC Road, Pune - 411004',
    scheduledDate: '2025-12-28',
    status: 'Cancelled',
  },
  {
    id: 'PR007',
    userName: 'Rahul Verma',
    scrapCategory: 'Plastic Containers',
    estimatedWeight: '18 kg',
    address: '147, Indiranagar, Bangalore - 560038',
    scheduledDate: '2025-12-31',
    status: 'Requested',
  },
  {
    id: 'PR008',
    userName: 'Kavita Iyer',
    scrapCategory: 'Mixed Paper',
    estimatedWeight: '22 kg',
    address: '258, T Nagar, Chennai - 600017',
    scheduledDate: '2025-12-31',
    status: 'Assigned',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Requested':
      return 'bg-blue-100 text-blue-700';
    case 'Assigned':
      return 'bg-purple-100 text-purple-700';
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-700';
    case 'Completed':
      return 'bg-green-100 text-green-700';
    case 'Cancelled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export function PickupRequestsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Pickup Requests Management
        </h1>
        <p className="text-gray-500 mt-1">
          View and manage all pickup requests
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Pickup Requests</CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search requests..."
                  className="pl-9 w-64"
                />
              </div>
              <select className="px-3 py-2 border border-gray-200 rounded-md text-sm">
                <option>All Status</option>
                <option>Requested</option>
                <option>Assigned</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Cancelled</option>
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
                    Pickup ID
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    User Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Scrap Category
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Est. Weight
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Pickup Address
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Scheduled Date
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
                {pickupRequests.map((request) => (
                  <tr key={request.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {request.id}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {request.userName}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {request.scrapCategory}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {request.estimatedWeight}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">
                      {request.address}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {request.scheduledDate}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
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
                        <select className="px-2 py-1 border border-gray-200 rounded text-xs">
                          <option>Change Status</option>
                          <option>Requested</option>
                          <option>Assigned</option>
                          <option>In Progress</option>
                          <option>Completed</option>
                          <option>Cancelled</option>
                        </select>
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
