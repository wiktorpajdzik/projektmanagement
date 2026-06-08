'use client';

import { useState } from 'react';
import { Send, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

interface FormData { name: string; email: string; phone: string; message: string; }
interface FormErrors { name?: string; email?: string; message?: string; }

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = t.contact.required;
    if (!form.email.trim()) { e.email = t.contact.required; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { e.email = '✕ Ungültige E-Mail'; }
    if (!form.message.trim()) e.message = t.contact.required;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
  };

  const inputStyle = (hasError?: string): React.CSSProperties => ({
    width: '100%', background: '#111111',
    border: `1px solid ${hasError ? '#DC2626' : 'rgba(196,164,74,0.2)'}`,
    borderRadius: 0, padding: '14px 16px',
    fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300,
    color: '#F9F7F4', outline: 'none', transition: 'border-color 200ms',
    boxSizing: 'border-box', minHeight: '48px',
  });

  const fldLabel: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: '11px',
    letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555550',
    marginBottom: '8px', display: 'block',
  };
  const errStyle: React.CSSProperties = { fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#DC2626', marginTop: '4px' };

  return (
    <section id="kontakt" style={{ background: '#0A0A0A', padding: '120px 0' }}>
      <div className="pm-contact-grid" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* Left */}
        <div>
          <p style={sectionLabel}>{t.nav.contact}</p>
          <h2 style={headingStyle}>{t.contact.heading}</h2>
          <div style={{ width: '60px', height: '2px', background: '#C4A44A', margin: '20px 0 24px' }} />
          <p style={subStyle}>{t.contact.subheading}</p>

          <div style={{ marginTop: '44px', display: 'flex', flexDirection: 'column' }}>
            {[
              { Icon: MapPin, label: t.footer.address_label, val: t.footer.address },
              { Icon: Phone, label: t.footer.phone_label, val: t.footer.phone },
              { Icon: Mail, label: t.footer.email_label, val: t.footer.email },
            ].map(({ Icon, label, val }, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', padding: '20px 0', borderBottom: i < 2 ? '1px solid rgba(196,164,74,0.1)' : 'none', alignItems: 'flex-start' }}>
                <div style={{ width: '38px', height: '38px', border: '1px solid rgba(196,164,74,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={15} color="#C4A44A" strokeWidth={1.5} />
                </div>
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: '#555550', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '4px' }}>{label}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300, color: '#888880' }}>{val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div className="pm-contact-form-box" style={{ background: '#111111', border: '1px solid rgba(196,164,74,0.1)' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '1px solid rgba(196,164,74,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <CheckCircle2 size={28} color="#C4A44A" strokeWidth={1.5} />
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 600, color: '#F9F7F4' }}>{t.contact.success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="pm-form-grid">

                <div style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="contact-name" style={fldLabel}>{t.contact.name} <span style={{ color: '#C4A44A' }}>*</span></label>
                  <input id="contact-name" type="text" placeholder={t.contact.name_ph} value={form.name}
                    onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: undefined }); }}
                    style={inputStyle(errors.name)} aria-invalid={!!errors.name}
                    onFocus={(e) => (e.target.style.borderColor = '#C4A44A')}
                    onBlur={(e) => (e.target.style.borderColor = errors.name ? '#DC2626' : 'rgba(196,164,74,0.2)')} />
                  {errors.name && <p role="alert" style={errStyle}>{errors.name}</p>}
                </div>

                <div className="pm-form-email">
                  <label htmlFor="contact-email" style={fldLabel}>{t.contact.email} <span style={{ color: '#C4A44A' }}>*</span></label>
                  <input id="contact-email" type="email" placeholder={t.contact.email_ph} value={form.email}
                    onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: undefined }); }}
                    style={inputStyle(errors.email)} aria-invalid={!!errors.email}
                    onFocus={(e) => (e.target.style.borderColor = '#C4A44A')}
                    onBlur={(e) => (e.target.style.borderColor = errors.email ? '#DC2626' : 'rgba(196,164,74,0.2)')} />
                  {errors.email && <p role="alert" style={errStyle}>{errors.email}</p>}
                </div>

                <div className="pm-form-phone">
                  <label htmlFor="contact-phone" style={fldLabel}>{t.contact.phone}</label>
                  <input id="contact-phone" type="tel" placeholder={t.contact.phone_ph} value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    style={inputStyle()}
                    onFocus={(e) => (e.target.style.borderColor = '#C4A44A')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(196,164,74,0.2)')} />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="contact-message" style={fldLabel}>{t.contact.message} <span style={{ color: '#C4A44A' }}>*</span></label>
                  <textarea id="contact-message" placeholder={t.contact.message_ph} value={form.message}
                    onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: undefined }); }}
                    rows={5} style={{ ...inputStyle(errors.message), resize: 'vertical', minHeight: '130px' }}
                    aria-invalid={!!errors.message}
                    onFocus={(e) => (e.target.style.borderColor = '#C4A44A')}
                    onBlur={(e) => (e.target.style.borderColor = errors.message ? '#DC2626' : 'rgba(196,164,74,0.2)')} />
                  {errors.message && <p role="alert" style={errStyle}>{errors.message}</p>}
                </div>
              </div>

              <button type="submit" disabled={sending}
                style={{ marginTop: '24px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: sending ? '#242424' : '#C4A44A', color: sending ? '#555550' : '#0A0A0A', border: 'none', padding: '16px 24px', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', cursor: sending ? 'not-allowed' : 'pointer', transition: 'background 200ms', minHeight: '52px' }}
                onMouseEnter={(e) => { if (!sending) (e.currentTarget as HTMLButtonElement).style.background = '#E2C97E'; }}
                onMouseLeave={(e) => { if (!sending) (e.currentTarget as HTMLButtonElement).style.background = '#C4A44A'; }}
              >
                {sending
                  ? <span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(196,164,74,0.3)', borderTopColor: '#C4A44A', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  : <><Send size={15} />{t.contact.submit}</>}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .pm-contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: start;
        }
        .pm-contact-form-box { padding: 48px 40px; }
        .pm-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px 20px;
        }
        @media (max-width: 860px) {
          .pm-contact-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          #kontakt { padding: 80px 0 !important; }
        }
        @media (max-width: 540px) {
          .pm-contact-form-box { padding: 32px 20px; }
          .pm-form-grid { grid-template-columns: 1fr; }
          .pm-form-email, .pm-form-phone { grid-column: 1 / -1; }
        }
      `}</style>
    </section>
  );
}

const sectionLabel: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: '11px',
  letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C4A44A', marginBottom: '14px',
};
const headingStyle: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)',
  fontWeight: 600, color: '#F9F7F4', lineHeight: 1.1,
};
const subStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 300, color: '#888880', lineHeight: 1.75,
};
