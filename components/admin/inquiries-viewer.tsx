"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, User, Target, MessageSquare, Calendar, Check, X, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

interface Inquiry {
  id: string
  name: string
  email: string
  goal: string | null
  message: string | null
  read: boolean
  createdAt: string
}

export function InquiriesViewer() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [inquiryToDelete, setInquiryToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/inquiries")
      if (!res.ok) {
        throw new Error("Failed to fetch inquiries")
      }
      const data = await res.json()
      setInquiries(data.inquiries || [])
    } catch (error) {
      console.error("Error fetching inquiries:", error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string, read: boolean) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read }),
      })

      if (!res.ok) {
        throw new Error("Failed to update inquiry")
      }

      // Update local state
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, read } : inq))
      )

      // Update selected inquiry if it's the one being updated
      if (selectedInquiry?.id === id) {
        setSelectedInquiry({ ...selectedInquiry, read })
      }
    } catch (error) {
      console.error("Error updating inquiry:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update inquiry. Please try again.",
      })
    }
  }

  const handleDeleteClick = (id: string) => {
    setInquiryToDelete(id)
    setDeleteDialogOpen(true)
  }

  const deleteInquiry = async () => {
    if (!inquiryToDelete) return

    try {
      const res = await fetch(`/api/inquiries?id=${inquiryToDelete}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        throw new Error("Failed to delete inquiry")
      }

      // Remove from local state
      setInquiries((prev) => prev.filter((inq) => inq.id !== inquiryToDelete))

      // Close dialog if the deleted inquiry was selected
      if (selectedInquiry?.id === inquiryToDelete) {
        setIsDialogOpen(false)
        setSelectedInquiry(null)
      }

      // Close delete dialog and reset
      setDeleteDialogOpen(false)
      setInquiryToDelete(null)

      toast({
        title: "Success",
        description: "Inquiry deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting inquiry:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete inquiry. Please try again.",
      })
      setDeleteDialogOpen(false)
      setInquiryToDelete(null)
    }
  }

  const unreadInquiries = inquiries.filter((inq) => !inq.read)
  const readInquiries = inquiries.filter((inq) => inq.read)
  const unreadCount = unreadInquiries.length

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) {
      return "Unknown date"
    }
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return "Invalid date"
    }
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 animate-fade-in">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-slow"></div>
            <div className="relative w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-zinc-400 animate-pulse-slow">Loading inquiries...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between animate-slide-down">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Inquiries</h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            {inquiries.length} total inquiry{inquiries.length !== 1 ? "ies" : ""}
            {unreadCount > 0 && (
              <span className="ml-2 animate-bounce-subtle">
                • <span className="text-primary font-semibold">{unreadCount}</span> unread
              </span>
            )}
          </p>
        </div>
      </div>

      {inquiries.length === 0 ? (
        <Card className="bg-zinc-900 border-zinc-800 p-12 text-center animate-scale-in card-hover">
          <Mail className="w-12 h-12 text-zinc-600 mx-auto mb-4 animate-pulse-slow" />
          <h3 className="text-xl font-semibold text-white mb-2">No inquiries yet</h3>
          <p className="text-zinc-400">
            When visitors submit the contact form, their inquiries will appear here.
          </p>
        </Card>
      ) : (
        <div className="space-y-8 animate-fade-in">
          {/* Unread Inquiries Panel */}
          {unreadInquiries.length > 0 && (
            <div className="animate-slide-up">
              <h3 className="text-xl font-semibold text-white mb-4">
                Unread ({unreadInquiries.length})
              </h3>
              <div className="space-y-4 stagger-children">
                {unreadInquiries.map((inquiry) => (
                  <Card
                    key={inquiry.id}
                    className="bg-zinc-900 border-zinc-800 border-l-4 border-l-primary hover:border-zinc-700 transition-smooth cursor-pointer card-hover animate-slide-up"
                    onClick={() => {
                      setSelectedInquiry(inquiry)
                      setIsDialogOpen(true)
                      if (!inquiry.read) {
                        markAsRead(inquiry.id, true)
                      }
                    }}
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                            <h3 className="text-base sm:text-lg font-semibold text-white truncate">{inquiry.name}</h3>
                            <Badge className="bg-primary text-white flex-shrink-0">New</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-zinc-400 text-xs sm:text-sm mb-1 truncate">
                            <Mail className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{inquiry.email}</span>
                          </div>
                          {inquiry.goal && (
                            <div className="flex items-center gap-2 text-zinc-400 text-xs sm:text-sm mb-1">
                              <Target className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{inquiry.goal}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-zinc-400 text-xs mt-2">
                            <Calendar className="w-3 h-3 flex-shrink-0" />
                            <span>{formatDate(inquiry.createdAt)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              markAsRead(inquiry.id, true)
                            }}
                            className="text-primary hover:text-primary/80 transition-smooth btn-press hover:scale-110 active:scale-95"
                          >
                            <Check className="w-4 h-4 sm:mr-1 transition-transform hover:scale-125" />
                            <span className="hidden sm:inline">Mark read</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteClick(inquiry.id)
                            }}
                            className="text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-smooth btn-press hover:scale-110 active:scale-95"
                          >
                            <Trash2 className="w-4 h-4 transition-transform hover:rotate-12" />
                          </Button>
                        </div>
                      </div>
                      {inquiry.message && (
                        <p className="text-zinc-300 text-sm line-clamp-2 mt-3">
                          {inquiry.message}
                        </p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Read Inquiries Panel */}
          {readInquiries.length > 0 && (
            <div className="animate-slide-up">
              <h3 className="text-xl font-semibold text-white mb-4">
                Read ({readInquiries.length})
              </h3>
              <div className="space-y-4 stagger-children">
                {readInquiries.map((inquiry) => (
                  <Card
                    key={inquiry.id}
                    className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-smooth cursor-pointer card-hover animate-slide-up"
                    onClick={() => {
                      setSelectedInquiry(inquiry)
                      setIsDialogOpen(true)
                    }}
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-base sm:text-lg font-semibold text-white truncate">{inquiry.name}</h3>
                          </div>
                          <div className="flex items-center gap-2 text-zinc-400 text-xs sm:text-sm mb-1 truncate">
                            <Mail className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{inquiry.email}</span>
                          </div>
                          {inquiry.goal && (
                            <div className="flex items-center gap-2 text-zinc-400 text-xs sm:text-sm mb-1">
                              <Target className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{inquiry.goal}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-zinc-400 text-xs mt-2">
                            <Calendar className="w-3 h-3 flex-shrink-0" />
                            <span>{formatDate(inquiry.createdAt)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              markAsRead(inquiry.id, false)
                            }}
                            className="text-zinc-400 hover:text-white"
                          >
                            <X className="w-4 h-4 sm:mr-1" />
                            <span className="hidden sm:inline">Mark unread</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteClick(inquiry.id)
                            }}
                            className="text-red-400 hover:text-red-300 hover:bg-red-950/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      {inquiry.message && (
                        <p className="text-zinc-300 text-sm line-clamp-2 mt-3">
                          {inquiry.message}
                        </p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl max-h-[80vh] overflow-y-auto animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <User className="w-5 h-5" />
              {selectedInquiry?.name}
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Inquiry from {formatDate(selectedInquiry?.createdAt)}
            </DialogDescription>
          </DialogHeader>

          {selectedInquiry && (
            <div className="space-y-6 mt-4">
              <div>
                <div className="flex items-center gap-2 text-zinc-400 text-sm mb-1">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </div>
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="text-primary hover:underline"
                >
                  {selectedInquiry.email}
                </a>
              </div>

              {selectedInquiry.goal && (
                <div>
                  <div className="flex items-center gap-2 text-zinc-400 text-sm mb-1">
                    <Target className="w-4 h-4" />
                    <span>Fitness Goal</span>
                  </div>
                  <p className="text-white">{selectedInquiry.goal}</p>
                </div>
              )}

              {selectedInquiry.message && (
                <div>
                  <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Message</span>
                  </div>
                  <p className="text-white whitespace-pre-wrap">{selectedInquiry.message}</p>
                </div>
              )}

              <div className="flex items-center gap-2 pt-4 border-t border-zinc-800">
                {selectedInquiry.read ? (
                  <Button
                    variant="outline"
                    onClick={() => markAsRead(selectedInquiry.id, false)}
                    className="border-zinc-700 text-white hover:bg-zinc-800 transition-smooth btn-press hover:scale-105 active:scale-95"
                  >
                    <X className="w-4 h-4 mr-2 transition-transform hover:rotate-90" />
                    Mark as Unread
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => markAsRead(selectedInquiry.id, true)}
                    className="border-zinc-700 text-white hover:bg-zinc-800 transition-smooth btn-press hover:scale-105 active:scale-95"
                  >
                    <Check className="w-4 h-4 mr-2 transition-transform hover:scale-125" />
                    Mark as Read
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => {
                    window.location.href = `mailto:${selectedInquiry.email}?subject=Re: Your Inquiry`
                  }}
                  className="border-zinc-700 text-white hover:bg-zinc-800 transition-smooth btn-press hover:scale-105 active:scale-95"
                >
                  <Mail className="w-4 h-4 mr-2 transition-transform hover:scale-110" />
                  Reply via Email
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleDeleteClick(selectedInquiry.id)
                    setIsDialogOpen(false)
                  }}
                  className="border-red-700 text-red-400 hover:bg-red-950/20 hover:text-red-300 ml-auto transition-smooth btn-press hover:scale-105 active:scale-95"
                >
                  <Trash2 className="w-4 h-4 mr-2 transition-transform hover:rotate-12" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white animate-scale-in">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-400" />
              Delete Inquiry
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Are you sure you want to delete this inquiry? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-zinc-700 text-white hover:bg-zinc-800">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteInquiry}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

