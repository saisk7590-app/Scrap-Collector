import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Pencil, Plus } from 'lucide-react';

const scrapCategories = [
  {
    id: 1,
    name: 'Plastic Bottles',
    pricePerKg: '₹12',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Old Newspapers',
    pricePerKg: '₹8',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Cardboard',
    pricePerKg: '₹6',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Metal Scrap (Iron)',
    pricePerKg: '₹25',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Metal Scrap (Aluminum)',
    pricePerKg: '₹35',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Glass Bottles',
    pricePerKg: '₹5',
    status: 'Active',
  },
  {
    id: 7,
    name: 'Electronic Waste (Small)',
    pricePerKg: '₹18',
    status: 'Active',
  },
  {
    id: 8,
    name: 'Electronic Waste (Large)',
    pricePerKg: '₹45',
    status: 'Active',
  },
  {
    id: 9,
    name: 'Mixed Paper',
    pricePerKg: '₹4',
    status: 'Active',
  },
  {
    id: 10,
    name: 'Plastic Containers',
    pricePerKg: '₹15',
    status: 'Active',
  },
  {
    id: 11,
    name: 'Rubber Items',
    pricePerKg: '₹10',
    status: 'Inactive',
  },
  {
    id: 12,
    name: 'Batteries',
    pricePerKg: '₹20',
    status: 'Active',
  },
];

export function ScrapCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Scrap Categories & Pricing
          </h1>
          <p className="text-gray-500 mt-1">
            Manage scrap categories and their pricing
          </p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Scrap Category Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Price per KG (₹)
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
                {scrapCategories.map((category) => (
                  <tr key={category.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {category.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {category.pricePerKg}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        className={
                          category.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }
                      >
                        {category.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <Pencil className="w-4 h-4 mr-1" />
                          Edit Price
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={
                            category.status === 'Active'
                              ? 'text-red-600 hover:text-red-700 hover:bg-red-50'
                              : 'text-green-600 hover:text-green-700 hover:bg-green-50'
                          }
                        >
                          {category.status === 'Active' ? 'Disable' : 'Enable'}
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
