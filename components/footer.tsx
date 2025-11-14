import { Instagram, Mail, Facebook, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-4 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Jake Turner Fitness</h3>
            <p className="text-gray-400">Transform Your Body. Elevate Your Mind.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-zinc-900 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-zinc-900 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-zinc-900 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
            </div>
            <a
              href="mailto:jake@turnerfitness.com"
              className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors"
            >
              <Mail className="w-4 h-4" />
              jake@turnerfitness.com
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-zinc-900 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Jake Turner Fitness. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
