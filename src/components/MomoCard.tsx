import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { CreditCard, Smartphone, Wifi } from "lucide-react";

const MTNLogo = () => (
  <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
    MTN
  </div>
);

interface CardData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  phoneNumber: string;
}

export const MomoCard = () => {
  const [cardData, setCardData] = useState<CardData>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    phoneNumber: ""
  });
  
  const [isLinked, setIsLinked] = useState(false);
  const [airtimeAmount, setAirtimeAmount] = useState("");
  const [dataPackage, setDataPackage] = useState("");

  const handleCardLink = () => {
    // Store card data (for demo purposes only)
    localStorage.setItem('momo-card-data', JSON.stringify({
      ...cardData,
      timestamp: new Date().toISOString()
    }));
    
    setIsLinked(true);
    toast.success("Credit card linked successfully to MTN MoMo!");
  };

  const handleAirtimePurchase = () => {
    if (!airtimeAmount) {
      toast.error("Please enter airtime amount");
      return;
    }
    toast.success(`Airtime of UGX ${airtimeAmount} purchased successfully!`);
    setAirtimeAmount("");
  };

  const handleDataPurchase = () => {
    if (!dataPackage) {
      toast.error("Please select a data package");
      return;
    }
    toast.success(`${dataPackage} data package purchased successfully!`);
    setDataPackage("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
        <MTNLogo />
        <div>
          <h1 className="text-2xl font-bold">MoMo Card</h1>
          <p className="text-sm opacity-90">Link your card to MTN Mobile Money</p>
        </div>
      </div>

      <div className="container mx-auto p-4 max-w-2xl">
        <Tabs defaultValue="link" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="link">Link Card</TabsTrigger>
            <TabsTrigger value="airtime">Buy Airtime</TabsTrigger>
            <TabsTrigger value="data">Buy Data</TabsTrigger>
          </TabsList>

          <TabsContent value="link">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Link Your Credit Card
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLinked ? (
                  <div className="text-center py-8">
                    <div className="text-primary text-6xl mb-4">✓</div>
                    <p className="text-lg font-semibold">Card Successfully Linked!</p>
                    <p className="text-muted-foreground">You can now purchase airtime and data</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="phone">MTN Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="07XXXXXXXX"
                        value={cardData.phoneNumber}
                        onChange={(e) => setCardData({...cardData, phoneNumber: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardData.cardNumber}
                        onChange={(e) => setCardData({...cardData, cardNumber: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={cardData.expiryDate}
                          onChange={(e) => setCardData({...cardData, expiryDate: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cardData.cvv}
                          onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name">Cardholder Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={cardData.cardholderName}
                        onChange={(e) => setCardData({...cardData, cardholderName: e.target.value})}
                      />
                    </div>
                    
                    <Button onClick={handleCardLink} className="w-full">
                      Link Card to MoMo
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="airtime">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Buy Airtime
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="airtime">Amount (UGX)</Label>
                  <Input
                    id="airtime"
                    placeholder="Enter amount"
                    value={airtimeAmount}
                    onChange={(e) => setAirtimeAmount(e.target.value)}
                  />
                </div>
                <Button onClick={handleAirtimePurchase} className="w-full" disabled={!isLinked}>
                  {!isLinked ? "Link Card First" : "Buy Airtime"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5" />
                  Buy Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Data Package</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {["100MB - UGX 1,000", "500MB - UGX 3,000", "1GB - UGX 5,000", "3GB - UGX 10,000"].map((pkg) => (
                      <Button
                        key={pkg}
                        variant={dataPackage === pkg ? "default" : "outline"}
                        onClick={() => setDataPackage(pkg)}
                        className="justify-start"
                      >
                        {pkg}
                      </Button>
                    ))}
                  </div>
                </div>
                <Button onClick={handleDataPurchase} className="w-full" disabled={!isLinked}>
                  {!isLinked ? "Link Card First" : "Buy Data Package"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};