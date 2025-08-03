import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield } from "lucide-react";

export const CyberSecurityWarning = () => {
  return (
    <Alert className="mb-6 border-destructive bg-destructive/10">
      <Shield className="h-4 w-4" />
      <AlertDescription className="text-destructive">
        <strong>CYBERSECURITY AWARENESS DEMO:</strong> This is an educational interface demonstrating potential security vulnerabilities in financial applications. Never enter real financial information on unsecured platforms.
      </AlertDescription>
    </Alert>
  );
};