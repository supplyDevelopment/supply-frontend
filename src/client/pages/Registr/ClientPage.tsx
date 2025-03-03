"use client";

import { useRef, useState } from "react";

import { logger } from "@/common";

import { MainButton } from "@/client/entities";

import { profileSubscribePayment } from "@/client/shared";

import styles from "./ClientPage.module.css";
import { authRegistrCompany } from "./api/authRegistrCompany";

export const ClientPage: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [price, setPrice] = useState(500);

  const getPriceByPeriod = (period: string): number =>
    period === "month" ? 100 : 1000;

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event,
  ): void => {
    setPrice(event.target.value === "month" ? 100 : 1000);
  };

  const onClick = (): void => {
    formRef.current?.dispatchEvent(
      new Event("submit", {
        bubbles: true,
        cancelable: true,
      }),
    );
  };

  const onSubmit: React.FormEventHandler = async event => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const period = (formData.get("period") as string).trim();
    const email = (formData.get("email") as string).trim();

    logger.log("Period: ", period);
    logger.log("Email: ", email);

    const monthsCount = period === "month" ? 1 : 12;
    const amount = getPriceByPeriod(period);

    try {
      const { error: registrError } = await authRegistrCompany({ email });

      if (registrError) {
        return;
      }

      const { data, error: subscribeError } = await profileSubscribePayment({
        amount,
        monthsCount,
      });

      if (subscribeError) {
        return;
      }

      window.location.href = data.payment_url;
    } catch {
      formRef.current?.reset();
    }
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} className={styles.form}>
      <div className={styles.date}>
        <p>Подключение на</p>
        <select onChange={onChange} defaultValue="month" name="period">
          <option value="month">месяц</option>
          <option value="year">год</option>
        </select>
        <p>
          {price} <span>₽</span>
        </p>
      </div>
      <input
        className={styles.input}
        placeholder="Почта"
        type="text"
        name="email"
        defaultValue=""
      />
      <MainButton pos={styles.button_pos} text="Подключить" onClick={onClick} />
      <p className={styles.text_under_button}>
        Нажимая кнопку &quot;Подключить&quot;, вы соглашаетесь с &nbsp;
        <a href="https://sandushnilas.space">
          Условиями лиценизонного соглашения
        </a>
      </p>
    </form>
  );
};
