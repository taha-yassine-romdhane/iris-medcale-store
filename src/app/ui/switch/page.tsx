"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SwitchDemo() {
  const [airplaneMode, setAirplaneMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [marketing, setMarketing] = useState(false)

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold mb-6">Switch Component Demo</h1>

      {/* Basic Switch */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Basic Switch</h2>
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" checked={airplaneMode} onCheckedChange={setAirplaneMode} />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
      </div>

      {/* Switch with Description */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Switch with Description</h2>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
            <div className="grid gap-1.5">
              <Label htmlFor="notifications">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications about important updates and events.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Disabled Switch */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Disabled Switch</h2>
        <div className="flex items-center space-x-2">
          <Switch id="disabled" disabled />
          <Label htmlFor="disabled">Disabled</Label>
        </div>
      </div>

      {/* Switch with Form */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Switch in a Form</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="marketing" checked={marketing} onCheckedChange={setMarketing} />
            <div className="grid gap-1.5">
              <Label htmlFor="marketing">Marketing emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about new products, features, and more.
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Save preferences
          </button>
        </form>
      </div>

      {/* State Display */}
      <div className="mt-8 p-4 bg-muted rounded-md">
        <h2 className="text-lg font-semibold mb-2">Current State:</h2>
        <pre className="text-sm">
          {JSON.stringify(
            {
              airplaneMode,
              notifications,
              marketing,
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  )
}
