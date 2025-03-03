import { memo, useCallback, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Input from '../../components/input';
import Field from '../../components/field';
import SideLayout from '../../components/side-layout';
import TopHead from '../../containers/top-head';
import { useLocation, useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useInit from '../../hooks/use-init';
import HeadLayout from '../../components/head-layout';
import Form from '../../components/form';

function Login() {
  const { t } = useTranslate();
  const location = useLocation();
  const navigate = useNavigate();
  const store = useStore();

  useInit(() => {
    store.actions.session.resetErrors();
  });

  const select = useSelector(state => ({
    waiting: state.session.waiting,
    errors: state.session.errors,
  }));

  const [data, setData] = useState({
    login: '',
    password: '',
  });

  const callbacks = {
    // Колбэк на ввод в элементах формы
    onChange: useCallback((value, name) => {
      setData(prevData => ({ ...prevData, [name]: value }));
    }, []),

    // Отправка данных формы для авторизации
    onSubmit: useCallback(
      e => {
        e.preventDefault();
        store.actions.session.signIn(data, () => {
          // Возврат на страницу, с которой пришли
          const back =
            location.state?.back && location.state?.back !== location.pathname
              ? location.state?.back
              : '/';
          navigate(back);
        });
      },
      [data, location.state],
    ),
  };

  return (
    <>
      <HeadLayout>
        <TopHead />
      </HeadLayout>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <SideLayout padding="medium">
          <Form onSubmit={callbacks.onSubmit} title={t('auth.title')} submitTitle={t('auth.signIn')}>
            <Field label={t('auth.login')} error={select.errors?.login}>
              <Input
                name="login"
                value={data.login}
                onChange={callbacks.onChange}
                placeholder={t('auth.login-placeholder')}
                theme="small"
              />
            </Field>
            <Field label={t('auth.password')} error={select.errors?.password}>
              <Input
                name="password"
                type="password"
                value={data.password}
                onChange={callbacks.onChange}
                placeholder={t('auth.password-placeholder')}
                theme="small"
              />
            </Field>
            <Field error={select.errors?.other} />
          </Form>
        </SideLayout>
      </PageLayout>
    </>
  );
}

export default memo(Login);
