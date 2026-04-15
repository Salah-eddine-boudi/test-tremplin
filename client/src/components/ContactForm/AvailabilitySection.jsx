function AvailabilitySection({
  availabilities,
  currentSlot,
  setCurrentSlot,
  onAdd,
  onRemove
}) {
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const hours = Array.from({ length: 13 }, (_, i) => i + 7);
  const minutes = ['00', '15', '30', '45'];

  return (
    <div className="availability-section">
      <span className="availability-header">Disponibilités pour une visite</span>

      <div className="availability-controls">
        <select
          className="availability-select"
          value={currentSlot.day}
          onChange={(e) => setCurrentSlot({ ...currentSlot, day: e.target.value })}
        >
          {days.map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>

        <select
          className="availability-select"
          value={currentSlot.hour}
          onChange={(e) => setCurrentSlot({ ...currentSlot, hour: e.target.value })}
        >
          {hours.map((h) => (
            <option key={h} value={String(h)}>{h}h</option>
          ))}
        </select>

        <select
          className="availability-select"
          value={currentSlot.minute}
          onChange={(e) => setCurrentSlot({ ...currentSlot, minute: e.target.value })}
        >
          {minutes.map((m) => (
            <option key={m} value={m}>{m}m</option>
          ))}
        </select>

        <button
          type="button"
          className="btn-add-availability"
          onClick={onAdd}
        >
          Ajouter dispo
        </button>
      </div>

      {availabilities.length > 0 && (
        <div className="availability-tags">
          {availabilities.map((slot) => (
            <div key={slot.id} className="availability-tag">
              <span>{slot.day} à {slot.hour}h{slot.minute}</span>
              <button
                type="button"
                className="tag-remove"
                onClick={() => onRemove(slot.id)}
                aria-label={`Supprimer ${slot.day} à ${slot.hour}h${slot.minute}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AvailabilitySection;