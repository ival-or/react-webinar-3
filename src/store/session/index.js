import StoreModule from '../module';

/**
 * Сессия
 */
class SessionState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {},
      token: null,
      loginError: null,
      passwordError: null,
      waiting: true,
      isAuthorized: false
    };
  }

  /**
   * Авторизация
   * @param data
   * @param onSuccess
   * @returns {Promise<void>}
   */
  async signIn(data, onSuccess) {
    this.setState(this.initState(), 'Авторизация');
    const response = await fetch(`/api/v1/users/sign`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });
    const json = await response.json();

    if (!json.error) {
      this.setState({
        ...this.getState(),
        token: json.result.token,
        user: json.result.user,
        isAuthorized: true,
        waiting: false
      }, 'Успешная авторизация');

      window.localStorage.setItem('token', json.result.token);

      if (onSuccess) onSuccess();
    } else {
      const errors = json.error.data.issues;
      let loginError = null
      let passwordError = null
      errors.forEach(error => {
        if (error.path === 'login') {
          loginError = error.message
        } else {
          passwordError = error.message
        }
      })

      this.setState({
        ...this.getState(),
        errors: json.error.data.issues,
        loginError: loginError,
        passwordError: passwordError,
        waiting: false
      }, 'Ошибка авторизации');
    }
  }

  /**
   * Отмена авторизации (выход)
   * @returns {Promise<void>}
   */
  async signOut() {
    await fetch(`/api/v1/users/sign`,
      {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "X-Token": this.getState().token
        }
      });
    window.localStorage.removeItem('token');

    this.setState({...this.initState(), waiting: false, token: null});
  }

  /**
   * Восстановление сессии
   * @return {Promise<void>}
   */
  async restore() {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch(`/api/v1/users/self?fields=*`,
        {
          headers: {
            "X-Token": token,
            "Content-Type": "application/json"
          }
        });
      const json = await response.json();

      if (json.error) {
        window.localStorage.removeItem('token');
        this.setState({
          ...this.getState(), isAuthorized: false, waiting: false, token: null
        }, 'Сессии нет');
      } else {
        this.setState({
          ...this.getState(), token: token, user: json.result, isAuthorized: true, waiting: false
        }, 'Успешно вспомнили сессию');
      }
    } else {
      this.setState({
        ...this.getState(), isAuthorized: false, waiting: false
      }, 'Сессии нет');
    }
  }

  /**
   * Сброс ошибок авторизации
   */
  resetErrors() {
    this.setState({...this.initState(), errors: null})
  }
}

export default SessionState;
