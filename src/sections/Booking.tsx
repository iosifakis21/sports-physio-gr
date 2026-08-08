"use client";

import React, { useState } from "react";
import { CheckItem } from "@/components/CheckItem";
import { Button } from "@/components/Button";
import servicesData from "@/content/services.json";

interface FormState {
  serviceId: string;
  preferredDay: string;
  preferredTime: string;
  fullName: string;
  phone: string;
  email: string;
  gdprAccepted: boolean;
}

export const Booking: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<FormState>({
    serviceId: servicesData[0]?.id || "",
    preferredDay: "",
    preferredTime: "",
    fullName: "",
    phone: "",
    email: "",
    gdprAccepted: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Load service options
  const services = servicesData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
      if (name === "gdprAccepted" && checked) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next.gdprAccepted;
          return next;
        });
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear error as user types
      if (errors[name]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next.ariaSummary;
          delete next[name];
          return next;
        });
      }
    }
  };

  const handleNext = () => {
    const nextErrors: { [key: string]: string } = {};

    if (!formData.serviceId) {
      nextErrors.serviceId = "Παρακαλώ επιλέξτε υπηρεσία.";
    }
    if (!formData.preferredDay) {
      nextErrors.preferredDay = "Παρακαλώ επιλέξτε προτιμώμενη μέρα.";
    }
    if (!formData.preferredTime) {
      nextErrors.preferredTime = "Παρακαλώ επιλέξτε προτιμώμενη ώρα.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
    } else {
      setErrors({});
      setStep(2);
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: { [key: string]: string } = {};

    // Validate name
    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Παρακαλώ συμπληρώστε το ονοματεπώνυμό σας.";
    }

    // Validate phone (10-digit Greek checking: starting with 6 or 2 is common, but basic test check is just digits and length)
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      nextErrors.phone = "Το τηλέφωνο πρέπει να έχει 10 ψηφία.";
    }

    // Validate GDPR checkbox
    if (!formData.gdprAccepted) {
      nextErrors.gdprAccepted = "Πρέπει να αποδεχτείτε την Πολιτική Απορρήτου για να συνεχίσετε.";
    }

    if (Object.keys(nextErrors).length > 0) {
      nextErrors.ariaSummary = "Υπάρχουν σφάλματα στη φόρμα. Παρακαλώ διορθώστε τα παρακάτω.";
      setErrors(nextErrors);
    } else {
      setErrors({});
      // Log payload to console (Do NOT store patient data in localStorage/sessionStorage)
      console.log("SUCCESSFUL BOOKING REQUEST PAYLOAD:", formData);
      setIsSubmitted(true);
    }
  };

  const getSelectedServiceName = () => {
    const selected = services.find((s) => s.id === formData.serviceId);
    return selected ? selected.title : "";
  };

  // Human-readable day helper
  const getDayLabel = (val: string) => {
    switch (val) {
      case "monday": return "Δευτέρα";
      case "tuesday": return "Τρίτη";
      case "wednesday": return "Τετάρτη";
      case "thursday": return "Πέμπτη";
      case "friday": return "Παρασκευή";
      case "saturday": return "Σάββατο";
      default: return val;
    }
  };

  return (
    <section id="kleiste-rantevou" className="py-[56px] md:py-[96px] bg-primary text-white select-none scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col gap-10 md:gap-12 items-center">
        
        {/* Header content */}
        <div className="text-center flex flex-col gap-4 max-w-2xl">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight">
            Ξεκινήστε την αποκατάστασή σας σήμερα
          </h2>
          <p className="font-sans text-sm md:text-base text-slate-200 leading-relaxed">
            Κλείστε το ραντεβού σας εύκολα και γρήγορα σε 2 απλά βήματα χωρίς να απαιτείται δημιουργία λογαριασμού.
          </p>

          {/* Compact Trust checkmarks row with white-contrast style overrides */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-6 mt-2 text-slate-200 text-xs sm:text-sm font-sans [&_span]:!text-slate-100 font-medium">
            <CheckItem text="10+ χρόνια εμπειρίας" />
            <CheckItem text="Συμβεβλημένος με ΕΟΠΥΥ" />
            <CheckItem text="Δεκτές όλες οι ασφαλιστικές" />
            <CheckItem text="Κράτηση σε < 1 λεπτό" />
          </div>
        </div>

        {/* Dynamic accessibility live-region announcements for screen readers */}
        <div aria-live="assertive" className="sr-only">
          {errors.ariaSummary && <span>{errors.ariaSummary}</span>}
          {errors.fullName && <span>{errors.fullName}</span>}
          {errors.phone && <span>{errors.phone}</span>}
          {errors.gdprAccepted && <span>{errors.gdprAccepted}</span>}
        </div>

        {/* Main form card container */}
        <div className="w-full max-w-xl bg-surface text-ink-600 rounded-card p-6 md:p-10 border border-white/10 shadow-xl relative overflow-hidden">
          
          {isSubmitted ? (
            /* Success confirmation screen */
            <div className="flex flex-col items-center text-center gap-5 py-6">
              <span className="w-16 h-16 rounded-full bg-success/20 text-success flex items-center justify-center text-3xl select-none" aria-hidden="true">
                ✓
              </span>
              <h3 className="font-display font-bold text-xl md:text-2xl text-ink-900 leading-tight">
                Το αίτημά σας καταχωρήθηκε!
              </h3>
              <p className="font-sans text-sm md:text-base text-ink-600 leading-relaxed max-w-sm">
                Λάβαμε το αίτημά σας για <strong>{getSelectedServiceName()}</strong> την <strong>{getDayLabel(formData.preferredDay)}</strong> στις <strong>{formData.preferredTime}</strong>. 
                Θα επικοινωνήσουμε μαζί σας στο <strong>{formData.phone}</strong> για την τελική επιβεβαίωση.
              </p>
              <Button
                variant="secondary"
                label="Νέα Κράτηση"
                onClick={() => {
                  setIsSubmitted(false);
                  setStep(1);
                  setFormData({
                    serviceId: services[0]?.id || "",
                    preferredDay: "",
                    preferredTime: "",
                    fullName: "",
                    phone: "",
                    email: "",
                    gdprAccepted: false,
                  });
                }}
                className="mt-2"
              />
            </div>
          ) : (
            /* Multi-step Interactive form */
            <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
              
              {/* Progress step bar */}
              <div className="flex justify-between items-center border-b border-ink-900/10 pb-4 select-none">
                <span className="font-display font-bold text-sm text-ink-900 uppercase">
                  Βήμα {step} από 2: {step === 1 ? "Υπηρεσία & Ώρα" : "Στοιχεία Επικοινωνίας"}
                </span>
                <div className="flex gap-1.5">
                  <div className={`w-3.5 h-3.5 rounded-full ${step === 1 ? "bg-primary" : "bg-ink-900/10"}`} />
                  <div className={`w-3.5 h-3.5 rounded-full ${step === 2 ? "bg-primary" : "bg-ink-900/10"}`} />
                </div>
              </div>

              {step === 1 ? (
                /* Step 1 components */
                <div className="flex flex-col gap-4">
                  
                  {/* Service input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="serviceId" className="font-sans font-bold text-xs text-ink-900 uppercase tracking-wider">
                      Επιλογή Υπηρεσίας
                    </label>
                    <select
                      id="serviceId"
                      name="serviceId"
                      value={formData.serviceId}
                      onChange={handleChange}
                      className="w-full bg-surface-alt border border-ink-900/10 rounded-btn p-3 text-sm focus:outline focus:outline-2 focus:outline-primary"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                    {errors.serviceId && <p className="text-red-500 text-xs font-semibold">{errors.serviceId}</p>}
                  </div>

                  {/* Day input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="preferredDay" className="font-sans font-bold text-xs text-ink-900 uppercase tracking-wider">
                      Προτιμώμενη Ημέρα
                    </label>
                    <select
                      id="preferredDay"
                      name="preferredDay"
                      value={formData.preferredDay}
                      onChange={handleChange}
                      className="w-full bg-surface-alt border border-ink-900/10 rounded-btn p-3 text-sm focus:outline focus:outline-2 focus:outline-primary"
                    >
                      <option value="">Επιλέξτε ημέρα...</option>
                      <option value="monday">Δευτέρα</option>
                      <option value="tuesday">Τρίτη</option>
                      <option value="wednesday">Τετάρτη</option>
                      <option value="thursday">Πέμπτη</option>
                      <option value="friday">Παρασκευή</option>
                    </select>
                    {errors.preferredDay && <p className="text-red-500 text-xs font-semibold">{errors.preferredDay}</p>}
                  </div>

                  {/* Time input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="preferredTime" className="font-sans font-bold text-xs text-ink-900 uppercase tracking-wider">
                      Προτιμώμενη Ώρα
                    </label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full bg-surface-alt border border-ink-900/10 rounded-btn p-3 text-sm focus:outline focus:outline-2 focus:outline-primary"
                    >
                      <option value="">Επιλέξτε ώρα...</option>
                      <option value="09:00 - 13:00">Πρωί (09:00 - 13:00)</option>
                      <option value="16:00 - 20:00">Απόγευμα (16:00 - 20:00)</option>
                    </select>
                    {errors.preferredTime && <p className="text-red-500 text-xs font-semibold">{errors.preferredTime}</p>}
                  </div>

                  {/* Step 1 Actions */}
                  <Button
                    variant="primary"
                    label="Επόμενο Βήμα"
                    onClick={handleNext}
                    className="w-full mt-2"
                  />
                </div>
              ) : (
                /* Step 2 components */
                <div className="flex flex-col gap-4">
                  
                  {/* Name input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="fullName" className="font-sans font-bold text-xs text-ink-900 uppercase tracking-wider">
                      Ονοματεπώνυμο
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="π.χ. Ιωάννης Παπαδόπουλος"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-surface-alt border border-ink-900/10 rounded-btn p-3 text-sm focus:outline focus:outline-2 focus:outline-primary"
                      required
                    />
                    {errors.fullName && <p className="text-red-500 text-xs font-semibold">{errors.fullName}</p>}
                  </div>

                  {/* Phone input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="font-sans font-bold text-xs text-ink-900 uppercase tracking-wider">
                      Τηλέφωνο Επικοινωνίας
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="π.χ. 6971234567"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-surface-alt border border-ink-900/10 rounded-btn p-3 text-sm focus:outline focus:outline-2 focus:outline-primary"
                      required
                    />
                    {errors.phone && <p className="text-red-500 text-xs font-semibold">{errors.phone}</p>}
                  </div>

                  {/* Email input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="font-sans font-bold text-xs text-ink-900 uppercase tracking-wider">
                      Email (Προαιρετικό)
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="π.χ. john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-surface-alt border border-ink-900/10 rounded-btn p-3 text-sm focus:outline focus:outline-2 focus:outline-primary"
                    />
                  </div>

                  {/* GDPR checkbox */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-start gap-3 mt-2">
                      <input
                        id="gdprAccepted"
                        name="gdprAccepted"
                        type="checkbox"
                        checked={formData.gdprAccepted}
                        onChange={handleChange}
                        className="w-5 h-5 border border-ink-900/10 rounded accent-primary mt-0.5 cursor-pointer focus:outline focus:outline-2 focus:outline-primary"
                        required
                      />
                      <label htmlFor="gdprAccepted" className="font-sans text-xs sm:text-sm text-ink-600 leading-tight cursor-pointer select-none">
                        Συμφωνώ με την{" "}
                        <a
                          href="/politiki-aporritou"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary font-bold hover:underline"
                        >
                          Πολιτική Απορρήτου
                        </a>{" "}
                        του Sports-Physio.gr για την επεξεργασία των στοιχείων μου.
                      </label>
                    </div>
                    {errors.gdprAccepted && <p className="text-red-500 text-xs font-semibold">{errors.gdprAccepted}</p>}
                  </div>

                  {/* Step 2 Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full">
                    <Button
                      variant="secondary"
                      label="Πίσω"
                      onClick={handleBack}
                      className="flex-1 order-2 sm:order-1"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      label="Κλείστε Ραντεβού"
                      className="flex-[2] order-1 sm:order-2"
                    />
                  </div>

                </div>
              )}
            </form>
          )}
        </div>

        {/* Outbound call alternative below the form */}
        <div className="text-center font-sans text-sm md:text-base text-slate-200 mt-2">
          ή καλέστε μας άμεσα στο{" "}
          <a
            href="tel:+302128488984"
            className="text-white hover:text-slate-100 font-bold underline focus:outline focus:outline-2 focus:outline-white rounded px-1 py-0.5"
          >
            210 28 48 984
          </a>
        </div>

      </div>
    </section>
  );
};
