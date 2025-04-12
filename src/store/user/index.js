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
    if (token) {
      this.setState(
        {
          ...this.getState(),
          isLoggedIn: true,
        },
        'Восстановлено состояние авторизации'
      );
      this.getUserData(); // Загружаем данные пользователя
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

      if (response.ok && data.result) {
        const userData = {
          name: data.result.profile.name,
          email: data.result.email,
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
          email: data.result.user.email,
        };

        localStorage.setItem('token', data.result.token); // Сохраняем токен

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

  /**
   * Выход пользователя
   */
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

      localStorage.removeItem('token'); // Удаляем токен

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
