"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Plus, X, RotateCcw, Sparkles } from "lucide-react"
import { AIContentEditor } from "@/components/admin/ai-content-editor"
import type { ServicesContent } from "@/lib/types/database"

interface ServicesEditorProps {
  content: ServicesContent
  onSave: (data: ServicesContent) => void
}

const DEFAULT_SERVICES = {
  badge: "Services",
  title: "Training Programs",
  subtitle: "Choose the program that fits your lifestyle and goals",
  services: [
    {
      id: "1",
      title: "1-on-1 Coaching",
      description: "Personalized in-person training sessions tailored to your goals, fitness level, and schedule. Get hands-on guidance and real-time feedback.",
      icon: "Dumbbell",
      order: 0,
    },
    {
      id: "2",
      title: "Online Training",
      description: "Custom workout programs delivered digitally with video demonstrations, progress tracking, and weekly check-ins to keep you accountable.",
      icon: "Laptop",
      order: 1,
    },
    {
      id: "3",
      title: "Custom Meal Plans",
      description: "Nutrition strategies designed for your lifestyle and goals. Learn how to fuel your body properly for maximum results and sustained energy.",
      icon: "UtensilsCrossed",
      order: 2,
    },
  ],
}

export function ServicesEditor({ content, onSave }: ServicesEditorProps) {
  const [formData, setFormData] = useState({
    badge: content.badge || DEFAULT_SERVICES.badge,
    title: content.title || DEFAULT_SERVICES.title,
    subtitle: content.subtitle || DEFAULT_SERVICES.subtitle,
    services: content.services || DEFAULT_SERVICES.services,
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
        badge: DEFAULT_SERVICES.badge,
        title: DEFAULT_SERVICES.title,
        subtitle: DEFAULT_SERVICES.subtitle,
        services: DEFAULT_SERVICES.services.map(s => ({ ...s })),
      })
    }
  }

  const addService = () => {
    setFormData({
      ...formData,
      services: [
        ...formData.services,
        { id: `temp-${Date.now()}`, title: "", description: "", order: formData.services.length },
      ],
    })
  }

  const removeService = (index: number) => {
    setFormData({
      ...formData,
      services: formData.services.filter((_, i) => i !== index),
    })
  }

  const [aiEditor, setAiEditor] = useState<{
    open: boolean
    field: string
    label: string
    serviceIndex?: number
    serviceField?: "title" | "description"
  }>({ open: false, field: "", label: "" })

  const handleAIApply = (newContent: string) => {
    if (aiEditor.field === "badge") {
      setFormData({ ...formData, badge: newContent })
    } else if (aiEditor.field === "title") {
      setFormData({ ...formData, title: newContent })
    } else if (aiEditor.field === "subtitle") {
      setFormData({ ...formData, subtitle: newContent })
    } else if (aiEditor.field === "service" && aiEditor.serviceIndex !== undefined && aiEditor.serviceField) {
      const newServices = [...formData.services]
      newServices[aiEditor.serviceIndex] = {
        ...newServices[aiEditor.serviceIndex],
        [aiEditor.serviceField]: newContent,
      }
      setFormData({ ...formData, services: newServices })
    }
  }

  const openAIEditor = (field: string, label: string, serviceIndex?: number, serviceField?: "title" | "description") => {
    setAiEditor({ open: true, field, label, serviceIndex, serviceField })
  }

  const getCurrentFieldValue = () => {
    if (aiEditor.field === "badge") return formData.badge
    if (aiEditor.field === "title") return formData.title
    if (aiEditor.field === "subtitle") return formData.subtitle
    if (aiEditor.field === "service" && aiEditor.serviceIndex !== undefined && aiEditor.serviceField) {
      return formData.services[aiEditor.serviceIndex]?.[aiEditor.serviceField] || ""
    }
    return ""
  }

  return (
    <>
      <AIContentEditor
        open={aiEditor.open}
        onOpenChange={(open) => setAiEditor({ ...aiEditor, open })}
        currentContent={getCurrentFieldValue()}
        fieldLabel={aiEditor.label}
        onApply={handleAIApply}
      />
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Services Section</h2>
          <p className="text-zinc-400 text-sm mt-1">Edit the services section content</p>
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
          <div className="flex items-center justify-between">
            <Label htmlFor="badge" className="text-white">
              Badge
            </Label>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80"
              onClick={() => openAIEditor("badge", "Badge")}
            >
              <Sparkles className="w-4 h-4 mr-1" />
              AI
            </Button>
          </div>
          <Input
            id="badge"
            value={formData.badge}
            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
            className="bg-zinc-950 border-zinc-800 text-white"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="title" className="text-white">
              Title
            </Label>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80"
              onClick={() => openAIEditor("title", "Title")}
            >
              <Sparkles className="w-4 h-4 mr-1" />
              AI
            </Button>
          </div>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="bg-zinc-950 border-zinc-800 text-white"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="subtitle" className="text-white">
              Subtitle
            </Label>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80"
              onClick={() => openAIEditor("subtitle", "Subtitle")}
            >
              <Sparkles className="w-4 h-4 mr-1" />
              AI
            </Button>
          </div>
          <Input
            id="subtitle"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="bg-zinc-950 border-zinc-800 text-white"
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-zinc-800">
          <div className="flex items-center justify-between">
            <Label className="text-white">Services</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addService}
              className="border-zinc-700 text-white hover:bg-zinc-800"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>

          {formData.services.map((service, index) => (
            <div key={service.id || index} className="space-y-3 p-4 bg-zinc-950 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Service {index + 1}</span>
                {formData.services.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeService(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Title</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80 h-6 px-2"
                    onClick={() => openAIEditor("service", `Service ${index + 1} Title`, index, "title")}
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    <span className="text-xs">AI</span>
                  </Button>
                </div>
                <Input
                  placeholder="Service title"
                  value={service.title}
                  onChange={(e) => {
                    const newServices = [...formData.services]
                    newServices[index].title = e.target.value
                    setFormData({ ...formData, services: newServices })
                  }}
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Description</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80 h-6 px-2"
                    onClick={() => openAIEditor("service", `Service ${index + 1} Description`, index, "description")}
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    <span className="text-xs">AI</span>
                  </Button>
                </div>
                <Textarea
                  placeholder="Service description"
                  value={service.description}
                  onChange={(e) => {
                    const newServices = [...formData.services]
                    newServices[index].description = e.target.value
                    setFormData({ ...formData, services: newServices })
                  }}
                  className="bg-zinc-900 border-zinc-800 text-white min-h-20"
                />
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={handleSave}
          className="w-full bg-primary hover:bg-primary/90 text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
      </div>
    </>
  )
}

