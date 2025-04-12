import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import Profile from '../../components/profile';
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import PageLayout from "../../components/page-layout";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";

function ProfileContainer() {
  const navigate = useNavigate();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    user: state.user.userData,
    isLoggedIn: state.user.isLoggedIn,
  }));

  useEffect(() => {
    if (!select.isLoggedIn) {
      navigate('/login'); // Перенаправляем на /login, если пользователь не авторизован
    }
  }, [select.isLoggedIn, navigate]);

  if (!select.isLoggedIn) {
    return null; // Ничего не рендерим до перенаправления
  }


  return (
    <>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <Profile user={select.user} />;
      </PageLayout>
    </>
  );
}

export default ProfileContainer;
