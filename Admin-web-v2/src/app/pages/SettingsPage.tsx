import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export function SettingsPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your application settings</p>
      </div>

      {/* App Settings */}
      <Card>
        <CardHeader>
          <CardTitle>App Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="minPickup">Minimum Pickup Quantity (kg)</Label>
              <Input
                id="minPickup"
                type="number"
                defaultValue="15"
                placeholder="Enter minimum pickup quantity"
              />
              <p className="text-xs text-gray-500">
                Users must have at least this amount of scrap to schedule a pickup
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="commissionRate">Admin Commission Rate (%)</Label>
              <Input
                id="commissionRate"
                type="number"
                defaultValue="10"
                placeholder="Enter commission rate"
              />
              <p className="text-xs text-gray-500">
                Percentage commission on each transaction
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxDistance">Maximum Pickup Distance (km)</Label>
              <Input
                id="maxDistance"
                type="number"
                defaultValue="20"
                placeholder="Enter maximum distance"
              />
              <p className="text-xs text-gray-500">
                Maximum distance from collection center for pickup service
              </p>
            </div>

            <Button className="bg-green-600 hover:bg-green-700">
              Save App Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Admin Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="adminName">Full Name</Label>
              <Input
                id="adminName"
                type="text"
                defaultValue="Admin User"
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminEmail">Email Address</Label>
              <Input
                id="adminEmail"
                type="email"
                defaultValue="admin@scrapcollector.com"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminPhone">Phone Number</Label>
              <Input
                id="adminPhone"
                type="tel"
                defaultValue="+91 98765 43210"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Enter current password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
              />
            </div>

            <Button className="bg-green-600 hover:bg-green-700">
              Update Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Info */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">App Version</span>
              <span className="text-sm font-medium text-gray-900">v2.1.0</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Last Updated</span>
              <span className="text-sm font-medium text-gray-900">
                December 15, 2025
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Total Users</span>
              <span className="text-sm font-medium text-gray-900">2,845</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-600">Database Status</span>
              <span className="text-sm font-medium text-green-600">
                Connected
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logout Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Sign Out</h3>
              <p className="text-sm text-gray-500 mt-1">
                Sign out from your admin account
              </p>
            </div>
            <Button
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
