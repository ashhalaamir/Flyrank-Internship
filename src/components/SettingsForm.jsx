import { useState } from 'react';
import {
  CUISINE_OPTIONS,
  validateField,
  validateSettingsForm,
} from '../utils/validation.js';

const INITIAL_FORM = {
  fullName: '',
  email: '',
  restaurantName: '',
  cuisineType: '',
};

export default function SettingsForm() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSuccessMessage('');

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccessMessage('');

    const { isValid, errors: validationErrors } = validateSettingsForm(formData);

    setTouched({
      fullName: true,
      email: true,
      restaurantName: true,
      cuisineType: true,
    });
    setErrors(validationErrors);

    if (!isValid) return;

    console.log(formData);
    setSuccessMessage('Settings Saved!');
  };

  const renderField = (name, label, type = 'text') => {
    const showError = touched[name] && errors[name];

    return (
      <div className={`form-field${showError ? ' form-field--error' : ''}`}>
        <label htmlFor={name}>
          {label}
          <span className="required-mark" aria-hidden="true">*</span>
        </label>

        {type === 'select' ? (
          <select
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={showError ? 'true' : 'false'}
            aria-describedby={showError ? `${name}-error` : undefined}
          >
            <option value="">Select cuisine type</option>
            {CUISINE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={showError ? 'true' : 'false'}
            aria-describedby={showError ? `${name}-error` : undefined}
          />
        )}

        {showError && (
          <p id={`${name}-error`} className="field-error" role="alert">
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  return (
    <form className="settings-form" onSubmit={handleSubmit} noValidate>
      <h2 className="section-title">User Settings</h2>
      <p className="section-description">
        Update your profile and restaurant details.
      </p>

      {renderField('fullName', 'Full Name')}
      {renderField('email', 'Email', 'email')}
      {renderField('restaurantName', 'Restaurant Name')}
      {renderField('cuisineType', 'Cuisine Type', 'select')}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Save Settings
        </button>
      </div>

      {successMessage && (
        <p className="success-message" role="status">
          {successMessage}
        </p>
      )}
    </form>
  );
}
