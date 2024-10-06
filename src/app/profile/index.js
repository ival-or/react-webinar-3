import {memo, useEffect} from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import ProfileCard from '../../components/profile-card';
import SessionHead from "../../containers/session-head";
import {useLocation, useNavigate} from "react-router-dom";

function Profile() {
  const store = useStore();
  const select = useSelector(state => ({
    profile: state.profile.data,
    profileWaiting: state.profile.waiting,
    sessionWaiting: state.session.waiting,
    isAuthorized: state.session.isAuthorized,
    token: state.session.token
  }));

  useInit(async () => {
    await store.actions.profile.load(select.token);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const {t} = useTranslate();

  useEffect(() => {
    if (!select.isAuthorized && !select.waiting) {
      const back = location.state?.back && location.state?.back !== location.pathname
        ? location.state?.back
        : '/';
      navigate(back);
    }
  }, [select.isAuthorized, select.waiting]);

  return (
    <PageLayout>
      <SessionHead/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ProfileCard data={select.profile}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
