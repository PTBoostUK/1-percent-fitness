"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save, RotateCcw } from "lucide-react"
import type { ThemeSettings } from "@/lib/types/database"

interface ThemeEditorProps {
  content: ThemeSettings
  onSave: (data: ThemeSettings) => void
}

const DEFAULT_THEME = {
  primaryColor: "#3b82f6",
  secondaryColor: "#8b5cf6",
  fontFamily: "Inter",
  headingFont: "Inter",
}

export function ThemeEditor({ content, onSave }: ThemeEditorProps) {
  const [formData, setFormData] = useState({
    primaryColor: content.primaryColor || DEFAULT_THEME.primaryColor,
    secondaryColor: content.secondaryColor || DEFAULT_THEME.secondaryColor,
    fontFamily: content.fontFamily || DEFAULT_THEME.fontFamily,
    headingFont: content.headingFont || DEFAULT_THEME.headingFont,
  })

  const handleSave = () => {
    onSave({
      id: content.id,
      ...formData,
    })
  }

  const handleRevert = () => {
    if (confirm("Are you sure you want to revert to default values? This will discard all unsaved changes.")) {
      setFormData({
        primaryColor: DEFAULT_THEME.primaryColor,
        secondaryColor: DEFAULT_THEME.secondaryColor,
        fontFamily: DEFAULT_THEME.fontFamily,
        headingFont: DEFAULT_THEME.headingFont,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Theme Settings</h2>
          <p className="text-zinc-400 text-sm mt-1">Customize global styles, colors, and fonts</p>
        </div>
        <Button
          variant="outline"
          className="border-zinc-700 text-white hover:bg-zinc-800"
          onClick={handleRevert}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Revert to Default
        </Button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="primaryColor" className="text-white">
            Primary Color
          </Label>
          <div className="flex items-center gap-4">
            <Input
              id="primaryColor"
              type="text"
              value={formData.primaryColor}
              onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
              placeholder="#3b82f6"
              className="bg-zinc-950 border-zinc-800 text-white"
            />
            <input
              type="color"
              value={formData.primaryColor}
              onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
              className="w-16 h-10 rounded cursor-pointer"
            />
          </div>
          <p className="text-xs text-zinc-500">
            This color will be used for buttons, links, and accent elements
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="secondaryColor" className="text-white">
            Secondary Color
          </Label>
          <div className="flex items-center gap-4">
            <Input
              id="secondaryColor"
              type="text"
              value={formData.secondaryColor}
              onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
              placeholder="#8b5cf6"
              className="bg-zinc-950 border-zinc-800 text-white"
            />
            <input
              type="color"
              value={formData.secondaryColor}
              onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
              className="w-16 h-10 rounded cursor-pointer"
            />
          </div>
          <p className="text-xs text-zinc-500">
            This color will be used for secondary buttons, highlights, and complementary elements
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fontFamily" className="text-white">
            Body Font Family
          </Label>
          <Input
            id="fontFamily"
            type="text"
            value={formData.fontFamily}
            onChange={(e) => setFormData({ ...formData, fontFamily: e.target.value })}
            placeholder="Inter, sans-serif"
            className="bg-zinc-950 border-zinc-800 text-white"
          />
          <p className="text-xs text-zinc-500">
            Font family for body text (e.g., "Inter", "Roboto", "Open Sans")
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="headingFont" className="text-white">
            Heading Font Family
          </Label>
          <Input
            id="headingFont"
            type="text"
            value={formData.headingFont}
            onChange={(e) => setFormData({ ...formData, headingFont: e.target.value })}
            placeholder="Inter, sans-serif"
            className="bg-zinc-950 border-zinc-800 text-white"
          />
          <p className="text-xs text-zinc-500">
            Font family for headings (e.g., "Inter", "Poppins", "Montserrat")
          </p>
        </div>

        <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800">
          <h3 className="text-white font-semibold mb-2">Preview</h3>
          <div className="space-y-3">
            <div
              className="p-3 rounded-lg"
              style={{
                backgroundColor: formData.primaryColor + "20",
                borderColor: formData.primaryColor + "40",
                borderWidth: "1px",
              }}
            >
              <p
                className="text-sm"
                style={{ color: formData.primaryColor }}
              >
                Primary color preview
              </p>
            </div>
            {formData.secondaryColor && (
              <div
                className="p-3 rounded-lg"
                style={{
                  backgroundColor: formData.secondaryColor + "20",
                  borderColor: formData.secondaryColor + "40",
                  borderWidth: "1px",
                }}
              >
                <p
                  className="text-sm"
                  style={{ color: formData.secondaryColor }}
                >
                  Secondary color preview
                </p>
              </div>
            )}
            <div>
              <h4
                className="text-xl font-bold mb-2"
                style={{ fontFamily: formData.headingFont }}
              >
                Heading Preview
              </h4>
              <p
                className="text-sm text-zinc-400"
                style={{ fontFamily: formData.fontFamily }}
              >
                Body text preview using the selected font family
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={handleSave}
          className="w-full bg-primary hover:bg-primary/90 text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Theme Changes
        </Button>
      </div>
    </div>
  )
}

