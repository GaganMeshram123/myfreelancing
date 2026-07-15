import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface FormState {
  name: string;
  email: string;
  company: string;
  serviceType: string;
  budget: string;
  description: string;
}

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  company: '',
  serviceType: 'AI Application',
  budget: '₹50K – ₹1L',
  description: '',
};

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const servicesList = ['AI Application', 'Web Application', 'Backend System', 'MVP', 'Other'];
  const budgetList = ['₹20K – ₹50K', '₹50K – ₹1L', '₹1L – ₹3L', '₹3L+'];

  const validateForm = (): boolean => {
    const newErrors: Partial<FormState> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please describe your project idea';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors when typing
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const selectService = (service: string) => {
    setFormData((prev) => ({ ...prev, serviceType: service }));
  };

  const selectBudget = (budget: string) => {
    setFormData((prev) => ({ ...prev, budget: budget }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate sending email to a backend or EmailJS
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData(INITIAL_STATE);
    }, 1800);
  };

  return (
    <div className="w-full max-w-3xl mx-auto glass-premium p-8 md:p-12 rounded-2xl border border-text-primary/5 relative">
      <div className="absolute inset-0 bg-radial-gradient from-accent-blue/5 to-transparent pointer-events-none rounded-2xl"></div>

      <AnimatePresence mode="wait">
        {!submitSuccess ? (
          <motion.form
            key="contact-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-8 relative z-10"
          >
            {/* Name / Email split row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold tracking-widest text-text-secondary uppercase mb-2">
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Gagan Meshram"
                  className={`w-full bg-background-secondary/50 border ${
                    errors.name ? 'border-red-500' : 'border-text-primary/10'
                  } focus:border-accent-blue rounded-lg px-4 py-3.5 text-text-primary placeholder-text-primary/20 outline-none transition-colors duration-300`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium">
                    <AlertTriangle className="w-3.5 h-3.5" /> {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold tracking-widest text-text-secondary uppercase mb-2">
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. gagan@domain.com"
                  className={`w-full bg-background-secondary/50 border ${
                    errors.email ? 'border-red-500' : 'border-text-primary/10'
                  } focus:border-accent-blue rounded-lg px-4 py-3.5 text-text-primary placeholder-text-primary/20 outline-none transition-colors duration-300`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium">
                    <AlertTriangle className="w-3.5 h-3.5" /> {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-xs font-semibold tracking-widest text-text-secondary uppercase mb-2">
                COMPANY / STARTUP NAME (OPTIONAL)
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="e.g. Google Deepmind"
                className="w-full bg-background-secondary/50 border border-text-primary/10 focus:border-accent-blue rounded-lg px-4 py-3.5 text-text-primary placeholder-text-primary/20 outline-none transition-colors duration-300"
              />
            </div>

            {/* Service Choices */}
            <div>
              <label className="block text-xs font-semibold tracking-widest text-text-secondary uppercase mb-3">
                WHAT DO YOU WANT TO BUILD?
              </label>
              <div className="flex flex-wrap gap-2.5">
                {servicesList.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => selectService(service)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 ${
                      formData.serviceType === service
                        ? 'bg-accent-blue border-accent-blue text-text-primary shadow-lg shadow-accent-blue/20'
                        : 'bg-transparent border-text-primary/10 text-text-primary/60 hover:border-text-primary/35 hover:text-text-primary'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Choices */}
            <div>
              <label className="block text-xs font-semibold tracking-widest text-text-secondary uppercase mb-3">
                PROJECT BUDGET
              </label>
              <div className="flex flex-wrap gap-2.5">
                {budgetList.map((budget) => (
                  <button
                    key={budget}
                    type="button"
                    onClick={() => selectBudget(budget)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 ${
                      formData.budget === budget
                        ? 'bg-accent-purple border-accent-purple text-text-primary shadow-lg shadow-accent-purple/20'
                        : 'bg-transparent border-text-primary/10 text-text-primary/60 hover:border-text-primary/35 hover:text-text-primary'
                    }`}
                  >
                    {budget}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-xs font-semibold tracking-widest text-text-secondary uppercase mb-2">
                PROJECT DESCRIPTION *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                placeholder="Briefly describe your idea, timelines, or technical specifications..."
                className={`w-full bg-background-secondary/50 border ${
                  errors.description ? 'border-red-500' : 'border-text-primary/10'
                } focus:border-accent-blue rounded-lg px-4 py-3.5 text-text-primary placeholder-text-primary/20 outline-none transition-colors duration-300 resize-none`}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5" /> {errors.description}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-end">
              <MagneticButton strength={0.2}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-text-primary text-background font-bold tracking-widest text-xs px-8 py-4 rounded hover:bg-accent-blue hover:text-text-primary transition-all duration-300 flex items-center space-x-2 w-full md:w-auto justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>SENDING...</span>
                    </>
                  ) : (
                    <>
                      <span>SEND PROJECT INQUIRY</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </MagneticButton>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <CheckCircle className="w-20 h-20 text-accent-cyan mb-6 animate-pulse" />
            <h3 className="text-3xl font-extrabold text-text-primary tracking-tight">
              YOUR MESSAGE IS IN.
            </h3>
            <p className="text-text-secondary mt-3 max-w-md font-light leading-relaxed">
              I'll review your project details and get back to you soon. Let's build something people remember.
            </p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="mt-8 text-xs font-semibold tracking-widest uppercase text-accent-blue border-b border-accent-blue/30 hover:border-accent-blue pb-1 transition-all"
            >
              SEND ANOTHER MESSAGE
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
