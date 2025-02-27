"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { MainButton } from "@/client/entities";

import styles from "./ClientPage.module.css";

export const ClientPage: React.FC = () => {
  const [price, setPrice] = useState(500);
  const router = useRouter();

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event,
  ): void => {
    setPrice(event.target.value === "month" ? 100 : 1000);
  };

  const onClick = (): void => {
    router.push("/stacks");
  };

  return (
    <div>
      <div className={styles.date}>
        <p>Подключение на</p>
        <select onChange={onChange}>
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
