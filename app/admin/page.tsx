"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeft, 
  LogOut, 
  Mail, 
  Save, 
  RotateCcw, 
  Sparkles, 
  Settings,
  Upload,
  X
} from "lucide-react"
import { HeroEditor } from "@/components/admin/hero-editor"
import { AboutEditor } from "@/components/admin/about-editor"
import { ServicesEditor } from "@/components/admin/services-editor"
import { TestimonialsEditor } from "@/components/admin/testimonials-editor"
import { ThemeEditor } from "@/components/admin/theme-editor"
import type { WebsiteContent } from "@/lib/types/database"

function AdminDashboardContent() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState<WebsiteContent | null>(null)
  const [activeTab, setActiveTab] = useState("hero")
  const [saving, setSaving] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    checkAuth()
    fetchContent()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth")
      const data = await res.json()
      if (!data.user) {
        router.push("/admin/login")
        return
      }
      setUser(data.user)
    } catch (error) {
      router.push("/admin/login")
    } finally {
      setLoading(false)
    }
  }

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/content")
      if (!res.ok) {
        throw new Error("Failed to fetch content")
      }
      const data = await res.json()
      if (data.error) {
        console.error("Error in response:", data.error)
        return
      }
      setContent(data)
    } catch (error) {
      console.error("Error fetching content:", error)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" })
    router.push("/admin/login")
  }

  const handleSave = async (section: string, sectionData: any) => {
    setSaving(true)
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, data: sectionData }),
      })

      if (!res.ok) {
        throw new Error("Failed to save")
      }

      await fetchContent()
      alert("Content saved successfully!")
    } catch (error) {
      console.error("Error saving content:", error)
      alert("Failed to save content. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user || !content) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-zinc-400 text-sm mt-1">
                Manage your website content and theme settings
                <span className="ml-2 inline-flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {user.email}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="border-zinc-700 text-white hover:bg-zinc-800"
                onClick={() => router.push("/")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Website
              </Button>
              <Button
                variant="outline"
                className="border-zinc-700 text-white hover:bg-zinc-800"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-zinc-900 border border-zinc-800">
              <TabsTrigger 
                value="hero" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Hero
              </TabsTrigger>
              <TabsTrigger 
                value="about"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                About
              </TabsTrigger>
              <TabsTrigger 
                value="services"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Services
              </TabsTrigger>
              <TabsTrigger 
                value="testimonials"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Testimonials
              </TabsTrigger>
              <TabsTrigger 
                value="theme"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <Settings className="w-4 h-4 mr-2" />
                Theme
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="hero" className="mt-6">
            <HeroEditor content={content.hero} onSave={(data) => handleSave("hero", data)} />
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <AboutEditor content={content.about} onSave={(data) => handleSave("about", data)} />
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            <ServicesEditor content={content.services} onSave={(data) => handleSave("services", data)} />
          </TabsContent>

          <TabsContent value="testimonials" className="mt-6">
            <TestimonialsEditor content={content.testimonials} onSave={(data) => handleSave("testimonials", data)} />
          </TabsContent>

          <TabsContent value="theme" className="mt-6">
            <ThemeEditor content={content.theme} onSave={(data) => handleSave("theme", data)} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Export as dynamic component with no SSR to prevent hydration issues
export default dynamic(() => Promise.resolve(AdminDashboardContent), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>
  ),
})

