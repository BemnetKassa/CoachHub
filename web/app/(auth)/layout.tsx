import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center relative">
      <Link href="/" className="absolute top-8 left-8 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors">
        <MoveLeft className="w-4 h-4" />
        Back to Home
      </Link>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Coach<span className="text-indigo-600">Hub</span>
            </h1>
          </Link>
        </div>
        
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
}
