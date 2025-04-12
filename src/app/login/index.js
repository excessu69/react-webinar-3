import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import LoginForm from '../../components/login';
import LocaleSelect from '../../containers/locale-select';
import Navigation from "../../containers/navigation";
import Head from "../../components/head";

/**
 * Страница для авторизации пользователя
 */
function Login() {
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    isLoggedIn: state.user.isLoggedIn,
    error: state.user.error,
  }));

  useEffect(() => {
    if (select.isLoggedIn) {
      navigate('/profile');
    }
  }, [select.isLoggedIn, navigate]);

  const callbacks = {
    logInUser: useCallback(user => store.actions.user.logInUser(user), [store]),
  };

  return (
    <>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <LoginForm onSubmit={callbacks.logInUser} error={select.error} t={t} />
      </PageLayout>
    </>
  );
}

export default memo(Login);
