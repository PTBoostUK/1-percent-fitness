"use client"

import { CheckCircle2 } from "lucide-react"
import type { AboutContent } from "@/lib/types/database"

interface AboutSectionProps {
  content?: AboutContent | null
}

export function AboutSection({ content }: AboutSectionProps) {
  const badge = content?.badge || "Your Transformation Partner"
  const title = content?.title || "Welcome to 1% Fitness"
  const description = content?.description || "Certified Personal Trainer specializing in helping men build muscle, strength, and unshakeable discipline."
  const paragraph1 = content?.paragraph1 || "We've dedicated our mission to transforming lives through evidence-based training and personalized coaching."
  const paragraph2 = content?.paragraph2 || "Whether you're starting your fitness journey or pushing past a plateau, we'll be with you every step of the way."
  const features = content?.features || [
    { title: "Personalized Programming", description: "Custom plans designed for your goals and lifestyle" },
    { title: "Proven Track Record", description: "200+ successful transformations and counting" },
    { title: "Continuous Support", description: "24/7 access and accountability when you need it most" },
  ]
  const stats = content?.stats || { years: "5+", clients: "200+", results: "100%" }
  const certifications = content?.certifications || { certification: "Level 3 PT Diploma", specialization: "Strength & Hypertrophy" }
  const image = content?.image || "/professional-male-personal-trainer-portrait-athlet.jpg"
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
                src={image}
                alt="1% Fitness Trainer"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-8 left-8 right-8 z-20 grid grid-cols-3 gap-3">
                <div className="bg-black/80 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-primary">{stats.years}</div>
                  <div className="text-xs text-zinc-400 mt-1">Years</div>
                </div>
                <div className="bg-black/80 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-primary">{stats.clients}</div>
                  <div className="text-xs text-zinc-400 mt-1">Clients</div>
                </div>
                <div className="bg-black/80 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-primary">{stats.results}</div>
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
                  {badge}
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
                {title.split(' ').map((word, i, arr) => (
                  <span key={i}>
                    {i === arr.length - 1 ? (
                      <span className="text-gradient inline-block">{word}</span>
                    ) : (
                      word + ' '
                    )}
                  </span>
                ))}
              </h2>

              <p className="text-xl text-zinc-400 leading-relaxed max-w-xl">
                {description}
              </p>
            </div>

            <div className="space-y-4 text-lg text-zinc-300 leading-relaxed">
              <p className="text-pretty">{paragraph1}</p>
              <p className="text-pretty">{paragraph2}</p>
            </div>

            <div className="space-y-3 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-white font-semibold">{feature.title}</p>
                    <p className="text-sm text-zinc-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 grid grid-cols-2 gap-4">
              <div className="group p-6 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 rounded-2xl border border-zinc-800/50 hover:border-primary/30 transition-all duration-300">
                <p className="text-sm text-zinc-500 uppercase tracking-wider font-semibold">Certification</p>
                <p className="text-white font-bold text-lg mt-2">{certifications.certification}</p>
              </div>
              <div className="group p-6 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 rounded-2xl border border-zinc-800/50 hover:border-primary/30 transition-all duration-300">
                <p className="text-sm text-zinc-500 uppercase tracking-wider font-semibold">Specialization</p>
                <p className="text-white font-bold text-lg mt-2">{certifications.specialization}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
