"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AdminDashboardProps {
  stats: {
    userCount: number;
    videoCount: number;
    recipeCount: number;
    questionCount: number;
  };
  recentActivity: Array<{
    type: string;
    user: { name: string; email: string };
    createdAt: Date;
    message: string;
    questionId?: string;
    videoId?: string;
  }>;
}

export default function AdminDashboard({ stats, recentActivity }: AdminDashboardProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          title="Users" 
          value={stats.userCount.toString()} 
          icon="👤" 
          href="/dashboard/user-management"
          color="bg-blue-500" 
        />
        <StatCard 
          title="Program Videos" 
          value={stats.videoCount.toString()} 
          icon="🎬" 
          href="/dashboard/program"
          color="bg-green-500" 
        />
        <StatCard 
          title="Recipes" 
          value={stats.recipeCount.toString()} 
          icon="🍲" 
          href="/dashboard/recipes"
          color="bg-orange-500" 
        />
        <StatCard 
          title="Pending Questions" 
          value={stats.questionCount.toString()} 
          icon="❓" 
          href="/dashboard/qna"
          color="bg-purple-500" 
        />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentActivity activity={recentActivity} />
            </CardContent>
          </Card>
        </div>
        
        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <QuickActionButton 
                label="Add New User" 
                href="/dashboard/user-management/create" 
                icon="👤" 
              />
              <QuickActionButton 
                label="Upload Program Video" 
                href="/dashboard/program/create" 
                icon="🎬" 
              />
              <QuickActionButton 
                label="Add New Recipe" 
                href="/dashboard/recipes/create" 
                icon="🍲" 
              />
              <QuickActionButton 
                label="Create Q&A Entry" 
                href="/dashboard/qna/create" 
                icon="❓" 
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  href: string;
  color: string;
}

function StatCard({ title, value, icon, href, color }: StatCardProps) {
  return (
    <Link href={href} className="block">
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className={`h-1 ${color}`}></div>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              <p className="text-2xl font-bold mt-1">{value}</p>
            </div>
            <div className="text-3xl">{icon}</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

interface QuickActionButtonProps {
  label: string;
  href: string;
  icon: string;
}

function QuickActionButton({ label, href, icon }: QuickActionButtonProps) {
  return (
    <Link href={href}>
      <Button variant="ghost" className="w-full justify-start" size="lg">
        <div className="flex items-center">
          <span className="text-xl mr-3">{icon}</span>
          <span>{label}</span>
        </div>
      </Button>
    </Link>
  );
}

interface RecentActivityProps {
  activity: Array<{
    type: string;
    user: { name: string; email: string };
    createdAt: Date;
    message: string;
    questionId?: string;
    videoId?: string;
  }>;
}

function RecentActivity({ activity }: RecentActivityProps) {
  if (activity.length === 0) {
    return <p className="text-muted-foreground">No recent activity</p>;
  }

  return (
    <div className="space-y-4">
      {activity.map((item, index) => (
        <div key={index} className="flex items-start space-x-4 border-b pb-4 last:border-0">
          {item.type === "NEW_USER" && <div className="text-2xl">👤</div>}
          {item.type === "QUESTION" && <div className="text-2xl">❓</div>}
          {item.type === "VIDEO_PROGRESS" && <div className="text-2xl">🎬</div>}
          
          <div className="flex-1">
            <div className="flex justify-between">
              <p className="font-medium">{item.user.name}</p>
              <time className="text-sm text-muted-foreground">
                {formatDate(item.createdAt)}
              </time>
            </div>
            <p className="text-sm text-muted-foreground">{item.message}</p>
          </div>
          
          {item.type === "QUESTION" && item.questionId && (
            <Link href={`/dashboard/qna?questionId=${item.questionId}`}>
              <Button variant="outline" size="sm">View</Button>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
} 