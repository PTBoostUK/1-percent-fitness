"use client"

import { CheckCircle2 } from "lucide-react"

export function AboutSection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(6,182,212,0.03),transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-800/50 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <img
                src="/professional-male-personal-trainer-portrait-athlet.jpg"
                alt="1% Fitness Trainer"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-8 left-8 right-8 z-20 grid grid-cols-3 gap-3">
                <div className="bg-black/80 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-primary">5+</div>
                  <div className="text-xs text-zinc-400 mt-1">Years</div>
                </div>
                <div className="bg-black/80 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-primary">200+</div>
                  <div className="text-xs text-zinc-400 mt-1">Clients</div>
                </div>
                <div className="bg-black/80 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-xs text-zinc-400 mt-1">Results</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-primary font-semibold tracking-wider uppercase text-xs">
                  Your Transformation Partner
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
                Welcome to <span className="text-gradient inline-block">1% Fitness</span>
              </h2>

              <p className="text-xl text-zinc-400 leading-relaxed max-w-xl">
                Certified Personal Trainer specializing in helping men build muscle, strength, and unshakeable
                discipline.
              </p>
            </div>

            <div className="space-y-4 text-lg text-zinc-300 leading-relaxed">
              <p className="text-pretty">
                We've dedicated our mission to transforming lives through evidence-based training and personalized
                coaching. We don't just help you build muscle—we help you build the mindset and habits that create lasting
                change.
              </p>
              <p className="text-pretty">
                Whether you're starting your fitness journey or pushing past a plateau, we'll be with you every step of
                the way, providing the accountability, expertise, and support you need to succeed.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-3 group">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-white font-semibold">Personalized Programming</p>
                  <p className="text-sm text-zinc-400">Custom plans designed for your goals and lifestyle</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-white font-semibold">Proven Track Record</p>
                  <p className="text-sm text-zinc-400">200+ successful transformations and counting</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-white font-semibold">Continuous Support</p>
                  <p className="text-sm text-zinc-400">24/7 access and accountability when you need it most</p>
                </div>
              </div>
            </div>

            <div className="pt-6 grid grid-cols-2 gap-4">
              <div className="group p-6 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 rounded-2xl border border-zinc-800/50 hover:border-primary/30 transition-all duration-300">
                <p className="text-sm text-zinc-500 uppercase tracking-wider font-semibold">Certification</p>
                <p className="text-white font-bold text-lg mt-2">Level 3 PT Diploma</p>
              </div>
              <div className="group p-6 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 rounded-2xl border border-zinc-800/50 hover:border-primary/30 transition-all duration-300">
                <p className="text-sm text-zinc-500 uppercase tracking-wider font-semibold">Specialization</p>
                <p className="text-white font-bold text-lg mt-2">Strength & Hypertrophy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
