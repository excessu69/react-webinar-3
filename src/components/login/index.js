import { useState } from 'react';
import './style.css';

function LoginForm({ onSubmit, error }) {
  const [credentials, setCredentials] = useState({ login: '', password: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(credentials);
  };

  return (
    <div className="login-form-container">
      <h2 className="login-form-title">Вход</h2> {/* Заголовок */}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form-group">
          <label htmlFor="login" className="login-form-label">Логин</label>
          <input
            type="text"
            id="login"
            name="login"
            placeholder="Введите логин"
            value={credentials.login}
            onChange={handleChange}
            className="login-form-input"
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password" className="login-form-label">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Введите пароль"
            value={credentials.password}
            onChange={handleChange}
            className="login-form-input"
          />
        </div>
        <button type="submit" className="login-form-button">
          Войти
        </button>
        {error && <div className="login-form-error">{error}</div>}
      </form>
    </div>
  );
}

export default LoginForm;
