import {memo, useCallback} from 'react';
import SideLayout from '../../components/side-layout';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

function SessionHead() {

  const {t} = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();

  const select = useSelector(state => ({
    user: state.session.user,
    isAuthorized: state.session.isAuthorized
  }));

  const callbacks = {
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),

    onSignOut: useCallback(async () => {
      await store.actions.session.signOut();
    }, []),
  }

  return (
    <SideLayout side='end' padding='small'>
      {select.isAuthorized ? <Link to='/profile'>{select.user.profile.name}</Link> : ''}
      {select.isAuthorized
        ? <button onClick={callbacks.onSignOut}>{t('session.signOut')}</button>
        : <button onClick={callbacks.onSignIn}>{t('session.signIn')}</button>
      }
    </SideLayout>
  );
}


export default memo(SessionHead);
