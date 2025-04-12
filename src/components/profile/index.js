function Profile({ user }) {
  return (
    <div className="profile">
      <h2>Профиль пользователя</h2>
      {user && (
        <div>
          <p>Имя: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
