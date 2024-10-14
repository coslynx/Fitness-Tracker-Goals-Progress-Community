'use client'

import React, { useState, useEffect } from 'react';
import { RecentActivityProps } from '@/types/dashboard';
import { fetchRecentActivity } from '@/lib/api/client';
import { formatDate } from '@/lib/utils/formatters';
import { Spinner } from '@/presentation/components/ui/Spinner';
import { Card } from '@/presentation/components/ui/Card';
import { Button } from '@/presentation/components/ui/Button';
import { useSession } from 'next-auth/react';

interface RecentActivityProps {
  recentActivity: any[]; // Assuming recentActivity is an array of objects with date, type, and description values
}

const RecentActivity: React.FC<RecentActivityProps> = ({ recentActivity }) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      setIsLoading(true);
      fetchRecentActivity(session.user.id)
        .then((data) => {
          // Update recentActivity state with fetched data
          // ...
        })
        .catch((error) => {
          // Handle errors in fetching recent activity
          // ...
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [session]);

  // Function to handle deleting a recent activity item
  const handleDeleteActivity = (activityId: string) => {
    // Implement logic to delete activity from the database and update state
    // ...
  };

  return (
    <Card className="mt-4">
      <h3 className="text-lg font-bold mb-2">Recent Activity</h3>
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className="space-y-3">
          {recentActivity.length > 0 ? (
            recentActivity.map((activity) => (
              <li key={activity.id} className="flex justify-between">
                <div>
                  <p className="text-gray-700 text-sm font-medium">
                    {formatDate(activity.date)} - {activity.type}
                  </p>
                  <p className="text-gray-500 text-sm">{activity.description}</p>
                </div>
                <Button
                  variant="tertiary"
                  onClick={() => handleDeleteActivity(activity.id)}
                >
                  Delete
                </Button>
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-sm">No recent activity yet.</li>
          )}
        </ul>
      )}
    </Card>
  );
};

export default RecentActivity;