"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Upload, Sparkles, RotateCcw } from "lucide-react"
import { AIContentEditor } from "@/components/admin/ai-content-editor"
import type { AboutContent } from "@/lib/types/database"

interface AboutEditorProps {
  content: AboutContent
  onSave: (data: AboutContent) => void
}

const DEFAULT_ABOUT = {
  badge: "Your Transformation Partner",
  title: "Welcome to 1% Fitness",
  description: "Certified Personal Trainer specializing in helping men build muscle, strength, and unshakeable discipline.",
  paragraph1: "We've dedicated our mission to transforming lives through evidence-based training and personalized coaching. We don't just help you build muscle—we help you build the mindset and habits that create lasting change.",
  paragraph2: "Whether you're starting your fitness journey or pushing past a plateau, we'll be with you every step of the way, providing the accountability, expertise, and support you need to succeed.",
  features: [
    { title: "Personalized Programming", description: "Custom plans designed for your goals and lifestyle" },
    { title: "Proven Track Record", description: "200+ successful transformations and counting" },
    { title: "Continuous Support", description: "24/7 access and accountability when you need it most" },
  ],
  stats: {
    years: "5+",
    clients: "200+",
    results: "100%",
  },
  certifications: {
    certification: "Level 3 PT Diploma",
    specialization: "Strength & Hypertrophy",
  },
  image: "/professional-male-personal-trainer-portrait-athlet.jpg",
}

