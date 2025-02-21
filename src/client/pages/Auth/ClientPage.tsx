"use client";

import { useRef } from "react";

import { logger } from "@/common";

import { MainButton } from "@/client/entities";

import styles from "./ClientPage.module.css";

import type { FormEventHandler } from "react";

export const ClientPage: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null!);

  const onSubmit: FormEventHandler = event => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const password = (formData.get("password") as string).trim();
    const login = (formData.get("login") as string).trim();

    logger.log("Login: ", login);
    logger.log("Password: ", password);
  };

  const onButtonClick = (): void => {
    formRef.current.dispatchEvent(
      new Event("submit", {
        bubbles: true,
        cancelable: true,
      }),
    );
  };

  return (
    <div className={styles.wrapper}>
      <form ref={formRef} onSubmit={onSubmit} className={styles.form}>
        <input
          className={styles.input}
          placeholder="Логин"
          type="text"
          name="login"
          defaultValue=""
        />
        <input
          className={styles.input}
          placeholder="Пароль"
          type="password"
          name="password"
          defaultValue=""
        />
        <MainButton text="Войти" onClick={onButtonClick} />
      </form>
      <p className={styles.text_under_button}>
        Нажимая кнопку &quot;Войти&quot;, вы соглашаетесь с &nbsp;
        <a href="https://sandushnilas.space">
          Условиями лиценизонного соглашения
        </a>
      </p>
    </div>
  );
};
