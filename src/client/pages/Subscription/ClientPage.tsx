"use client";

import { useRef, useState } from "react";

import { logger } from "@/common";

import { MainButton } from "@/client/entities";

import { profileSubscribePayment } from "@/client/shared";

import styles from "./ClientPage.module.css";
import { profileCompanyUpdate } from "./api/postProfileCompanyUpdate";

import type { UserClientData } from "@/server/types";

interface Props {
  user: UserClientData;
}

export const ClientPage: React.FC<Props> = ({ user }) => {
  const { email, subscriptionEndDate } = user;

  const subscribeFormRef = useRef<HTMLFormElement>(null);
  const companyUpdateFormRef = useRef<HTMLFormElement>(null);

  const [price, setPrice] = useState(500);

  const getPriceByPeriod = (period: string): number =>
    period === "month" ? 100 : 1000;

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event,
  ): void => {
    setPrice(event.target.value === "month" ? 100 : 1000);
  };

  const onSubscribeClick = (): void => {
    subscribeFormRef.current?.dispatchEvent(
      new Event("submit", {
        bubbles: true,
        cancelable: true,
      }),
    );
  };

  const onCompanyUpdateSubmit: React.FormEventHandler = async event => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const email = (formData.get("email") as string).trim();

    logger.log("Email: ", email);

    try {
      const { error } = await profileCompanyUpdate({ email });

      if (error) {
        return;
      }
    } catch {
      companyUpdateFormRef.current?.reset();
    }
  };

  const onSubscribeSubmit: React.FormEventHandler = async event => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const period = (formData.get("period") as string).trim();

    logger.log("Period: ", period);

    const monthsCount = period === "month" ? 1 : 12;
    const amount = getPriceByPeriod(period);

    try {
      const { data, error: subscribeError } = await profileSubscribePayment({
        amount,
        monthsCount,
      });

      if (subscribeError) {
        return;
      }

      window.location.href = data.payment_url;
    } catch {
      subscribeFormRef.current?.reset();
    }
  };

  return (
    <>
      <p className={styles.date}>
        Подключено до {subscriptionEndDate.toLocaleDateString("ru-RU")}
      </p>
      <form
        ref={companyUpdateFormRef}
        onSubmit={onCompanyUpdateSubmit}
        className={styles.company_update_form}
      >
        <input
          className={styles.input}
          placeholder="Почта"
          type="text"
          name="email"
          defaultValue={email}
        />
        <button className={styles.company_update_button}>Обновить</button>
      </form>
      <form
        ref={subscribeFormRef}
        onSubmit={onSubscribeSubmit}
        className={styles.subscribe_form}
      >
        <div className={styles.extension}>
          <p>Продление на</p>
          <select onChange={onChange} defaultValue="month" name="period">
            <option value="month">месяц</option>
            <option value="year">год</option>
          </select>
          <p>
            {price} <span>₽</span>
          </p>
        </div>
        <MainButton
          pos={styles.subscribe_button}
          text="Продлить"
          onClick={onSubscribeClick}
        />
        <p className={styles.text_under_button}>
          Нажимая кнопку &quot;Продлить&quot;, вы соглашаетесь с &nbsp;
          <a href="https://sandushnilas.space">
            Условиями лиценизонного соглашения
          </a>
        </p>
      </form>
    </>
  );
};
