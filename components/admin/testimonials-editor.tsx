"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, RotateCcw, Sparkles } from "lucide-react"
import { AIContentEditor } from "@/components/admin/ai-content-editor"
import type { TestimonialsContent } from "@/lib/types/database"

interface TestimonialsEditorProps {
  content: TestimonialsContent
  onSave: (data: TestimonialsContent) => void
}

const DEFAULT_TESTIMONIALS = {
  badge: "Testimonials",
  title: "Client Results",
  subtitle: "Real transformations from real people",
  testimonials: [
    {
      id: "1",
      name: "Marcus R.",
      result: "Lost 15kg in 4 months",
      quote: "1% Fitness coaching completely changed my approach to fitness. The accountability and personalized programs made all the difference. I'm stronger and more confident than ever.",
      rating: 5,
      order: 0,
    },
    {
      id: "2",
      name: "David L.",
      result: "Gained 8kg of muscle",
      quote: "I've tried other trainers before, but 1% Fitness's method actually works. The combination of training and nutrition guidance helped me finally break through my plateau and build real muscle.",
      rating: 5,
      order: 1,
    },
    {
      id: "3",
      name: "Tom S.",
      result: "Transformed in 6 months",
      quote: "Working with 1% Fitness has been life-changing. Not only did I transform my body, but I developed discipline and habits that carry over into every area of my life.",
      rating: 5,
      order: 2,
    },
  ],
}

export function TestimonialsEditor({ content, onSave }: TestimonialsEditorProps) {
  const [formData, setFormData] = useState({
    badge: content.badge || DEFAULT_TESTIMONIALS.badge,
    title: content.title || DEFAULT_TESTIMONIALS.title,
    subtitle: content.subtitle || DEFAULT_TESTIMONIALS.subtitle,
    testimonials: content.testimonials || DEFAULT_TESTIMONIALS.testimonials,
  })

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
        badge: DEFAULT_TESTIMONIALS.badge,
        title: DEFAULT_TESTIMONIALS.title,
        subtitle: DEFAULT_TESTIMONIALS.subtitle,
        testimonials: DEFAULT_TESTIMONIALS.testimonials.map(t => ({ ...t })),
      })
    }
  }

  const addTestimonial = () => {
    setFormData({
      ...formData,
      testimonials: [
        ...formData.testimonials,
        {
          id: `temp-${Date.now()}`,
          name: "",
          result: "",
          quote: "",
          rating: 5,
          order: formData.testimonials.length,
        },
      ],
    })
  }

  const removeTestimonial = (index: number) => {
    setFormData({
      ...formData,
      testimonials: formData.testimonials.filter((_, i) => i !== index),
    })
  }

  const [aiEditor, setAiEditor] = useState<{
    open: boolean
    field: string
    label: string
    testimonialIndex?: number
    testimonialField?: "name" | "result" | "quote"
  }>({ open: false, field: "", label: "" })

  const handleAIApply = (newContent: string) => {
    if (aiEditor.field === "badge") {
      setFormData({ ...formData, badge: newContent })
    } else if (aiEditor.field === "title") {
      setFormData({ ...formData, title: newContent })
    } else if (aiEditor.field === "subtitle") {
      setFormData({ ...formData, subtitle: newContent })
    } else if (aiEditor.field === "testimonial" && aiEditor.testimonialIndex !== undefined && aiEditor.testimonialField) {
      const newTestimonials = [...formData.testimonials]
      newTestimonials[aiEditor.testimonialIndex] = {
        ...newTestimonials[aiEditor.testimonialIndex],
        [aiEditor.testimonialField]: newContent,
      }
      setFormData({ ...formData, testimonials: newTestimonials })
    }
  }

  const openAIEditor = (field: string, label: string, testimonialIndex?: number, testimonialField?: "name" | "result" | "quote") => {
    setAiEditor({ open: true, field, label, testimonialIndex, testimonialField })
  }

  const getCurrentFieldValue = () => {
    if (aiEditor.field === "badge") return formData.badge
    if (aiEditor.field === "title") return formData.title
    if (aiEditor.field === "subtitle") return formData.subtitle
    if (aiEditor.field === "testimonial" && aiEditor.testimonialIndex !== undefined && aiEditor.testimonialField) {
      return formData.testimonials[aiEditor.testimonialIndex]?.[aiEditor.testimonialField] || ""
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
      <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-slide-down">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Testimonials Section</h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">Edit the testimonials section content</p>
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
          <Label className="text-white">Testimonials</Label>

          {formData.testimonials.map((testimonial, index) => (
            <div key={testimonial.id || index} className="space-y-3 p-4 bg-zinc-950 rounded-lg card-hover animate-slide-up stagger-children">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Testimonial {index + 1}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Name</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80 h-6 px-2"
                    onClick={() => openAIEditor("testimonial", `Testimonial ${index + 1} Name`, index, "name")}
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    <span className="text-xs">AI</span>
                  </Button>
                </div>
                <Input
                  placeholder="Name"
                  value={testimonial.name}
                  onChange={(e) => {
                    const newTestimonials = [...formData.testimonials]
                    newTestimonials[index].name = e.target.value
                    setFormData({ ...formData, testimonials: newTestimonials })
                  }}
                  className="bg-zinc-900 border-zinc-800 text-white input-focus transition-smooth"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Result</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80 h-6 px-2"
                    onClick={() => openAIEditor("testimonial", `Testimonial ${index + 1} Result`, index, "result")}
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    <span className="text-xs">AI</span>
                  </Button>
                </div>
                <Input
                  placeholder="Result (e.g., Lost 15kg in 4 months)"
                  value={testimonial.result}
                  onChange={(e) => {
                    const newTestimonials = [...formData.testimonials]
                    newTestimonials[index].result = e.target.value
                    setFormData({ ...formData, testimonials: newTestimonials })
                  }}
                  className="bg-zinc-900 border-zinc-800 text-white input-focus transition-smooth"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Quote</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80 h-6 px-2"
                    onClick={() => openAIEditor("testimonial", `Testimonial ${index + 1} Quote`, index, "quote")}
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    <span className="text-xs">AI</span>
                  </Button>
                </div>
                <Textarea
                  placeholder="Quote"
                  value={testimonial.quote}
                  onChange={(e) => {
                    const newTestimonials = [...formData.testimonials]
                    newTestimonials[index].quote = e.target.value
                    setFormData({ ...formData, testimonials: newTestimonials })
                  }}
                  className="bg-zinc-900 border-zinc-800 text-white min-h-24 input-focus transition-smooth"
                />
              </div>
              <Input
                type="number"
                min="1"
                max="5"
                placeholder="Rating (1-5)"
                value={testimonial.rating}
                onChange={(e) => {
                  const newTestimonials = [...formData.testimonials]
                  newTestimonials[index].rating = parseInt(e.target.value) || 5
                  setFormData({ ...formData, testimonials: newTestimonials })
                }}
                className="bg-zinc-900 border-zinc-800 text-white"
              />
            </div>
          ))}
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

