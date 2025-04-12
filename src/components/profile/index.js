import './style.css'

function Profile({ user }) {
  return (
    <div className="profile">
      <h2>Профиль </h2>
      {user && (
        <div>
          <p>
            <span>Имя:</span> <strong>{user.name}</strong>
          </p>
          <p>
            <span>Телефон:</span> <strong>{user.phone}</strong>
          </p>
          <p>
            <span>Email:</span> <strong>{user.email}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default Profile;
