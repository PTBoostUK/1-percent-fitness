"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black" />

      {/* Background image on right side */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] bg-[url('/athletic-male-personal-trainer-working-out-in-mode.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 hero-grid opacity-30" />

      {/* Radial gradient accent */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-8 xl:px-12 py-20 lg:py-32">
        <div className="grid lg:grid-cols-[45%_55%] gap-8 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8 lg:space-y-10 max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Certified Personal Trainer</span>
            </div>

            {/* Main headline */}
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight">
                <span className="block text-balance">Transform</span>
                <span className="block text-balance">Your Body.</span>
                <span className="block text-gradient mt-2">Elevate Your</span>
                <span className="block text-gradient">Mind.</span>
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-zinc-400 max-w-lg leading-relaxed text-pretty">
                Build strength, confidence, and discipline with personalized training designed for men who are ready to
                level up.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-7 text-lg rounded-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-105 group"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Book Your Free Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-zinc-700 hover:border-primary/50 bg-transparent hover:bg-primary/10 text-white font-semibold px-8 py-7 text-lg rounded-xl transition-all duration-300 group"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-1">
                <div className="text-4xl font-bold text-white">50+</div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider">Clients</div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold text-white">5+</div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider">Years</div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold text-white">100%</div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider">Committed</div>
              </div>
            </div>
          </div>

          {/* Right side - image visible on desktop */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-zinc-500 uppercase tracking-wider">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
      </div>
    </section>
  )
}
