import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Download, FileText } from 'lucide-react';

const reportCards = [
  {
    title: 'Daily Pickup Report',
    description: 'View daily pickup statistics and trends',
    icon: FileText,
    color: 'green',
  },
  {
    title: 'Monthly Scrap Collection',
    description: 'Total scrap collected per category this month',
    icon: FileText,
    color: 'blue',
  },
  {
    title: 'Revenue Report',
    description: 'Detailed revenue analysis and breakdown',
    icon: FileText,
    color: 'yellow',
  },
  {
    title: 'User Growth Report',
    description: 'Track user registration and activity growth',
    icon: FileText,
    color: 'purple',
  },
];

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Reports & Analytics
        </h1>
        <p className="text-gray-500 mt-1">
          Generate and download reports
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="dateFrom">Date From</Label>
              <Input
                id="dateFrom"
                type="date"
                defaultValue="2025-12-01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateTo">Date To</Label>
              <Input
                id="dateTo"
                type="date"
                defaultValue="2025-12-29"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <select
                id="city"
                className="w-full px-3 py-2 border border-gray-200 rounded-md"
              >
                <option>All Cities</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bangalore</option>
                <option>Hyderabad</option>
                <option>Chennai</option>
                <option>Pune</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Scrap Category</Label>
              <select
                id="category"
                className="w-full px-3 py-2 border border-gray-200 rounded-md"
              >
                <option>All Categories</option>
                <option>Plastic</option>
                <option>Paper</option>
                <option>Metal</option>
                <option>Glass</option>
                <option>Electronics</option>
              </select>
            </div>

            <div className="space-y-2 flex items-end">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportCards.map((report, index) => {
          const Icon = report.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-${report.color}-50 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 text-${report.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {report.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {report.description}
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 border-green-600 hover:bg-green-50"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download PDF
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 border-green-600 hover:bg-green-50"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Export CSV
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Sample Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sample Report Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Total Pickups
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Scrap Collected (kg)
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Revenue (₹)
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    New Users
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">
                    2025-12-29
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">45</td>
                  <td className="py-3 px-4 text-sm text-gray-900">2,450</td>
                  <td className="py-3 px-4 text-sm text-gray-900">₹68,500</td>
                  <td className="py-3 px-4 text-sm text-gray-900">24</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">
                    2025-12-28
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">38</td>
                  <td className="py-3 px-4 text-sm text-gray-900">2,120</td>
                  <td className="py-3 px-4 text-sm text-gray-900">₹59,800</td>
                  <td className="py-3 px-4 text-sm text-gray-900">18</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">
                    2025-12-27
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">52</td>
                  <td className="py-3 px-4 text-sm text-gray-900">2,880</td>
                  <td className="py-3 px-4 text-sm text-gray-900">₹78,200</td>
                  <td className="py-3 px-4 text-sm text-gray-900">31</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">
                    2025-12-26
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">41</td>
                  <td className="py-3 px-4 text-sm text-gray-900">2,340</td>
                  <td className="py-3 px-4 text-sm text-gray-900">₹65,300</td>
                  <td className="py-3 px-4 text-sm text-gray-900">22</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">
                    2025-12-25
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">48</td>
                  <td className="py-3 px-4 text-sm text-gray-900">2,650</td>
                  <td className="py-3 px-4 text-sm text-gray-900">₹72,400</td>
                  <td className="py-3 px-4 text-sm text-gray-900">27</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
