function PersonalInfo({ register, errors }) {
  return (
    <div className="left-section">
      <span className="section-label">Vos coordonnées</span>

      <div className="radio-group">
        <label className="radio-option">
          <input type="radio" value="Mme" {...register('civility')} />
          <span>Mme</span>
        </label>
        <label className="radio-option">
          <input type="radio" value="M" {...register('civility')} />
          <span>M</span>
        </label>
      </div>

      <div className="input-row">
        <div>
          <input
            type="text"
            placeholder="Nom"
            className={`form-input ${errors.lastName ? 'error' : ''}`}
            {...register('lastName', { required: 'Le nom est obligatoire' })}
          />
          {errors.lastName && (
            <span className="error-message">{errors.lastName.message}</span>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Prénom"
            className={`form-input ${errors.firstName ? 'error' : ''}`}
            {...register('firstName', { required: 'Le prénom est obligatoire' })}
          />
          {errors.firstName && (
            <span className="error-message">{errors.firstName.message}</span>
          )}
        </div>
      </div>

      <div>
        <input
          type="email"
          placeholder="Adresse mail"
          className={`form-input ${errors.email ? 'error' : ''}`}
          {...register('email', {
            required: "L'email est obligatoire",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Format email invalide'
            }
          })}
        />
        {errors.email && (
          <span className="error-message">{errors.email.message}</span>
        )}
      </div>

      <div>
        <input
          type="tel"
          placeholder="Téléphone"
          className={`form-input ${errors.phone ? 'error' : ''}`}
          {...register('phone', {
            required: 'Le téléphone est obligatoire',
            pattern: {
              value: /^[\d\s+\-().]{10,}$/,
              message: 'Format téléphone invalide'
            }
          })}
        />
        {errors.phone && (
          <span className="error-message">{errors.phone.message}</span>
        )}
      </div>
    </div>
  );
}

export default PersonalInfo;