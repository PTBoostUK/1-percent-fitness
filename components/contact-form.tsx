"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    goal: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Thanks for reaching out! Jake will get back to you within 24 hours.")
    setFormData({ name: "", email: "", goal: "", message: "" })
  }

  return (
    <section id="contact" className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="max-w-3xl mx-auto relative z-10">
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
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-14 rounded-xl shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-[1.02] group"
            >
              Get Started
              <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
