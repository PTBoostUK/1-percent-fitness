"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save, RotateCcw, Upload, Sparkles } from "lucide-react"
import { AIContentEditor } from "@/components/admin/ai-content-editor"
import type { HeroContent } from "@/lib/types/database"

interface HeroEditorProps {
  content: HeroContent
  onSave: (data: HeroContent) => void
}

const DEFAULT_HERO = {
  tagline: "Certified Personal Trainer",
  title: "Transform Your Body.\nElevate Your\nMind.",
  subtitle: "Build strength, confidence, and discipline with personalized training designed for men who are ready to level up.",
  buttonText: "Book Your Free Consultation",
  backgroundImage: "/athletic-male-personal-trainer-working-out-in-mode.jpg",
  stats: {
    clients: "50+",
    years: "5+",
    committed: "100%",
  },
}

export function HeroEditor({ content, onSave }: HeroEditorProps) {
  const [formData, setFormData] = useState({
    tagline: content.tagline || DEFAULT_HERO.tagline,
    title: content.title || DEFAULT_HERO.title,
    subtitle: content.subtitle || DEFAULT_HERO.subtitle,
    buttonText: content.buttonText || DEFAULT_HERO.buttonText,
    backgroundImage: content.backgroundImage || DEFAULT_HERO.backgroundImage,
    stats: {
      clients: content.stats?.clients || DEFAULT_HERO.stats.clients,
      years: content.stats?.years || DEFAULT_HERO.stats.years,
      committed: content.stats?.committed || DEFAULT_HERO.stats.committed,
    },
  })

  const [aiEditor, setAiEditor] = useState<{
    open: boolean
    field: string
    label: string
  }>({ open: false, field: "", label: "" })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave({
        id: content.id,
        ...formData,
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleRevert = () => {
    if (confirm("Are you sure you want to revert to default values? This will discard all unsaved changes.")) {
      setFormData({
        tagline: DEFAULT_HERO.tagline,
        title: DEFAULT_HERO.title,
        subtitle: DEFAULT_HERO.subtitle,
        buttonText: DEFAULT_HERO.buttonText,
        backgroundImage: DEFAULT_HERO.backgroundImage,
        stats: { ...DEFAULT_HERO.stats },
      })
    }
  }

  const handleAIApply = (newContent: string) => {
    if (aiEditor.field === "tagline") {
      setFormData({ ...formData, tagline: newContent })
    } else if (aiEditor.field === "title") {
      setFormData({ ...formData, title: newContent })
    } else if (aiEditor.field === "subtitle") {
      setFormData({ ...formData, subtitle: newContent })
    } else if (aiEditor.field === "buttonText") {
      setFormData({ ...formData, buttonText: newContent })
    }
  }

  const openAIEditor = (field: string, label: string) => {
    setAiEditor({ open: true, field, label })
  }

  const getCurrentFieldValue = () => {
    if (aiEditor.field === "tagline") return formData.tagline
    if (aiEditor.field === "title") return formData.title
    if (aiEditor.field === "subtitle") return formData.subtitle
    if (aiEditor.field === "buttonText") return formData.buttonText
    return ""
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // In a real app, you'd upload to Supabase Storage
    // For now, we'll use a placeholder
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setFormData({ ...formData, backgroundImage: result })
    }
    reader.readAsDataURL(file)
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
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-slide-down">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Hero Section</h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">Edit the main hero section content</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-zinc-700 text-white hover:bg-zinc-800 transition-smooth btn-press hover:scale-105 active:scale-95 w-full sm:w-auto"
            onClick={handleRevert}
          >
            <RotateCcw className="w-4 h-4 mr-2 transition-transform hover:rotate-180" />
            Revert to Default
          </Button>
        </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-6 space-y-6 card-hover animate-scale-in">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="tagline" className="text-white">
              Tagline
            </Label>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80 transition-smooth btn-press hover:scale-110 active:scale-95"
              onClick={() => openAIEditor("tagline", "Tagline")}
            >
              <Sparkles className="w-4 h-4 mr-1 transition-transform hover:rotate-12" />
              AI
            </Button>
          </div>
          <Input
            id="tagline"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className="bg-zinc-950 border-zinc-800 text-white input-focus transition-smooth"
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

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="buttonText" className="text-white">
              Button Text
            </Label>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80"
              onClick={() => openAIEditor("buttonText", "Button Text")}
            >
              <Sparkles className="w-4 h-4 mr-1" />
              AI
            </Button>
          </div>
          <Input
            id="buttonText"
            value={formData.buttonText}
            onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
            className="bg-zinc-950 border-zinc-800 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="backgroundImage" className="text-white">
            Background Image
          </Label>
          <div className="flex items-center gap-4">
            {formData.backgroundImage && (formData.backgroundImage.startsWith('data:') || formData.backgroundImage.startsWith('http') || formData.backgroundImage.startsWith('/')) ? (
              <div className="flex items-center gap-4 w-full">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-zinc-700 flex-shrink-0">
                  <img
                    src={formData.backgroundImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
                <div className="flex gap-2 flex-1">
                  <Input
                    id="backgroundImage"
                    type="text"
                    value={formData.backgroundImage}
                    onChange={(e) => setFormData({ ...formData, backgroundImage: e.target.value })}
                    placeholder="/path/to/image.jpg"
                    className="bg-zinc-950 border-zinc-800 text-white flex-1"
                  />
                  <label htmlFor="backgroundImage-upload" className="cursor-pointer">
                    <input
                      id="backgroundImage-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="border-zinc-700 text-white hover:bg-zinc-800"
                      onClick={() => document.getElementById('backgroundImage-upload')?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                  </label>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 w-full">
                <Input
                  id="backgroundImage"
                  type="text"
                  value={formData.backgroundImage}
                  onChange={(e) => setFormData({ ...formData, backgroundImage: e.target.value })}
                  placeholder="/path/to/image.jpg"
                  className="bg-zinc-950 border-zinc-800 text-white flex-1"
                />
                <label htmlFor="backgroundImage-upload" className="cursor-pointer">
                  <input
                    id="backgroundImage-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="border-zinc-700 text-white hover:bg-zinc-800"
                    onClick={() => document.getElementById('backgroundImage-upload')?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
          <div className="space-y-2">
            <Label htmlFor="stats-clients" className="text-white text-sm">
              Clients Stat
            </Label>
            <Input
              id="stats-clients"
              value={formData.stats.clients}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stats: { ...formData.stats, clients: e.target.value },
                })
              }
              className="bg-zinc-950 border-zinc-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stats-years" className="text-white text-sm">
              Years Stat
            </Label>
            <Input
              id="stats-years"
              value={formData.stats.years}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stats: { ...formData.stats, years: e.target.value },
                })
              }
              className="bg-zinc-950 border-zinc-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stats-committed" className="text-white text-sm">
              Committed Stat
            </Label>
            <Input
              id="stats-committed"
              value={formData.stats.committed}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stats: { ...formData.stats, committed: e.target.value },
                })
              }
              className="bg-zinc-950 border-zinc-800 text-white"
            />
          </div>
        </div>

        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-primary hover:bg-primary/90 text-white transition-smooth btn-press hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Save className={`w-4 h-4 mr-2 transition-transform ${isSaving ? 'animate-spin' : ''}`} />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
      </div>
    </>
  )
}

