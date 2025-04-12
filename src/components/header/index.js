import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

function Header({ user, onLogout }) {
  return (
    <div className="header">
      {user ? (
        <div className="header-authenticated">
          {/* Имя пользователя как ссылка на профиль */}
          <Link to="/profile" className="header-link">
            {user.name}
          </Link>
          {/* Слово "Выход" как кнопка */}
          <button className="header-link" onClick={onLogout}>
            Выход
          </button>
        </div>
      ) : (
        <div className="header-unauthenticated">
          {/* Слово "Вход" как ссылка */}
          <Link to="/login" className="header-link">
            Вход
          </Link>
        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string, // Имя пользователя
  }),
  onLogout: PropTypes.func.isRequired, // Функция для выхода
};

export default Header;
