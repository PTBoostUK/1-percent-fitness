import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, Laptop, UtensilsCrossed } from "lucide-react"

const services = [
  {
    icon: Dumbbell,
    title: "1-on-1 Coaching",
    description:
      "Personalized in-person training sessions tailored to your goals, fitness level, and schedule. Get hands-on guidance and real-time feedback.",
  },
  {
    icon: Laptop,
    title: "Online Training",
    description:
      "Custom workout programs delivered digitally with video demonstrations, progress tracking, and weekly check-ins to keep you accountable.",
  },
  {
    icon: UtensilsCrossed,
    title: "Custom Meal Plans",
    description:
      "Nutrition strategies designed for your lifestyle and goals. Learn how to fuel your body properly for maximum results and sustained energy.",
  },
]

export function ServicesSection() {
  return (
    <section className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05)_0%,transparent_50%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-semibold tracking-wider uppercase text-sm">Services</p>
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            Training <span className="text-gradient">Programs</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto text-pretty">
            Choose the program that fits your lifestyle and goals
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-800 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:scale-[1.02] group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="space-y-4">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-white text-2xl font-bold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-zinc-400 text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
