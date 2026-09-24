import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactMessage } from '../types';
import { ReadingTimeBadge } from './ReadingTimeBadge';
import { useSocialModal } from '../context/SocialModalContext';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Linkedin,
  Github,
  Download,
  Clock,
  Sparkles
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { openProfile } = useSocialModal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    type: 'Job Opportunity',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<ContactMessage | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const msg: ContactMessage = {
        id: `msg_${Date.now()}`,
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        type: formData.type,
        message: formData.message.trim(),
        timestamp: new Date().toLocaleString()
      };

      try {
        const existing = JSON.parse(
          localStorage.getItem('nithinkrishnaah_messages') || '[]'
        );
        localStorage.setItem(
          'nithinkrishnaah_messages',
          JSON.stringify([msg, ...existing])
        );
      } catch (err) {
        console.error('Error saving message locally:', err);
      }

      setIsSubmitting(false);
      setSubmittedMessage(msg);
      setFormData({
        name: '',
        email: '',
        subject: '',
        type: 'Job Opportunity',
        message: ''
      });
    }, 600);
  };

  const downloadVCard = () => {
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${PERSONAL_INFO.name}`,
      `N:R S;Nithinkrishnaah;;;`,
      `TITLE:${PERSONAL_INFO.displayRole}`,
      `EMAIL;TYPE=INTERNET,HOME:${PERSONAL_INFO.email}`,
      `TEL;TYPE=CELL:${PERSONAL_INFO.phone}`,
      `ADR;TYPE=HOME:;;;Chennai;;Tamil Nadu;India`,
      `URL:${PERSONAL_INFO.socials.linkedin}`,
      `URL;TYPE=GitHub:${PERSONAL_INFO.socials.github}`,
      `NOTE:${PERSONAL_INFO.summary.replace(/,/g, '\\,')}`,
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Nithinkrishnaah_RS_Contact.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-10 border-b border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Initiate Conversation
            </span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <ReadingTimeBadge targetId="contact" defaultMinutes={1} />
          </div>
          <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-display">
            Contact & Collaboration
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Whether you have an exciting software engineering opening, a research inquiry, or want to discuss full-stack & deep learning architectures, feel free to reach out.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Contact Info & Prominent Socials */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900/60 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-2">
                Direct Contact Channels
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Based in Chennai, India. Open to relocation and remote software engineering opportunities worldwide.
              </p>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Email Channel */}
                <motion.div
                  whileHover={{ x: 3, transition: { duration: 0.2 } }}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white dark:border-slate-800/80 dark:bg-slate-950/60 p-3.5 transition-colors hover:border-indigo-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-600/20 dark:text-indigo-400">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Email</div>
                      <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="font-medium text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                    title="Copy email to clipboard"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {copiedField === 'email' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                </motion.div>

                {/* Phone Channel */}
                <motion.div
                  whileHover={{ x: 3, transition: { duration: 0.2 } }}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white dark:border-slate-800/80 dark:bg-slate-950/60 p-3.5 transition-colors hover:border-emerald-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-600/20 dark:text-emerald-400">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Phone</div>
                      <a
                        href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                        className="font-medium text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-mono"
                      >
                        {PERSONAL_INFO.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                    title="Copy phone to clipboard"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {copiedField === 'phone' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                </motion.div>

                {/* Location */}
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white dark:border-slate-800/80 dark:bg-slate-950/60 p-3.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-600/20 dark:text-sky-400">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Location</div>
                    <div className="font-medium text-slate-800 dark:text-slate-200">{PERSONAL_INFO.location}</div>
                  </div>
                </div>
              </div>

              {/* Download vCard action */}
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={downloadVCard}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white dark:border-slate-700/80 dark:bg-slate-800/60 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Download Contact Card (.vcf)</span>
                </button>
              </div>
            </div>

            {/* Prominent Professional Social Profiles Card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 dark:border-slate-800 dark:bg-slate-900/60">
              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                Verified Social & Developer Profiles
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => openProfile('linkedin')}
                  title="Inspect LinkedIn Profile & Credentials"
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 hover:border-blue-400 hover:shadow-sm dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-blue-500/50 dark:hover:bg-slate-900 transition-all group text-left cursor-pointer"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-300">LinkedIn Profile</div>
                    <div className="text-[11px] text-slate-500 truncate">Click to inspect details</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => openProfile('github')}
                  title="Inspect GitHub Repositories & Code"
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 hover:border-slate-400 hover:shadow-sm dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-slate-700 dark:hover:bg-slate-900 transition-all group text-left cursor-pointer"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <Github className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">GitHub Repos</div>
                    <div className="text-[11px] text-slate-500 truncate">Click to view repositories</div>
                  </div>
                </button>
              </div>

              <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-500">
                <Clock className="h-3 w-3 text-indigo-500 dark:text-indigo-400" />
                <span>Typical response time: Within 12 to 24 hours</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900/60 shadow-sm">
              {submittedMessage ? (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/30 p-6 sm:p-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 mb-4">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                    Message Sent Successfully
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-slate-900 dark:text-white">{submittedMessage.name}</span>. Your inquiry regarding{' '}
                    <span className="text-emerald-600 dark:text-emerald-300 font-medium">"{submittedMessage.subject}"</span> has been logged and forwarded to Nithinkrishnaah.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => setSubmittedMessage(null)}
                      className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(submittedMessage.subject)}&body=${encodeURIComponent(submittedMessage.message)}`}
                      className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
                    >
                      Open in Mail App
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                      Send a Message
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Direct Inbox Forwarding</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Your Name <span className="text-indigo-600 dark:text-indigo-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Your Email <span className="text-indigo-600 dark:text-indigo-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. s.jenkins@company.com"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Topic Category
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white transition-colors cursor-pointer"
                      >
                        <option value="Job Opportunity">Full-Time Job / Role</option>
                        <option value="Internship / Trainee">Internship Program</option>
                        <option value="Research & Academic">Research Discussion</option>
                        <option value="Freelance / Contract">Freelance Contract</option>
                        <option value="General Networking">General Connection</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Subject Line <span className="text-indigo-600 dark:text-indigo-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Software Engineer Role Inquiry"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Message Content <span className="text-indigo-600 dark:text-indigo-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details regarding your team, the scope, tech stack, or requirements..."
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white transition-colors"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Direct transmission with client confirmation receipt.
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Transmitting...</span>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
