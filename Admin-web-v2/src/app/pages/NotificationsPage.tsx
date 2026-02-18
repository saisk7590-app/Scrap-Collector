import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Send } from 'lucide-react';

const previousNotifications = [
  {
    id: 1,
    title: 'New Pricing Update',
    message: 'Updated rates for plastic items. Check the new pricing for better earnings!',
    sentTo: 'All Users',
    date: '2025-12-28',
  },
  {
    id: 2,
    title: 'System Maintenance',
    message: 'The app will be under maintenance from 2 AM to 4 AM tonight.',
    sentTo: 'All Users',
    date: '2025-12-27',
  },
  {
    id: 3,
    title: 'Pickup Reminder',
    message: 'You have a scheduled pickup tomorrow. Please keep your scrap ready!',
    sentTo: 'Selected Users',
    date: '2025-12-26',
  },
  {
    id: 4,
    title: 'Payment Credited',
    message: 'Your payment of ₹2,450 has been credited to your wallet.',
    sentTo: 'Selected Users',
    date: '2025-12-25',
  },
  {
    id: 5,
    title: 'Welcome Bonus',
    message: 'Welcome! Get ₹50 bonus on your first scrap pickup.',
    sentTo: 'All Users',
    date: '2025-12-24',
  },
];

export function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Notifications Management
        </h1>
        <p className="text-gray-500 mt-1">
          Send notifications to users
        </p>
      </div>

      {/* Send Notification Form */}
      <Card>
        <CardHeader>
          <CardTitle>Send New Notification</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Notification Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter notification title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter your message here..."
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sendTo">Send To</Label>
              <select
                id="sendTo"
                className="w-full px-3 py-2 border border-gray-200 rounded-md"
              >
                <option>All Users</option>
                <option>Selected Users</option>
              </select>
            </div>

            <Button className="bg-green-600 hover:bg-green-700">
              <Send className="w-4 h-4 mr-2" />
              Send Notification
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Previous Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Previous Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {previousNotifications.map((notification) => (
              <div
                key={notification.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs text-gray-500">
                        Sent to: <span className="font-medium">{notification.sentTo}</span>
                      </span>
                      <span className="text-xs text-gray-500">
                        {notification.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
