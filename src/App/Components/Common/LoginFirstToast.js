import React from 'react';

function LoginFirstToast({ closeToast, redirectToLogin }) {
  return (
    <div>
      <p className="ogin-popup-message">Please, Login First...</p>
      <p className="login-popup-buttons">
        <button type="submit" onClick={redirectToLogin}>
                    Yes
        </button>
        <button type="submit" onClick={closeToast}>
                    No
        </button>
      </p>
    </div>
  );
}

export default LoginFirstToast;
