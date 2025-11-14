"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import confetti from "canvas-confetti"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    goal: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (isSuccess) {
      // Trigger confetti animation
      const duration = 3000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min
      }

      const interval: NodeJS.Timeout = setInterval(function () {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)

        // Launch confetti from the left
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })

        // Launch confetti from the right
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      }, 250)

      // Cleanup function
      return () => clearInterval(interval)
    }
  }, [isSuccess])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit inquiry")
      }

      setIsSuccess(true)
      setFormData({ name: "", email: "", goal: "", message: "" })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: (
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>Something went wrong</span>
          </div>
        ),
        description: "Sorry, there was an error submitting your inquiry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="max-w-3xl mx-auto relative z-10">
        {isSuccess ? (
          <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-6 shadow-2xl shadow-green-500/50">
                    <CheckCircle2 className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-4xl md:text-5xl font-bold text-white">
                  Message Sent Successfully!
                </h3>
                <p className="text-xl text-zinc-300 max-w-md mx-auto">
                  Thanks for reaching out! We'll get back to you within 24 hours.
                </p>
              </div>

              <div className="pt-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm text-zinc-300">We're excited to help you reach your fitness goals!</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-12 space-y-4">
              <p className="text-primary font-semibold tracking-wider uppercase text-sm">Get In Touch</p>
              <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                Ready to <span className="text-gradient">Get Started?</span>
              </h2>
              <p className="text-zinc-400 text-lg text-pretty">
                Fill out the form below and let's discuss your fitness goals
              </p>
            </div>

            <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-8 md:p-10 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-zinc-950 border-zinc-800 text-white focus:border-primary h-12 rounded-xl transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-zinc-950 border-zinc-800 text-white focus:border-primary h-12 rounded-xl transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal" className="text-white font-medium">
                Fitness Goal
              </Label>
              <Input
                id="goal"
                type="text"
                required
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                className="bg-zinc-950 border-zinc-800 text-white focus:border-primary h-12 rounded-xl transition-colors"
                placeholder="e.g., Build muscle, lose weight, get stronger"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-white font-medium">
                Message
              </Label>
              <Textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-zinc-950 border-zinc-800 text-white focus:border-primary min-h-36 rounded-xl transition-colors resize-none"
                placeholder="Tell me more about your current fitness level and what you're looking to achieve..."
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-14 rounded-xl shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-[1.02] group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? "Submitting..." : "Get Started"}
              {!isSubmitting && (
                <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              )}
            </Button>
          </form>
        </div>
          </>
        )}
      </div>
    </section>
  )
}
