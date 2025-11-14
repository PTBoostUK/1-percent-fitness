import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, Laptop, UtensilsCrossed } from "lucide-react"
import type { ServicesContent } from "@/lib/types/database"

interface ServicesSectionProps {
  content?: ServicesContent | null
}

const iconMap: Record<string, typeof Dumbbell> = {
  Dumbbell,
  Laptop,
  UtensilsCrossed,
}

export function ServicesSection({ content }: ServicesSectionProps) {
  const badge = content?.badge || "Services"
  const title = content?.title || "Training Programs"
  const subtitle = content?.subtitle || "Choose the program that fits your lifestyle and goals"
  const services = content?.services || [
    {
      id: "1",
      title: "1-on-1 Coaching",
      description: "Personalized in-person training sessions tailored to your goals, fitness level, and schedule. Get hands-on guidance and real-time feedback.",
      icon: "Dumbbell",
      order: 0,
    },
    {
      id: "2",
      title: "Online Training",
      description: "Custom workout programs delivered digitally with video demonstrations, progress tracking, and weekly check-ins to keep you accountable.",
      icon: "Laptop",
      order: 1,
    },
    {
      id: "3",
      title: "Custom Meal Plans",
      description: "Nutrition strategies designed for your lifestyle and goals. Learn how to fuel your body properly for maximum results and sustained energy.",
      icon: "UtensilsCrossed",
      order: 2,
    },
  ]
  return (
    <section className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05)_0%,transparent_50%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-semibold tracking-wider uppercase text-sm">{badge}</p>
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            {title.split(' ').map((word, i, arr) => (
              <span key={i}>
                {i === arr.length - 1 ? (
                  <span className="text-gradient">{word}</span>
                ) : (
                  word + ' '
                )}
              </span>
            ))}
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto text-pretty">
            {subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon ? iconMap[service.icon] || Dumbbell : Dumbbell
            return (
              <Card
                key={service.id || index}
                className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-800 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:scale-[1.02] group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="space-y-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                    <IconComponent className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-white text-2xl font-bold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-zinc-400 text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
