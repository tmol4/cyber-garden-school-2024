import { useStableCallback } from "@tanstack/react-router";
import { memo, useEffect, useState } from "react";
import "./_lastSection.sass";

const LastSectionComponent = function LastSection() {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      return await fetch("http://localhost:5000/event");
    }
    setData(
      fetchData().map((text) => {
        return (
          <div className="last-section__container">
            <p className="last-section__p">{text}</p>
          </div>
        );
      }),
    );
  }, []);
  return (
    <>
      <section className="last-section">
        <h2 className="last-section__h2">
          Здесь будут представлены ваши ошибки
        </h2>
        {data}
      </section>
    </>
  );
};

export const LastSection = memo(LastSectionComponent);
