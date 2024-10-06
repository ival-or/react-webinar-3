import StoreModule from '../module';

/**
 * Информация о пользователе
 */
class ProfileState extends StoreModule {

  initState() {
    return {
      data: {},
      waiting: false
    }
  }

  /**
   * Загрузка профиля
   * @return {Promise<void>}
   */
  async load(token) {
    this.setState({
      data: {},
      waiting: true
    });

    const response = await fetch(`/api/v1/users/self?fields=*`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Token": token
        }
      });
    const json = await response.json();

    this.setState({
      data: json.result,
      waiting: false
    }, 'Загружен профиль из АПИ');
  }
}

export default ProfileState;
