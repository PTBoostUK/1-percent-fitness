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
import { InquiriesViewer } from "@/components/admin/inquiries-viewer"
import { useToast } from "@/hooks/use-toast"
import { useIsMobile } from "@/hooks/use-mobile"
import type { WebsiteContent } from "@/lib/types/database"

function AdminDashboardContent() {
  const router = useRouter()
  const { toast } = useToast()
  const isMobile = useIsMobile()
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
      toast({
        title: "Success",
        description: "Content saved successfully!",
      })
    } catch (error) {
      console.error("Error saving content:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save content. Please try again.",
      })
    } finally {
      setSaving(false)
    }
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-slow"></div>
            <div className="relative w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-white text-sm animate-pulse-slow">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  if (!user || !content) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-50 animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="animate-fade-in">
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent animate-pulse-slow">
                Admin Dashboard
              </h1>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                <span className="hidden sm:inline">Manage your website content and theme settings</span>
                <span className="sm:hidden">Dashboard</span>
                <span className="ml-2 inline-flex items-center gap-1 animate-fade-in">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="hidden sm:inline">{user.email}</span>
                  <span className="sm:hidden truncate max-w-[150px]">{user.email}</span>
                </span>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 animate-fade-in">
              <Button
                variant="outline"
                size={isMobile ? "sm" : "default"}
                className={`border-zinc-700 text-white hover:bg-zinc-800 transition-smooth btn-press hover:scale-105 active:scale-95 ${activeTab === "inquiries" ? "bg-primary border-primary" : ""}`}
                onClick={() => setActiveTab("inquiries")}
              >
                <Mail className="w-4 h-4 sm:mr-2 transition-transform group-hover:scale-110" />
                <span className="hidden sm:inline">Inquiries</span>
              </Button>
              <Button
                variant="outline"
                size={isMobile ? "sm" : "default"}
                className="border-zinc-700 text-white hover:bg-zinc-800 transition-smooth btn-press hover:scale-105 active:scale-95"
                onClick={() => router.push("/")}
              >
                <ArrowLeft className="w-4 h-4 sm:mr-2 transition-transform group-hover:-translate-x-1" />
                <span className="hidden sm:inline">Back to Website</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <Button
                variant="outline"
                size={isMobile ? "sm" : "default"}
                className="border-zinc-700 text-white hover:bg-zinc-800 transition-smooth btn-press hover:scale-105 active:scale-95"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 sm:mr-2 transition-transform group-hover:rotate-12" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 animate-fade-in">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-6 sm:mb-8 animate-slide-up">
            <TabsList className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-1 sm:p-1.5 h-auto sm:h-14 gap-1 sm:gap-1.5 backdrop-blur-sm shadow-lg transition-smooth w-full sm:w-auto overflow-x-auto flex sm:inline-flex">
              <TabsTrigger 
                value="hero" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-300 hover:bg-zinc-800 hover:text-white hover:scale-[1.02] active:scale-[0.98] data-[state=inactive]:text-zinc-400 data-[state=inactive]:hover:text-zinc-200 whitespace-nowrap flex-shrink-0"
              >
                Hero
              </TabsTrigger>
              <TabsTrigger 
                value="about"
                className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-300 hover:bg-zinc-800 hover:text-white hover:scale-[1.02] active:scale-[0.98] data-[state=inactive]:text-zinc-400 data-[state=inactive]:hover:text-zinc-200 whitespace-nowrap flex-shrink-0"
              >
                About
              </TabsTrigger>
              <TabsTrigger 
                value="services"
                className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-300 hover:bg-zinc-800 hover:text-white hover:scale-[1.02] active:scale-[0.98] data-[state=inactive]:text-zinc-400 data-[state=inactive]:hover:text-zinc-200 whitespace-nowrap flex-shrink-0"
              >
                Services
              </TabsTrigger>
              <TabsTrigger 
                value="testimonials"
                className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-300 hover:bg-zinc-800 hover:text-white hover:scale-[1.02] active:scale-[0.98] data-[state=inactive]:text-zinc-400 data-[state=inactive]:hover:text-zinc-200 whitespace-nowrap flex-shrink-0"
              >
                Testimonials
              </TabsTrigger>
              <TabsTrigger 
                value="theme"
                className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-300 hover:bg-zinc-800 hover:text-white hover:scale-[1.02] active:scale-[0.98] data-[state=inactive]:text-zinc-400 data-[state=inactive]:hover:text-zinc-200 whitespace-nowrap flex-shrink-0"
              >
                <Settings className="w-4 h-4 sm:mr-2 transition-transform group-hover:rotate-90" />
                <span className="hidden sm:inline">Theme</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="hero" className="mt-4 sm:mt-6 tab-content-enter">
            <HeroEditor content={content.hero} onSave={(data) => handleSave("hero", data)} />
          </TabsContent>

          <TabsContent value="about" className="mt-4 sm:mt-6 tab-content-enter">
            <AboutEditor content={content.about} onSave={(data) => handleSave("about", data)} />
          </TabsContent>

          <TabsContent value="services" className="mt-4 sm:mt-6 tab-content-enter">
            <ServicesEditor content={content.services} onSave={(data) => handleSave("services", data)} />
          </TabsContent>

          <TabsContent value="testimonials" className="mt-4 sm:mt-6 tab-content-enter">
            <TestimonialsEditor content={content.testimonials} onSave={(data) => handleSave("testimonials", data)} />
          </TabsContent>

          <TabsContent value="inquiries" className="mt-4 sm:mt-6 tab-content-enter">
            <InquiriesViewer />
          </TabsContent>

          <TabsContent value="theme" className="mt-4 sm:mt-6 tab-content-enter">
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

