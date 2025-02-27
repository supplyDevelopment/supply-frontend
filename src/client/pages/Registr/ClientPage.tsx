"use client";

import { useRef, useState } from "react";

import { MainButton } from "@/client/entities";

import styles from "./ClientPage.module.css";
import { profileSubscribePayment } from "./api/profileSubscribePayment";

export const ClientPage: React.FC = () => {
  const [price, setPrice] = useState(500);
  const selectRef = useRef<HTMLSelectElement>(null);

  const getPriceByPeriod = (period: string): number =>
    period === "month" ? 100 : 1000;

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event,
  ): void => {
    setPrice(event.target.value === "month" ? 100 : 1000);
  };

  const onClick = async (): Promise<void> => {
    const period = selectRef.current?.value ?? "month";

    const monthsCount = period === "month" ? 1 : 12;
    const amount = getPriceByPeriod(period);

    const { data } = await profileSubscribePayment({
      amount,
      monthsCount,
    });

    window.location.href = data.payment_url;
  };

  return (
    <div>
      <div className={styles.date}>
        <p>Подключение на</p>
        <select ref={selectRef} onChange={onChange} defaultValue="month">
          <option value="month">месяц</option>
          <option value="year">год</option>
        </select>
        <p>
          {price} <span>₽</span>
        </p>
      </div>
      <MainButton pos={styles.button_pos} text="Подключить" onClick={onClick} />
      <p className={styles.text_under_button}>
        Нажимая кнопку &quot;Подключить&quot;, вы соглашаетесь с &nbsp;
        <a href="https://sandushnilas.space">
          Условиями лиценизонного соглашения
        </a>
      </p>
    </div>
  );
};
