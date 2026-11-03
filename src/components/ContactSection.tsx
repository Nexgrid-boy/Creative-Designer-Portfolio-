import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, ArrowUpRight, MessageSquare, Video } from 'lucide-react';
import { DESIGNER_INFO } from '../data/projects';

interface ContactSectionProps {
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: preselectedService || 'Graphics Design & Brand Systems',
    budget: '$5k – $15k',
    timeline: 'Within 2–4 Weeks',
    details: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate swift submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative bg-[#070709] border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-3">
            <span>Availability</span>
            <span aria-hidden="true">·</span>
            <span>Q1 / Q2 2026</span>
            <span aria-hidden="true">·</span>
            <span>Worldwide Remote</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Let&apos;s Build Something Unforgettable
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-4 leading-relaxed">
            Have a commercial campaign, motion identity, or experimental AI video in mind? Reach out with your project parameters to get a tailored proposal.
          </p>
        </div>

        {/* 2-Column Split: Inquiry Form & Direct Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-zinc-950/70 p-6 sm:p-10 rounded-2xl border border-zinc-800/90 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center animate-in fade-in duration-200">
                <div className="w-14 h-14 bg-amber-400/10 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Project Inquiry Received
                </h3>
                <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed mb-6">
                  Thank you for reaching out, <span className="text-zinc-200 font-semibold">{formData.name}</span>. I have received your request for <span className="text-amber-400">{formData.service}</span> and will review your parameters within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      service: 'Graphics Design & Brand Systems',
                      budget: '$5k – $15k',
                      timeline: 'Within 2–4 Weeks',
                      details: ''
                    });
                  }}
                  className="px-5 py-2.5 text-xs font-semibold text-zinc-900 bg-amber-400 rounded-xl hover:bg-amber-300 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-zinc-900/80 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-zinc-900/80 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Service Needed */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono mb-2">
                      Project Service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                    >
                      <option value="Graphics Design & Brand Systems">Graphics Design & Brand Systems</option>
                      <option value="Motion Design & Dynamic Animation">Motion Design & Dynamic Animation</option>
                      <option value="AI Motion Design & Generative Video">AI Motion Design & Generative Video</option>
                      <option value="Integrated Creative Direction">Integrated Creative Direction (All 3 Disciplines)</option>
                      <option value="Other Custom Creative Production">Other Custom Project</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono mb-2">
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                    >
                      <option value="Under $5,000">Under $5,000</option>
                      <option value="$5,000 – $15,000">$5,000 – $15,000</option>
                      <option value="$15,000 – $30,000">$15,000 – $30,000</option>
                      <option value="$30,000+">$30,000+ (Comprehensive Campaign)</option>
                    </select>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono mb-2">
                    Project Brief & Vision *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about the concept, references, deliverables, and target deadline..."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-zinc-900/80 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 text-sm font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-xl transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>Transmit Project Brief</span>
                      <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Info & Social Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Direct Email Card */}
              <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-xs uppercase font-mono tracking-wider text-zinc-500 block mb-2">
                  Direct Inquiries & Bookings
                </span>
                <a
                  href={`mailto:${DESIGNER_INFO.contactEmail}`}
                  className="text-lg font-bold text-white hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-5 h-5 text-amber-400" />
                  <span className="break-all">{DESIGNER_INFO.contactEmail}</span>
                </a>
                <span className="text-xs text-zinc-500 block mt-2">
                  Expect a response within 24 hours Monday through Friday.
                </span>
              </div>

              {/* Social Channels List */}
              <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-xs uppercase font-mono tracking-wider text-zinc-500 block mb-4">
                  Official Channels & Video Feeds
                </span>

                <div className="space-y-3">
                  {/* YouTube */}
                  <a
                    href="https://www.youtube.com/@thedigitaire"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-red-500/40 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-amber-400 transition-colors">
                          YouTube
                        </div>
                        <div className="text-[11px] text-zinc-500 font-mono">
                          @thedigitaire
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                  </a>

                  {/* TikTok */}
                  <a
                    href="https://tiktok.com/@thedigitairee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-cyan-400/40 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-400/10 text-cyan-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.67 6.34 6.34 0 0 0 9.36 22a6.33 6.33 0 0 0 6.33-6.33V9.28a8.16 8.16 0 0 0 4.78 1.52v-3.4a4.85 4.85 0 0 1-.88-.71z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-amber-400 transition-colors">
                          TikTok
                        </div>
                        <div className="text-[11px] text-zinc-500 font-mono">
                          @thedigitairee
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            {/* Availability Pill */}
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
              <strong className="text-amber-300">Currently Booking:</strong> Q1 / Q2 commercial spots, title sequences, and music video directing. Worldwide remote with studio availability in London and European time zones.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
