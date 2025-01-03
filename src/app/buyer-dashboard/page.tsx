"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RequestCard } from "@/components/RequestCard";
import { NewRequestForm } from "@/components/NewRequestForm";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function BuyerDashboard() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/");
      }
    };
    checkSession();
  }, [router]);

  const { data: requests, isLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return [];
      
      const { data, error } = await supabase
        .from("wd_requests")
        .select("*")
        .eq("buyer_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">My Vehicle Requests</h1>
          <Button
            onClick={() => router.push("/buyer-dashboard/new-request")}
            className="w-full sm:w-auto"
          >
            New Request
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {requests?.map((request) => (
            <RequestCard key={request.request_id} request={request} />
          ))}
          {requests?.length === 0 && (
            <p className="text-center text-gray-500">No requests found</p>
          )}
        </div>
      </div>
    </div>
  );
}