export function AboutEditor({ content, onSave }: AboutEditorProps) {
  const [formData, setFormData] = useState({
    badge: content.badge || DEFAULT_ABOUT.badge,
    title: content.title || DEFAULT_ABOUT.title,
    description: content.description || DEFAULT_ABOUT.description,
    paragraph1: content.paragraph1 || DEFAULT_ABOUT.paragraph1,
    paragraph2: content.paragraph2 || DEFAULT_ABOUT.paragraph2,
    features: content.features || DEFAULT_ABOUT.features,
    stats: {
      years: content.stats?.years || DEFAULT_ABOUT.stats.years,
      clients: content.stats?.clients || DEFAULT_ABOUT.stats.clients,
      results: content.stats?.results || DEFAULT_ABOUT.stats.results,
    },
    certifications: {
      certification: content.certifications?.certification || DEFAULT_ABOUT.certifications.certification,
      specialization: content.certifications?.specialization || DEFAULT_ABOUT.certifications.specialization,
    },
    image: content.image || DEFAULT_ABOUT.image,
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
        badge: DEFAULT_ABOUT.badge,
        title: DEFAULT_ABOUT.title,
        description: DEFAULT_ABOUT.description,
        paragraph1: DEFAULT_ABOUT.paragraph1,
        paragraph2: DEFAULT_ABOUT.paragraph2,
        features: DEFAULT_ABOUT.features.map(f => ({ ...f })),
        stats: { ...DEFAULT_ABOUT.stats },
        certifications: { ...DEFAULT_ABOUT.certifications },
        image: DEFAULT_ABOUT.image,
      })
    }
  }

  const [aiEditor, setAiEditor] = useState<{
    open: boolean
    field: string
    label: string
  }>({ open: false, field: "", label: "" })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setFormData({ ...formData, image: result })
    }
    reader.readAsDataURL(file)
  }

  const handleAIApply = (newContent: string) => {
    if (aiEditor.field === "badge") {
      setFormData({ ...formData, badge: newContent })
    } else if (aiEditor.field === "title") {
      setFormData({ ...formData, title: newContent })
    } else if (aiEditor.field === "description") {
      setFormData({ ...formData, description: newContent })
    } else if (aiEditor.field === "paragraph1") {
      setFormData({ ...formData, paragraph1: newContent })
    } else if (aiEditor.field === "paragraph2") {
      setFormData({ ...formData, paragraph2: newContent })
    }
  }

  const openAIEditor = (field: string, label: string) => {
    setAiEditor({ open: true, field, label })
  }

  const getCurrentFieldValue = () => {
    if (aiEditor.field === "badge") return formData.badge
    if (aiEditor.field === "title") return formData.title
    if (aiEditor.field === "description") return formData.description
    if (aiEditor.field === "paragraph1") return formData.paragraph1
    if (aiEditor.field === "paragraph2") return formData.paragraph2
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
          <h2 className="text-2xl font-bold text-white">About Section</h2>
          <p className="text-zinc-400 text-sm mt-1">Edit the about section content</p>
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
            <Label htmlFor="description" className="text-white">
              Description
            </Label>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80"
              onClick={() => openAIEditor("description", "Description")}
            >
              <Sparkles className="w-4 h-4 mr-1" />
              AI
            </Button>
          </div>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-zinc-950 border-zinc-800 text-white min-h-24"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="paragraph1" className="text-white">
              Paragraph 1
            </Label>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80"
              onClick={() => openAIEditor("paragraph1", "Paragraph 1")}
            >
              <Sparkles className="w-4 h-4 mr-1" />
              AI
            </Button>
          </div>
          <Textarea
            id="paragraph1"
            value={formData.paragraph1}
            onChange={(e) => setFormData({ ...formData, paragraph1: e.target.value })}
            className="bg-zinc-950 border-zinc-800 text-white min-h-24"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="paragraph2" className="text-white">
              Paragraph 2
            </Label>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80"
              onClick={() => openAIEditor("paragraph2", "Paragraph 2")}
            >
              <Sparkles className="w-4 h-4 mr-1" />
              AI
            </Button>
          </div>
          <Textarea
            id="paragraph2"
            value={formData.paragraph2}
            onChange={(e) => setFormData({ ...formData, paragraph2: e.target.value })}
            className="bg-zinc-950 border-zinc-800 text-white min-h-24"
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-zinc-800">
          <Label className="text-white">Features</Label>
          {formData.features.map((feature, index) => (
            <div key={index} className="space-y-2 p-4 bg-zinc-950 rounded-lg">
              <Input
                placeholder="Feature title"
                value={feature.title}
                onChange={(e) => {
                  const newFeatures = [...formData.features]
                  newFeatures[index].title = e.target.value
                  setFormData({ ...formData, features: newFeatures })
                }}
                className="bg-zinc-900 border-zinc-800 text-white"
              />
              <Input
                placeholder="Feature description"
                value={feature.description}
                onChange={(e) => {
                  const newFeatures = [...formData.features]
                  newFeatures[index].description = e.target.value
                  setFormData({ ...formData, features: newFeatures })
                }}
                className="bg-zinc-900 border-zinc-800 text-white"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
          <div className="space-y-2">
            <Label className="text-white text-sm">Years Stat</Label>
            <Input
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
            <Label className="text-white text-sm">Clients Stat</Label>
            <Input
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
            <Label className="text-white text-sm">Results Stat</Label>
            <Input
              value={formData.stats.results}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stats: { ...formData.stats, results: e.target.value },
                })
              }
              className="bg-zinc-950 border-zinc-800 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
          <div className="space-y-2">
            <Label className="text-white text-sm">Certification</Label>
            <Input
              value={formData.certifications.certification}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  certifications: {
                    ...formData.certifications,
                    certification: e.target.value,
                  },
                })
              }
              className="bg-zinc-950 border-zinc-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white text-sm">Specialization</Label>
            <Input
              value={formData.certifications.specialization}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  certifications: {
                    ...formData.certifications,
                    specialization: e.target.value,
                  },
                })
              }
              className="bg-zinc-950 border-zinc-800 text-white"
            />
          </div>
        </div>

        <div className="space-y-2 pt-4 border-t border-zinc-800">
          <Label htmlFor="image" className="text-white">
            About Image
          </Label>
          <div className="flex items-center gap-4">
            <Input
              id="image"
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="/path/to/image.jpg"
              className="bg-zinc-950 border-zinc-800 text-white"
            />
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="border-zinc-700 text-white hover:bg-zinc-800"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </label>
          </div>
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

