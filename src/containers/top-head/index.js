import { memo, useCallback } from 'react';
import SideLayout from '../../components/side-layout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import Button from '../../components/button';

function TopHead() {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();

  const select = useSelector(state => ({
    user: state.session.user,
    exists: state.session.exists,
  }));

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),

    // Отмена авторизации
    onSignOut: useCallback(() => {
      store.actions.session.signOut();
    }, []),
  };

  return (
    <SideLayout side="end" padding="small" gap="big">
      {select.exists ? <Link to="/profile" style={{fontSize: '16px'}}>{select.user.profile.name}</Link> : ''}
      {select.exists ? (
        <Button style="text" onClick={callbacks.onSignOut} title={t('session.signOut')} />
      ) : (
        <Button style="text" onClick={callbacks.onSignIn} title={t('session.signIn')} />
      )}
    </SideLayout>
  );
}

export default memo(TopHead);
