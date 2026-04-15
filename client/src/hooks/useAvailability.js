import { useState } from 'react';

function useAvailability() {
  const [availabilities, setAvailabilities] = useState([]);
  const [currentSlot, setCurrentSlot] = useState({
    day: 'Lundi',
    hour: '7',
    minute: '00'
  });

  const addAvailability = () => {
    const isDuplicate = availabilities.some(
      (a) =>
        a.day === currentSlot.day &&
        a.hour === currentSlot.hour &&
        a.minute === currentSlot.minute
    );

    if (isDuplicate) return;

    const newSlot = {
      ...currentSlot,
      id: Date.now()
    };

    setAvailabilities((prev) => [...prev, newSlot]);
  };

  const removeAvailability = (id) => {
    setAvailabilities((prev) => prev.filter((a) => a.id !== id));
  };

  const resetAvailabilities = () => {
    setAvailabilities([]);
    setCurrentSlot({ day: 'Lundi', hour: '7', minute: '00' });
  };

  return {
    availabilities,
    currentSlot,
    setCurrentSlot,
    addAvailability,
    removeAvailability,
    resetAvailabilities
  };
}

export default useAvailability;