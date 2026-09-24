import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactMessage } from '../types';
import { ReadingTimeBadge } from './ReadingTimeBadge';
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
        console.error('Failed to store message', err);
      }

      setSubmittedMessage(msg);
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        type: 'Job Opportunity',
        message: ''
      });
    }, 600);
  };

  // Generate downloadable vCard
  const downloadVCard = () => {
    const vCardContent = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${PERSONAL_INFO.name}`,
      'TITLE:Software Engineer & AI Researcher',
      `EMAIL;TYPE=INTERNET,PREF:${PERSONAL_INFO.email}`,
      `TEL;TYPE=CELL,VOICE:${PERSONAL_INFO.phone}`,
      `ADR;TYPE=WORK:;;${PERSONAL_INFO.location};;;;`,
      `URL;TYPE=LinkedIn:${PERSONAL_INFO.socials.linkedin}`,
      `URL;TYPE=GitHub:${PERSONAL_INFO.socials.github}`,
      `NOTE:Computer Science Engineering Graduate (Sathyabama Institute) - Full-Stack & AI Engineer`,
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Nithinkrishnaah_RS.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-950 transition-colors duration-200">
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
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-2">
                Direct Contact Channels
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Based in Chennai, India. Open to relocation and remote software engineering opportunities worldwide.
              </p>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Email Channel */}
                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white dark:border-slate-800/80 dark:bg-slate-950/60 p-3.5">
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
                </div>

                {/* Phone Channel */}
                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white dark:border-slate-800/80 dark:bg-slate-950/60 p-3.5">
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
                </div>

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
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 hover:border-blue-400 hover:shadow-sm dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-blue-500/50 dark:hover:bg-slate-900 transition-all group"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-300">LinkedIn</div>
                    <div className="text-[11px] text-slate-500 truncate">nithinkrishnaah</div>
                  </div>
                </a>

                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 hover:border-slate-400 hover:shadow-sm dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-slate-700 dark:hover:bg-slate-900 transition-all group"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <Github className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">GitHub</div>
                    <div className="text-[11px] text-slate-500 truncate">nithinkrishnaah</div>
                  </div>
                </a>
              </div>

              <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-500">
                <Clock className="h-3 w-3 text-indigo-500 dark:text-indigo-400" />
                <span>Typical response time: Within 12 to 24 hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900/60">
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
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maya Chen"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. maya@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Inquiry Nature *
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:border-indigo-500 focus:outline-none transition-colors"
                      >
                        <option value="Job Opportunity">Full-time Engineering Role</option>
                        <option value="Freelance / Contract">Freelance / Contract Project</option>
                        <option value="Research Collaboration">Research & Paper Collaboration</option>
                        <option value="General Inquiry">General Networking & Tech Chat</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Subject Line *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Software Engineer Position"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      minLength={10}
                      placeholder="Share details about the role, project scope, or opportunity..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 p-3.5 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-[11px] text-slate-500">
                      Your email is never shared or stored externally.
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors disabled:opacity-50 cursor-pointer"
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
          </div>
        </div>
      </div>
    </section>
  );
};
