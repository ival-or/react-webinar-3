import {memo, useCallback, useState} from 'react';
import useTranslate from '../../hooks/use-translate';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import {useLocation, useNavigate} from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useInit from '../../hooks/use-init';
import SessionHead from "../../containers/session-head";
import Form from "../../components/form"

function Login() {

  const {t} = useTranslate();
  const location = useLocation();
  const navigate = useNavigate();
  const store = useStore();

  useInit(() => {
    store.actions.session.resetErrors();
  })

  const select = useSelector(state => ({
    waiting: state.session.waiting,
    loginError: state.session.loginError,
    passwordError: state.session.passwordError
  }));

  const [data, setData] = useState({
    login: '',
    password: ''
  });

  const callbacks = {
    onChange: useCallback((value, name) => {
      setData(prevData => ({...prevData, [name]: value}));
    }, []),

    onSubmit: useCallback(async (e) => {
      e.preventDefault();
      await store.actions.session.signIn(data, () => {
        const back = location.state?.back && location.state?.back !== location.pathname
          ? location.state?.back
          : '/';
        navigate(back);
      });

    }, [data, location.state])
  };

  return (
    <PageLayout>
      <SessionHead/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <SideLayout padding='medium'>
        <Form title={t('auth.title')} onSubmit={callbacks.onSubmit}>
          <Input name='login' value={data.login} onChange={callbacks.onChange} label={t('auth.login')}
          error={select.loginError}/>
          <Input name='password' type='password' value={data.password}
                 onChange={callbacks.onChange} label={t('auth.password')} error={select.passwordError}/>
          <button type='submit'>{t('auth.signIn')}</button>
        </Form>
      </SideLayout>
    </PageLayout>
  );
}

export default memo(Login);
