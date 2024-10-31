"use client";

import { AdminOTPInput } from "@/components/AdminOTPInput";
import { Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function VerifyPasskey() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <Link 
          href="/" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <div className="bg-white shadow-2xl rounded-2xl p-8 space-y-6">
          <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mx-auto">
            <Shield className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Admin Verification
          </h1>
          <p className="text-center text-gray-600">
            Please enter the 6-digit passkey to access the admin area.
          </p>
          <AdminOTPInput />
          <p className="text-xs text-center text-gray-500 mt-4">
            If you dont have a passkey or are experiencing issues, please contact the system administrator.
          </p>
        </div>
      </div>
    </div>
  );
}