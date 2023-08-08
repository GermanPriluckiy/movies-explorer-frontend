import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__subtitle">Страница не найдена</p>
      </div>
      <Link className="not-found__back" to={navigate(-1)}>
        Назад
      </Link>
    </div>
  );
}

export default NotFoundPage;
