import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface loadingToRedirect {
  title?: string;
  text?: string;
  isAdmin?: boolean;
}

const LoadingToRedirect = ({ title, text, isAdmin }: loadingToRedirect) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => currentCount - 1);
    }, 1000);

    if (count === 0) {
      if (isAdmin) navigate("/");
      else navigate("/login");
    }

    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <section className="rounded-3xl shadow-2xl animate-scale-up-center font-Inter">
      <div className="p-8 text-center sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-main-200">
          {title}
        </p>

        <h2 className="mt-6 text-3xl font-bold">
          {text} {count} giây
        </h2>
      </div>
    </section>
  );
};

export default LoadingToRedirect;
