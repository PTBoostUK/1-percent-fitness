"use client"

import { useEffect } from "react"
import type { ThemeSettings } from "@/lib/types/database"

interface ThemeApplierProps {
  theme?: ThemeSettings | null
}

export function ThemeApplier({ theme }: ThemeApplierProps) {
  useEffect(() => {
    const root = document.documentElement

    if (!theme) {
      // Reset to defaults if no theme
      root.style.removeProperty('--dynamic-primary')
      root.style.removeProperty('--dynamic-primary-rgb')
      root.style.removeProperty('--dynamic-secondary')
      root.style.removeProperty('--dynamic-secondary-rgb')
      root.style.removeProperty('--dynamic-font-body')
      root.style.removeProperty('--dynamic-font-heading')
      const style = document.getElementById('dynamic-theme') as HTMLStyleElement
      if (style) {
        style.remove()
      }
      return
    }

    // Apply primary color
    if (theme.primaryColor) {
      // Convert hex to RGB
      const hex = theme.primaryColor.replace('#', '')
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)
      
      // Set CSS variables on root (don't override --primary to avoid breaking existing styles)
      root.style.setProperty('--dynamic-primary', theme.primaryColor)
      root.style.setProperty('--dynamic-primary-rgb', `${r}, ${g}, ${b}`)
    }

    // Apply secondary color
    if (theme.secondaryColor) {
      // Convert hex to RGB
      const hex = theme.secondaryColor.replace('#', '')
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)
      
      // Set CSS variables on root
      root.style.setProperty('--dynamic-secondary', theme.secondaryColor)
      root.style.setProperty('--dynamic-secondary-rgb', `${r}, ${g}, ${b}`)
    } else {
      // Remove secondary color if not provided
      root.style.removeProperty('--dynamic-secondary')
      root.style.removeProperty('--dynamic-secondary-rgb')
    }

    // Create or update dynamic theme styles - only target specific classes
    if (theme.primaryColor || theme.secondaryColor) {
      let style = document.getElementById('dynamic-theme') as HTMLStyleElement
      if (!style) {
        style = document.createElement('style')
        style.id = 'dynamic-theme'
        document.head.appendChild(style)
      }
      
      // Only override specific utility classes that should use the primary color
      // Target exact Tailwind classes to avoid breaking other styles
      let styleContent = ''
      
      if (theme.primaryColor) {
        styleContent += `
        button.bg-primary,
        a.bg-primary {
          background-color: ${theme.primaryColor} !important;
        }
        .text-primary {
          color: ${theme.primaryColor} !important;
        }
        .border-primary,
        .border-primary\\/30,
        .border-primary\\/20,
        .border-primary\\/40,
        .border-primary\\/50 {
          border-color: ${theme.primaryColor} !important;
        }
        .text-gradient {
          background: linear-gradient(to right, ${theme.primaryColor}, ${theme.secondaryColor || theme.primaryColor}dd, ${theme.primaryColor}) !important;
          -webkit-background-clip: text !important;
          background-clip: text !important;
        }
      `
      }

      if (theme.secondaryColor) {
        styleContent += `
        .bg-secondary,
        button.bg-secondary {
          background-color: ${theme.secondaryColor} !important;
        }
        .text-secondary {
          color: ${theme.secondaryColor} !important;
        }
        .border-secondary,
        .border-secondary\\/30,
        .border-secondary\\/20,
        .border-secondary\\/40,
        .border-secondary\\/50 {
          border-color: ${theme.secondaryColor} !important;
        }
      `
      }

      style.textContent = styleContent
    } else {
      // Remove dynamic theme if no theme provided
      const style = document.getElementById('dynamic-theme') as HTMLStyleElement
      if (style) {
        style.remove()
      }
    }

    // Apply font families
    if (theme.fontFamily) {
      root.style.setProperty('--dynamic-font-body', theme.fontFamily)
      document.body.style.fontFamily = `var(--dynamic-font-body, ${theme.fontFamily}), sans-serif`
    }

    if (theme.headingFont) {
      root.style.setProperty('--dynamic-font-heading', theme.headingFont)
      
      // Apply to all headings using CSS
      let fontStyle = document.getElementById('dynamic-fonts') as HTMLStyleElement
      if (!fontStyle) {
        fontStyle = document.createElement('style')
        fontStyle.id = 'dynamic-fonts'
        document.head.appendChild(fontStyle)
      }
      
      fontStyle.textContent = `
        h1, h2, h3, h4, h5, h6 {
          font-family: var(--dynamic-font-heading, ${theme.headingFont}), sans-serif !important;
        }
      `
    }
  }, [theme])

  return null
}

