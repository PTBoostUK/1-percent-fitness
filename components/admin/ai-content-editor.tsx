"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  X, 
  Sparkles, 
  Heart, 
  Zap, 
  TrendingUp, 
  Target, 
  CheckCircle2,
  Wand2
} from "lucide-react"

interface AIContentEditorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentContent: string
  fieldLabel: string
  onApply: (newContent: string) => void
}

const QUICK_ACTIONS = [
  { label: "More Engaging", icon: Heart, prompt: "Make this more engaging and captivating" },
  { label: "Make Shorter", icon: Zap, prompt: "Make this shorter and more concise" },
  { label: "Add Energy", icon: TrendingUp, prompt: "Add more energy and enthusiasm" },
  { label: "More Professional", icon: Target, prompt: "Make this more professional and polished" },
]

export function AIContentEditor({
  open,
  onOpenChange,
  currentContent,
  fieldLabel,
  onApply,
}: AIContentEditorProps) {
  const [customInstruction, setCustomInstruction] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")

  const handleQuickAction = (prompt: string) => {
    setCustomInstruction(prompt)
    generateContent(prompt)
  }

  const generateContent = async (instruction?: string) => {
    const instructionToUse = instruction || customInstruction
    if (!instructionToUse.trim()) {
      setError("Please provide an instruction or select a quick action")
      return
    }

    setIsGenerating(true)
    setError("")
    setGeneratedContent("")

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentContent,
          instruction: instructionToUse,
          fieldLabel,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate content")
      }

      const data = await response.json()
      setGeneratedContent(data.content)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate content. Please try again.")
      console.error("AI generation error:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleApply = () => {
    if (generatedContent) {
      onApply(generatedContent)
      handleClose()
    }
  }

  const handleClose = () => {
    setCustomInstruction("")
    setGeneratedContent("")
    setError("")
    onOpenChange(false)
  }

  const handleTryAgain = () => {
    generateContent()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-white text-black">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <DialogTitle className="text-2xl font-bold text-purple-600">
                AI Content Editor
              </DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-1">Edit {fieldLabel}</p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Quick Actions */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Quick Actions
            </label>
            <div className="grid grid-cols-2 gap-3">
              {QUICK_ACTIONS.map((action) => {
                const Icon = action.icon
                return (
                  <Button
                    key={action.label}
                    variant="outline"
                    className="justify-start h-auto py-3 px-4 bg-white border-gray-200 hover:bg-gray-50"
                    onClick={() => handleQuickAction(action.prompt)}
                    disabled={isGenerating}
                  >
                    <Icon className="w-4 h-4 mr-2 text-gray-600" />
                    <span className="text-sm">{action.label}</span>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Current Content */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Current Content ({currentContent.length} characters)
            </label>
            <Textarea
              value={currentContent}
              readOnly
              className="bg-gray-50 border-gray-200 text-gray-700 min-h-20"
            />
          </div>

          {/* Custom Instruction */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              What would you like to change?
            </label>
            <Textarea
              value={customInstruction}
              onChange={(e) => setCustomInstruction(e.target.value)}
              placeholder="E.g., Make it more energetic, add enthusiasm, make it shorter..."
              className="bg-white border-gray-200 min-h-24"
              disabled={isGenerating}
            />
            {customInstruction && (
              <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                <Sparkles className="w-3 h-3" />
                <span>Ready to generate magic!</span>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          {/* AI Generated Preview */}
          {generatedContent && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <label className="text-sm font-semibold text-gray-700">
                  AI Generated Preview ({generatedContent.length} characters)
                </label>
              </div>
              <Textarea
                value={generatedContent}
                readOnly
                className="bg-green-50 border-green-200 text-gray-700 min-h-24"
              />
              <p className="text-xs text-gray-500 mt-2">
                → Review the preview above and click "Apply Changes" to use it
              </p>
            </div>
          )}

          {/* Loading State */}
          {isGenerating && (
            <div className="flex items-center justify-center py-8">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                <p className="text-sm text-gray-600">Generating content...</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleClose}
              className="border-gray-200"
            >
              Cancel
            </Button>
            {generatedContent && (
              <Button
                variant="outline"
                onClick={handleTryAgain}
                disabled={isGenerating}
                className="border-gray-200"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            )}
            <Button
              onClick={generatedContent ? handleApply : () => generateContent()}
              disabled={isGenerating || (!customInstruction && !generatedContent)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {generatedContent ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Apply Changes
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

