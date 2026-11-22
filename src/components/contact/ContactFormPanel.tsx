import { memo, useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { useTranslations } from '~/store/ui-store'

const INITIAL_FORM = {
  name: '',
  company: '',
  phone: '',
  email: '',
  subject: '',
  message: '',
}

const INPUT_CLASS =
  'w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-white/45 outline-none transition focus:border-[#38bdf8]/70 focus:bg-white/[0.07] focus:ring-2 focus:ring-[#38bdf8]/20'

/** Interactive inquiry form panel inside the contact card. */
export const ContactFormPanel = memo(function ContactFormPanel() {
  const { t } = useTranslations()
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    setForm(INITIAL_FORM)
  }

  return (
    <div className="bg-[#0d1426]/85 p-5 min-[380px]:p-7 sm:p-9 md:col-span-7 lg:p-11">
      <div className="font-mono-tech text-[10px] font-bold tracking-[0.18em] text-[#00e5ff] uppercase">
        {t.contactPage.formEyebrow}
      </div>
      <h2 className="font-heading mt-2 text-2xl font-extrabold tracking-tight text-white">
        {t.contactPage.formTitle}
      </h2>

      {submitted ? (
        <div className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
          <h3 className="font-heading mt-3 text-lg font-bold text-white">
            {t.contactPage.sentTitle}
          </h3>
          <p className="mt-1.5 text-sm text-emerald-200/80">{t.contactPage.sentDesc}</p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#070b16] transition hover:bg-[#38bdf8] cursor-pointer"
          >
            {t.contactPage.sendAnother}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold text-white/80">
                {t.contactPage.nameLabel}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder={t.contactPage.namePlaceholder}
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label htmlFor="contact-company" className="mb-1.5 block text-xs font-semibold text-white/80">
                {t.contactPage.companyLabel}
              </label>
              <input
                id="contact-company"
                name="company"
                type="text"
                value={form.company}
                onChange={handleChange}
                placeholder={t.contactPage.companyPlaceholder}
                className={INPUT_CLASS}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-phone" className="mb-1.5 block text-xs font-semibold text-white/80">
                {t.contactPage.phoneLabel}
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="+374 XX XXX XXX"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold text-white/80">
                {t.contactPage.emailFieldLabel}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="example@mail.ru"
                className={INPUT_CLASS}
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-semibold text-white/80">
              {t.contactPage.subjectLabel}
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
              placeholder={t.contactPage.subjectPlaceholder}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold text-white/80">
              {t.contactPage.messageLabel}
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              value={form.message}
              onChange={handleChange}
              placeholder={t.contactPage.messagePlaceholder}
              className={`${INPUT_CLASS} resize-none py-3`}
            />
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1E47AD] to-[#2563eb] px-6 py-3.5 font-heading text-sm font-bold text-white shadow-lg shadow-[#2563eb]/35 transition hover:from-[#2563eb] hover:to-[#38bdf8] hover:text-[#070b16] cursor-pointer"
          >
            <span>{t.contactPage.submitButton}</span>
            <Send className="h-4 w-4" />
          </button>
        </form>
      )}
    </div>
  )
})
