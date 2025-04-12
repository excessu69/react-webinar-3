import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    return {
      isLoggedIn: false,
      userData: null,
      error: '',
    };
  }

  /**
   * Восстанавливаем состояние из localStorage
   */
  restoreState() {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
      this.setState(
        {
          ...this.getState(),
          isLoggedIn: true,
          userData: JSON.parse(userData), // Восстанавливаем данные пользователя
        },
        'Восстановлено состояние авторизации'
      );
    }
  }

  /**
   * Получение данных пользователя
   */
  async getUserData() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('/api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      console.log('Ответ сервера:', data);

      if (response.ok && data.result) {
        const userData = {
          name: data.result.user.profile.name,
          phone: data.result.user.profile.phone,
          email: data.result.user.email,
        };

        this.setState(
          {
            ...this.getState(),
            userData,
            isLoggedIn: true,
          },
          'Данные пользователя загружены'
        );
      } else {
        this.setState(
          {
            ...this.getState(),
            isLoggedIn: false,
            userData: null,
          },
          'Ошибка загрузки данных пользователя'
        );
      }
    } catch (error) {
      console.error('Ошибка загрузки данных пользователя:', error.message);
    }
  }

  /**
   * Авторизация пользователя
   */
  async logInUser(credentials) {
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok && data.result) {
        const userData = {
          name: data.result.user.profile.name,
          phone: data.result.user.profile.phone,
          email: data.result.user.email,
        };

        localStorage.setItem('token', data.result.token);
        localStorage.setItem('userData', JSON.stringify(userData));

        this.setState(
          {
            ...this.getState(),
            userData,
            isLoggedIn: true,
            error: '',
          },
          'Пользователь авторизован'
        );
      } else {
        throw new Error(data.issues?.[0]?.message || 'Ошибка авторизации');
      }
    } catch (error) {
      this.setState(
        {
          ...this.getState(),
          error: error.message,
        },
        'Ошибка авторизации'
      );
    }
  }

  async logOutUser() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      localStorage.removeItem('token');
      localStorage.removeItem('userData');

      this.setState(
        {
          ...this.getState(),
          isLoggedIn: false,
          userData: null,
        },
        'Пользователь вышел'
      );
    } catch (error) {
      console.error('Ошибка при выходе:', error.message);
    }
  }
}

export default UserState;
