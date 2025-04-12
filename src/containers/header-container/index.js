import Header from '../../components/header';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';

function HeaderContainer() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    user: state.user.userData,
    isLoggedIn: state.user.isLoggedIn,
  }));

  const handleLogout = () => {
    store.actions.user.logOutUser();
    navigate('/login');
  };

  return (
    <Header
      user={select.isLoggedIn ? select.user : null}
      onLogout={handleLogout}
    />
  );
}

export default HeaderContainer;
