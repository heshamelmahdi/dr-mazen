import Link from "next/link";

export default function SubscriptionExpiredPage() {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-amber-600 mb-4">Subscription Expired</h1>
        <p className="text-gray-600 mb-8">
          Your subscription has expired. Please contact your nutrition doctor to renew your subscription and regain access to your program.
        </p>
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 