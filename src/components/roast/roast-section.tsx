import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Sparkles } from "lucide-react"

interface RoastSectionProps {
  onRoast: () => Promise<void>
  roast: string | null
  loading: boolean
}

export function RoastSection({ onRoast, roast, loading }: RoastSectionProps) {
  return (
    <Card className="mb-8 border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Indonesian Gemini Music Roast
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Button 
            onClick={onRoast} 
            disabled={loading} 
            variant="roast"
            className="w-full sm:w-auto self-start"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Roasting...
              </>
            ) : (
              "Roast Gue!"
            )}
          </Button>
          
          {roast && (
            <div className="mt-4 p-4 rounded-lg bg-background border-l-4 border-primary italic leading-relaxed text-lg">
              "{roast}"
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
