import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface RequestCardProps {
  request: {
    request_id: number;
    vehicle_description: string;
    additional_details?: string;
    created_at: string;
    status: string;
  };
}

export function RequestCard({ request }: RequestCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Request #{request.request_id}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}
          </p>
        </div>
        <Badge
          variant={request.status === "open" ? "default" : "secondary"}
          className="capitalize"
        >
          {request.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Vehicle Description</h3>
          <p className="text-sm text-gray-600">{request.vehicle_description}</p>
        </div>
        {request.additional_details && (
          <div>
            <h3 className="font-semibold mb-2">Additional Details</h3>
            <p className="text-sm text-gray-600">{request.additional_details}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}