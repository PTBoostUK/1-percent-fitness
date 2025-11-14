"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  Sparkles, 
  Heart, 
  Zap, 
  TrendingUp, 
  Target, 
  CheckCircle2,
  Wand2,
  ArrowRight,
  Copy,
  RefreshCw,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AIContentEditorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentContent: string
  fieldLabel: string
  onApply: (newContent: string) => void
}

const QUICK_ACTIONS = [
  { 
    label: "More Engaging", 
    icon: Heart, 
    prompt: "Make this more engaging and captivating",
    color: "from-pink-500 to-rose-500",
    hoverColor: "hover:from-pink-600 hover:to-rose-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    selectedBorderColor: "border-pink-400",
    hoverBorderColor: "hover:border-pink-300",
    textColor: "text-pink-700"
  },
  { 
    label: "Make Shorter", 
    icon: Zap, 
    prompt: "Make this shorter and more concise",
    color: "from-yellow-500 to-amber-500",
    hoverColor: "hover:from-yellow-600 hover:to-amber-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    selectedBorderColor: "border-yellow-400",
    hoverBorderColor: "hover:border-yellow-300",
    textColor: "text-yellow-700"
  },
  { 
    label: "Add Energy", 
    icon: TrendingUp, 
    prompt: "Add more energy and enthusiasm",
    color: "from-orange-500 to-red-500",
    hoverColor: "hover:from-orange-600 hover:to-red-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    selectedBorderColor: "border-orange-400",
    hoverBorderColor: "hover:border-orange-300",
    textColor: "text-orange-700"
  },
  { 
    label: "More Professional", 
    icon: Target, 
    prompt: "Make this more professional and polished",
    color: "from-blue-500 to-indigo-500",
    hoverColor: "hover:from-blue-600 hover:to-indigo-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    selectedBorderColor: "border-blue-400",
    hoverBorderColor: "hover:border-blue-300",
    textColor: "text-blue-700"
  },
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
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [showComparison, setShowComparison] = useState(false)

  // Auto-show comparison when content is generated
  useEffect(() => {
    if (generatedContent) {
      setShowComparison(true)
    }
  }, [generatedContent])

  const handleQuickAction = (action: typeof QUICK_ACTIONS[0]) => {
    setSelectedAction(action.label)
    setCustomInstruction(action.prompt)
    generateContent(action.prompt)
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
    setShowComparison(false)

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
    setSelectedAction(null)
    setShowComparison(false)
    onOpenChange(false)
  }

  const handleTryAgain = () => {
    generateContent()
  }

  const handleCopyToCustom = () => {
    setCustomInstruction("")
    setSelectedAction(null)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-gray-50 text-black">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-sm opacity-50 animate-pulse"></div>
              <Sparkles className="relative w-6 h-6 text-purple-600 animate-pulse" />
            </div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Content Editor
            </DialogTitle>
          </div>
          <p className="text-sm text-gray-600 mt-1 font-medium">✨ Edit {fieldLabel}</p>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Quick Actions */}
          <div>
            <label className="text-sm font-bold text-gray-800 mb-3 block flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              Quick Actions
              <span className="text-xs font-normal text-gray-500">(Click to instantly transform)</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {QUICK_ACTIONS.map((action) => {
                const Icon = action.icon
                const isSelected = selectedAction === action.label
                return (
                  <button
                    key={action.label}
                    onClick={() => handleQuickAction(action)}
                    disabled={isGenerating}
                    className={cn(
                      "group relative overflow-hidden rounded-xl border-2 transition-all duration-300",
                      "hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
                      "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                      isSelected 
                        ? `${action.selectedBorderColor} bg-gradient-to-br ${action.color} text-white shadow-lg` 
                        : `border-gray-200 bg-white ${action.hoverBorderColor}`
                    )}
                  >
                    <div className={cn(
                      "p-4 flex items-center gap-3 transition-all duration-300",
                      isSelected ? "text-white" : action.textColor
                    )}>
                      <div 
                        className={cn(
                          "p-2 rounded-lg transition-all duration-300",
                          isSelected 
                            ? "bg-white/20" 
                            : action.bgColor
                        )}
                      >
                        <Icon className={cn(
                          "w-5 h-5 transition-all duration-300",
                          isSelected ? "text-white" : "text-gray-600 group-hover:text-white"
                        )} />
                      </div>
                      <span className="font-semibold text-sm">{action.label}</span>
                      {isGenerating && isSelected && (
                        <Loader2 className="w-4 h-4 ml-auto animate-spin" />
                      )}
                    </div>
                    {isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Custom Instruction */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-800 mb-2 block flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-purple-600" />
              What would you like to change?
              {selectedAction && (
                <button
                  onClick={handleCopyToCustom}
                  className="ml-auto text-xs text-purple-600 hover:text-purple-700 font-normal underline"
                >
                  Write custom instruction
                </button>
              )}
            </label>
            <Textarea
              value={customInstruction}
              onChange={(e) => {
                setCustomInstruction(e.target.value)
                setSelectedAction(null)
              }}
              placeholder="E.g., Make it more energetic, add enthusiasm, make it shorter, add a call-to-action..."
              className="bg-white border-gray-200 min-h-24 transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
              disabled={isGenerating}
            />
            {customInstruction && !selectedAction && (
              <div className="flex items-center gap-2 mt-2 text-xs text-purple-600 animate-fade-in">
                <Sparkles className="w-3 h-3 animate-pulse" />
                <span className="font-medium">✨ Ready to generate magic!</span>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-sm text-red-700 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold">
                <span>⚠️</span>
                <span>Error</span>
              </div>
              <p className="mt-1">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {isGenerating && (
            <div className="flex items-center justify-center py-12 animate-fade-in">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
                  <Loader2 className="relative w-12 h-12 text-purple-600 animate-spin" />
                </div>
                <div className="text-center">
                  <p className="text-base font-semibold text-gray-800">Generating content...</p>
                  <p className="text-xs text-gray-500 mt-1">AI is working its magic ✨</p>
                </div>
              </div>
            </div>
          )}

          {/* Comparison View */}
          {generatedContent && !isGenerating && showComparison && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <label className="text-sm font-bold text-gray-800">
                    AI Generated Preview
                    <span className="text-xs font-normal text-gray-500 ml-2">({generatedContent.length} characters)</span>
                  </label>
                </div>
                <button
                  onClick={() => copyToClipboard(generatedContent)}
                  className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-1 transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Before */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                    Before
                  </div>
                  <div className="relative">
                    <Textarea
                      value={currentContent}
                      readOnly
                      className="bg-gray-50 border-gray-200 text-gray-600 min-h-32 text-sm"
                    />
                  </div>
                </div>

                {/* After */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-green-600 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    After
                  </div>
                  <div className="relative">
                    <Textarea
                      value={generatedContent}
                      readOnly
                      className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 text-gray-800 min-h-32 text-sm font-medium"
                    />
                    <div className="absolute top-2 right-2">
                      <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold animate-pulse">
                        NEW
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <ArrowRight className="w-4 h-4 text-blue-600" />
                <p className="text-xs text-blue-700">
                  <span className="font-semibold">Review the preview above</span> and click "Apply Changes" to use it
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handleClose}
              className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all"
            >
              Cancel
            </Button>
            {generatedContent && !isGenerating && (
              <Button
                variant="outline"
                onClick={handleTryAgain}
                disabled={isGenerating}
                className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 disabled:bg-gray-100 disabled:text-gray-400 transition-all"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            )}
            <Button
              onClick={generatedContent ? handleApply : () => generateContent()}
              disabled={isGenerating || (!customInstruction && !generatedContent)}
              className={cn(
                "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white",
                "shadow-lg hover:shadow-xl transition-all duration-300",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg",
                "font-semibold"
              )}
            >
              {generatedContent ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Apply Changes
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
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

