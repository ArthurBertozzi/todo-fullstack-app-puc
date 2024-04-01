import React, { useState, useEffect } from "react";
import { SignupForm } from "../../components/User/signupForm";
import Loginform from "../../components/User/loginForm";
import { CheckSession } from "../../utils/auth/checkSession";
import { LoadingPage } from "../../components/Utils/LoadingPage";
import styles from "../../styles/home/homepage.module.css"; // Importe os estilos CSS

export default function HomePage() {
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const checkLogin = await CheckSession();
        if (checkLogin === false) {
          setPageLoading(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {pageLoading ? (
        <LoadingPage />
      ) : (
        <>
          <h1 className={styles.title}>Task control app</h1>
          <div className={styles.formsContainer}>
            <div className={styles.form}>
              <SignupForm />
            </div>
            <div className={styles.form}>
              <Loginform />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
