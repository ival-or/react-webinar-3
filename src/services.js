import APIService from './services/api';
import Store from './store';
import createStoreRedux from './store-redux';
import I18NService from "./services/i18n";

class Services {
  constructor(config) {
    this.config = config;
  }

  /**
   * Сервис АПИ
   * @returns {APIService}
   */
  get api() {
    if (!this._api) {
      this._api = new APIService(this, this.config.api);
    }
    return this._api;
  }

  /**
   * Сервис Store
   * @returns {Store}
   */
  get store() {
    if (!this._store) {
      this._store = new Store(this, this.config.store);
    }
    return this._store;
  }

  /**
   * Redux store
   */
  get redux() {
    if (!this._redux) {
      this._redux = createStoreRedux(this, this.config.redux);
    }
    return this._redux;
  }

  /**
   * Сервис i18n
   * @returns {I18NService}
   */
  get i18n() {
    if (!this._i18n) {
      this._i18n = new I18NService(this, this.config.i18n);
    }
    return this._i18n;
  }
}

export default Services;
