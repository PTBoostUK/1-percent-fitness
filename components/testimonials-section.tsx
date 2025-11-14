import { Card, CardContent } from "@/components/ui/card"
import { Quote, Star } from "lucide-react"

const testimonials = [
  {
    name: "Marcus R.",
    result: "Lost 15kg in 4 months",
    quote:
      "1% Fitness coaching completely changed my approach to fitness. The accountability and personalized programs made all the difference. I'm stronger and more confident than ever.",
    rating: 5,
  },
  {
    name: "David L.",
    result: "Gained 8kg of muscle",
    quote:
      "I've tried other trainers before, but 1% Fitness's method actually works. The combination of training and nutrition guidance helped me finally break through my plateau and build real muscle.",
    rating: 5,
  },
  {
    name: "Tom S.",
    result: "Transformed in 6 months",
    quote:
      "Working with 1% Fitness has been life-changing. Not only did I transform my body, but I developed discipline and habits that carry over into every area of my life.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.05)_0%,transparent_50%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-semibold tracking-wider uppercase text-sm">Testimonials</p>
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            Client <span className="text-gradient">Results</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto text-pretty">Real transformations from real people</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-8 space-y-6">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                <div className="relative">
                  <Quote className="w-10 h-10 text-primary/30 absolute -top-2 -left-2" />
                  <p className="text-zinc-300 leading-relaxed text-pretty pl-6 relative z-10">{testimonial.quote}</p>
                </div>

                <div className="border-t border-zinc-800 pt-6 space-y-1">
                  <p className="text-white font-bold text-lg">{testimonial.name}</p>
                  <p className="text-primary text-sm font-semibold">{testimonial.result}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
