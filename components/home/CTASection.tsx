'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiMail, FiLock, FiUser, FiGlobe, FiArrowRight, FiCheck, FiTwitter, FiGithub } from 'react-icons/fi'
import { FaGoogle } from 'react-icons/fa'

export default function CTASection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    language: 'english'
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-20 flex items-center">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Join Our Community</span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight">
              Join Our{' '}
              <span className="neon-text">Creative</span>
              <br />
              Community
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              Sign up to explore smarter conversations and seamless teamwork. Connect with creators from around the world.
            </p>

            {/* Features List */}
            <div className="space-y-3 pt-4">
              {[
                'Connect with global creators',
                'Share your stories instantly',
                'Get real-time feedback',
                'Join exclusive events'
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <FiCheck className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="pt-6">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">2,500+</span> creators joined this week
              </p>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-green-100 mx-auto mb-4 flex items-center justify-center">
                  <FiCheck className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome Aboard!</h3>
                <p className="text-gray-600">Check your email to verify your account</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Create an account</h3>
                  <p className="text-gray-500 text-sm mt-1">Join the creative community</p>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-gray-900"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-gray-900"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-gray-900"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-gray-900"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                {/* Preferred Language */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
                  <div className="relative">
                    <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-gray-900 appearance-none cursor-pointer"
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="japanese">Japanese</option>
                      <option value="korean">Korean</option>
                    </select>
                  </div>
                </div>

                {/* Sign Up Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Sign Up</span>
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Or sign up with</span>
                  </div>
                </div>

                {/* Social Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button className="py-2.5 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all duration-300 flex items-center justify-center gap-2 group">
                    <FaGoogle className="w-4 h-4 text-gray-600 group-hover:text-primary" />
                    <span className="text-sm text-gray-600 group-hover:text-primary">Google</span>
                  </button>
                  <button className="py-2.5 rounded-xl border border-gray-200 hover:border-[#1DA1F2] hover:bg-[#1DA1F2]/5 transition-all duration-300 flex items-center justify-center gap-2 group">
                    <FiTwitter className="w-4 h-4 text-gray-600 group-hover:text-[#1DA1F2]" />
                    <span className="text-sm text-gray-600 group-hover:text-[#1DA1F2]">Twitter</span>
                  </button>
                  <button className="py-2.5 rounded-xl border border-gray-200 hover:border-[#333] hover:bg-[#333]/5 transition-all duration-300 flex items-center justify-center gap-2 group">
                    <FiGithub className="w-4 h-4 text-gray-600 group-hover:text-[#333]" />
                    <span className="text-sm text-gray-600 group-hover:text-[#333]">GitHub</span>
                  </button>
                </div>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-600 mt-4">
                  Already have an account?{' '}
                  <Link href="/login" className="text-primary font-semibold hover:text-secondary transition-colors">
                    Login
                  </Link>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}