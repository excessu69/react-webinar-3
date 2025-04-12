import PropTypes from 'prop-types';
import './style.css';

function Header({ user, onLogout }) {
  return (
    <div className="header">
      {user ? (
        <div className="header-authenticated">
          <button className="header-link user-name" onClick={() => window.location.href = '/profile'}>
            {user.name}
          </button>
          <button className="header-link" onClick={onLogout}>
            Выход
          </button>
        </div>
      ) : (
        <div className="header-unauthenticated">
          <button className="header-link" onClick={() => window.location.href = '/login'}>
            Вход
          </button>
        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
};

export default Header;
