'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiTwitter, FiGithub, FiInstagram, FiMail } from 'react-icons/fi'

const footerLinks = {
  Product: ['Features', 'Pricing', 'Integrations', 'Changelog'],
  Resources: ['Documentation', 'Tutorials', 'Blog', 'Support'],
  Company: ['About', 'Careers', 'Contact', 'Partners'],
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 relative overflow-hidden rounded-t-3xl">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="group relative inline-block mb-4">
              <h2 className="text-2xl font-display font-bold text-gray-900">
                GoodLantey
                <span className="text-primary">.</span>
              </h2>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              Empowering storytellers worldwide. Create, share, and discover amazing comics, manga, and visual stories.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300"
              >
                <FiTwitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300"
              >
                <FiGithub className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300"
              >
                <FiInstagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300"
              >
                <FiMail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-gray-500 hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2025 GoodLantey. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
              Cookies Settings
            </Link>
          </div>
        </div>
      </div>

      {/* Large Half-Visible Logo at Bottom */}
      <div className="relative overflow-hidden">
        <div className="text-center pb-8 opacity-10">
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-display font-bold text-gray-900 tracking-wider select-none">
            GoodLantey
          </h1>
        </div>
        {/* Gradient fade at the bottom of the logo */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>
    </footer>
  )
}