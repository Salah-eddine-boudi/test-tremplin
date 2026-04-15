function MessageSection({ register }) {
  return (
    <div className="right-section">
      <span className="section-label">Votre message</span>

      <div className="message-type-group">
        <label className="radio-option">
          <input type="radio" value="visit" {...register('messageType')} />
          <span>Demande de visite</span>
        </label>
        <label className="radio-option">
          <input type="radio" value="callback" {...register('messageType')} />
          <span>Être rappelé.e</span>
        </label>
        <label className="radio-option">
          <input type="radio" value="photos" {...register('messageType')} />
          <span>Plus de photos</span>
        </label>
      </div>

      <textarea
        placeholder="Votre message"
        className="form-textarea"
        {...register('message')}
      />
    </div>
  );
}

export default MessageSection;