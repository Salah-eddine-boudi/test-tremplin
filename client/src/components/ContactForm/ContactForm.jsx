import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useState } from 'react';
import useAvailability from '../../hooks/useAvailability';
import PersonalInfo from './PersonalInfo';
import MessageSection from './MessageSection';
import AvailabilitySection from './AvailabilitySection';
import { submitContact } from '../../services/api';
import backgroundImg from '../../assets/background.jpg';
import './ContactForm.css';

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      civility: 'M',
      lastName: '',
      firstName: '',
      email: '',
      phone: '',
      messageType: 'visit',
      message: ''
    }
  });

  const {
    availabilities,
    currentSlot,
    setCurrentSlot,
    addAvailability,
    removeAvailability,
    resetAvailabilities
  } = useAvailability();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        availabilities: availabilities.map((a) => ({
          day: a.day,
          hour: a.hour,
          minute: a.minute
        }))
      };

      await submitContact(payload);
      toast.success('Votre demande a bien été envoyée !');
      reset();
      resetAvailabilities();
    } catch (error) {
      toast.error(error.message || 'Une erreur est survenue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section">
      <img
        src={backgroundImg}
        alt="Intérieur appartement"
        className="contact-background"
      />
      <div className="contact-overlay" />

      <div className="contact-form-container">
        <h2 className="contact-title">Contactez l'agence</h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-layout">
            <PersonalInfo register={register} errors={errors} />
            <MessageSection register={register} errors={errors} />

            <AvailabilitySection
              availabilities={availabilities}
              currentSlot={currentSlot}
              setCurrentSlot={setCurrentSlot}
              onAdd={addAvailability}
              onRemove={removeAvailability}
            />

            <div className="form-footer">
              <button
                type="submit"
                className="btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Envoi...' : 'Envoyer'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;