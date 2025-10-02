'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Radar from '@/components/ui/Radar';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT, ICONS } from '@/app/config/profile';
import { useT } from '@/app/i18n/useT';
import { CiSquareCheck } from "react-icons/ci";

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const t = useT();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (sending) return;
  setSending(true);
  setSent(false);

  try {
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("message", form.message);
    fd.append("botcheck", ""); 

    const res = await fetch("/api/contact", {
      method: "POST",
      body: fd,
    });

    const result = await res.json();

    if (result.success) {
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 2600);
    } else {
      console.error(result);
      alert(t.contact.error_1);
    }
  } catch (err) {
    console.error(err);
    alert(t.contact.error_2);
  } finally {
    setSending(false);
  }
};



  return (
    <section id="contact" aria-label={t.nav.contact} className="relative overflow-visible text-white py-16 md:py-20">
      <Card>
        <div className="relative">
          <div className="hidden md:block absolute pointer-events-none -z-10">
            <div className="absolute inset-0 opacity-[0.06] [background:radial-gradient(1px_1px_at_20px_20px,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:18px_18px]" />
            <div
              className="absolute -inset-24 blur-3xl opacity-15"
              style={{
                background:
                  'radial-gradient(600px 300px at 80% 10%, var(--color-primary), transparent), radial-gradient(500px 280px at 10% 90%, var(--color-secondary), transparent)',
              }}
            />
          </div>

          <div className="container mx-auto h-full">
            <div>
              <div className="grid h-full gap-8 md:grid-cols-[1.1fr_.9fr] items-center z-10 relative">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold uppercase">{t.contact.title_1}
                  <span className="text-[var(--color-primary)]">{t.contact.title_2}</span></h2>
                  <p className="mt-3 text-gray-300 leading-relaxed">
                    {t.contact.body}
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                    <label className="sr-only" htmlFor="name">{t.contact.con_name}</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder={t.contact.con_name}
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-lime-400 outline-none"
                    />
                    <label className="sr-only" htmlFor="email">{t.contact.con_email}</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder={t.contact.con_email}
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-lime-400 outline-none"
                    />
                    <label className="sr-only" htmlFor="message">{t.contact.con_msg}</label>
                    <div className="relative">
                      <label className="sr-only" htmlFor="message">{t.contact.con_msg}</label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder={t.contact.con_msg_ph}
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        required
                        disabled={sending || sent}
                        className={`w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none resize-none
                  focus:border-lime-400 transition
                  ${sent ? 'opacity-60 pointer-events-none' : ''}`}
                      />

                      <AnimatePresence>
                        {sent && (
                          <motion.div
                            role="status"
                            aria-live="polite"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.25 }}
                            className="absolute inset-0 grid place-items-center pointer-events-none"
                          >
                            <div
                              className="pointer-events-auto rounded-xl border border-white/15 bg-white/8 px-5 py-4
                       backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,.35)] text-center"
                              style={{
                                background:
                                  'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
                              }}
                            >
                              <div className="mx-auto mb-2 grid h-8 w-8 place-items-center">
                                <CiSquareCheck className="w-8 h-8 text-[var(--color-primary)]" />
                              </div>
                              <div className="text-sm text-white/95">{t.contact.thanks}</div>

                              <div className="mt-3 h-1 w-full overflow-hidden rounded bg-white/10">
                                <motion.span
                                  className="block h-full bg-lime-400/80"
                                  initial={{ width: 0 }}
                                  animate={{ width: '100%' }}
                                  transition={{ duration: 2.6, ease: 'linear' }}
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <motion.button
                      whileHover={{ y: sending ? 0 : -2 }}
                      whileTap={{ scale: sending ? 1 : 0.98 }}
                      type="submit"
                      disabled={sending}
                      className={`w-full
                        ${sending
                          ? 'btn bg-white/10 text-white/70 cursor-not-allowed justify-center text-base'
                          : 'btn btn--primary justify-center text-base '} `}
                      aria-busy={sending}
                    >
                      {sending ? (
                        <span className="inline-flex items-center gap-2">
                          <Spinner /> {t.contact.sending}
                        </span>
                      ) : (
                        t.contact.send
                      )}
                    </motion.button>
                  </form>


                </div>

                <div className="relative h-48 md:h-64 lg:h-72 overflow-visible">
                  <Radar
                    targets={[
                      { angleUI: 300, r: 140, label: t.labels.contact.github, href: CONTACT.github, Icon: ICONS.github },
                      { angleUI: 210, r: 100, label: t.labels.contact.linkedin, href: CONTACT.linkedin, Icon: ICONS.linkedin },
                      { angleUI: 90, r: 60, label: t.labels.contact.email, href: CONTACT.email, Icon: ICONS.email },
                      { angleUI: 0, r: 100, label: t.labels.contact.cv, href: CONTACT.cv, Icon: ICONS.cv },
                      { angleUI: 150, r: 140, label: t.labels.contact.discord, href: CONTACT.discord, Icon: ICONS.discord },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}


function Spinner() {
  return (
    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/50 border-t-transparent" />
  );
}