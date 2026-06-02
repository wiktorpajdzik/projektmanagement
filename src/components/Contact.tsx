'use client';

import { useState } from 'react';
import { Send, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = t.contact.required;
    if (!form.email.trim()) {
      e.email = t.contact.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = '✕ Ungültige E-Mail';
    }
    if (!form.message.trim()) e.message = t.contact.required;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    // Simulate send – wire up to your backend/API here
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
  };

  const inputStyle = (hasError?: string): React.CSSProperties => ({
    width: '100%',
    background: '#F8FAFC',
    border: `1px solid ${hasError ? '#DC2626' : '#E2E8F0'}`,
    borderRadius: 0,
    padding: '14px 16px',
    fontFamily: "'Jost', sans-serif",
    fontSize: '15px',
    fontWeight: 400,
    color: '#0F172A',
    outline: 'none',
    transition: 'border-color 200ms',
    boxSizing: 'border-box',
    minHeight: '48px',
  });

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Jost', sans-serif",
    fontWeight: 500,
    fontSize: '13px',
    color: '#334155',
    marginBottom: '6px',
    display: 'block',
    letterSpacing: '0.04em',
  };

  const errorStyle: React.CSSProperties = {
    fontFamily: "'Jost', sans-serif",
    fontSize: '12px',
    color: '#DC2626',
    marginTop: '4px',
  };

  return (
    <section
      id="kontakt"
      style={{ background: '#F1F5F9', padding: '100px 0' }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '80px',
          alignItems: 'start',
        }}
      >
        {/* Left: Info */}
        <div>
          <p style={sectionLabel}>{t.nav.contact}</p>
          <h2 style={headingStyle}>{t.contact.heading}</h2>
          <p style={subStyle}>{t.contact.subheading}</p>

          <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { Icon: MapPin, label: t.footer.address_label, val: t.footer.address },
              { Icon: Phone, label: t.footer.phone_label, val: t.footer.phone },
              { Icon: Mail, label: t.footer.email_label, val: t.footer.email },
            ].map(({ Icon, label, val }, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '20px 0',
                  borderBottom: i < 2 ? '1px solid #E2E8F0' : 'none',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    background: '#FEF0E9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} color="#EA580C" strokeWidth={1.5} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '11px', fontWeight: 500, color: '#94A3B8', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '15px', fontWeight: 400, color: '#334155' }}>
                    {val}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div style={{ background: '#FFFFFF', padding: '48px 40px' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <CheckCircle2 size={48} color="#EA580C" strokeWidth={1.5} style={{ margin: '0 auto 16px' }} />
              <p style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '1.4rem', fontWeight: 600, color: '#0F172A', marginBottom: '8px' }}>
                {t.contact.success}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 20px' }}>
                {/* Name */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="contact-name" style={labelStyle}>
                    {t.contact.name} <span style={{ color: '#EA580C' }}>*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder={t.contact.name_ph}
                    value={form.name}
                    onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: undefined }); }}
                    style={inputStyle(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-invalid={!!errors.name}
                    onFocus={(e) => (e.target.style.borderColor = '#EA580C')}
                    onBlur={(e) => (e.target.style.borderColor = errors.name ? '#DC2626' : '#E2E8F0')}
                  />
                  {errors.name && <p id="name-error" role="alert" style={errorStyle}>{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" style={labelStyle}>
                    {t.contact.email} <span style={{ color: '#EA580C' }}>*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder={t.contact.email_ph}
                    value={form.email}
                    onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: undefined }); }}
                    style={inputStyle(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={!!errors.email}
                    onFocus={(e) => (e.target.style.borderColor = '#EA580C')}
                    onBlur={(e) => (e.target.style.borderColor = errors.email ? '#DC2626' : '#E2E8F0')}
                  />
                  {errors.email && <p id="email-error" role="alert" style={errorStyle}>{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="contact-phone" style={labelStyle}>{t.contact.phone}</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder={t.contact.phone_ph}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    style={inputStyle()}
                    onFocus={(e) => (e.target.style.borderColor = '#EA580C')}
                    onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                  />
                </div>

                {/* Message */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="contact-message" style={labelStyle}>
                    {t.contact.message} <span style={{ color: '#EA580C' }}>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    placeholder={t.contact.message_ph}
                    value={form.message}
                    onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: undefined }); }}
                    rows={5}
                    style={{
                      ...inputStyle(errors.message),
                      resize: 'vertical',
                      minHeight: '120px',
                    }}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    aria-invalid={!!errors.message}
                    onFocus={(e) => (e.target.style.borderColor = '#EA580C')}
                    onBlur={(e) => (e.target.style.borderColor = errors.message ? '#DC2626' : '#E2E8F0')}
                  />
                  {errors.message && <p id="message-error" role="alert" style={errorStyle}>{errors.message}</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={sending}
                style={{
                  marginTop: '24px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  background: sending ? '#CBD5E1' : '#EA580C',
                  color: '#fff',
                  border: 'none',
                  padding: '16px 24px',
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 600,
                  fontSize: '15px',
                  letterSpacing: '0.04em',
                  cursor: sending ? 'not-allowed' : 'pointer',
                  transition: 'background 200ms',
                  minHeight: '54px',
                }}
                onMouseEnter={(e) => { if (!sending) (e.currentTarget as HTMLButtonElement).style.background = '#C2410C'; }}
                onMouseLeave={(e) => { if (!sending) (e.currentTarget as HTMLButtonElement).style.background = '#EA580C'; }}
              >
                {sending ? (
                  <span style={{ display: 'inline-block', width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                ) : (
                  <>
                    <Send size={17} />
                    {t.contact.submit}
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}

const sectionLabel: React.CSSProperties = {
  fontFamily: "'Jost', sans-serif",
  fontWeight: 500,
  fontSize: '12px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#EA580C',
  marginBottom: '12px',
};

const headingStyle: React.CSSProperties = {
  fontFamily: "'Bodoni Moda', serif",
  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
  fontWeight: 700,
  color: '#0F172A',
  marginBottom: '16px',
};

const subStyle: React.CSSProperties = {
  fontFamily: "'Jost', sans-serif",
  fontSize: '17px',
  fontWeight: 300,
  color: '#64748B',
  lineHeight: 1.7,
};
