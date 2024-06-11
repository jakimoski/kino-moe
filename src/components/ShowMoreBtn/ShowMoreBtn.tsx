"use client";

import React, { useState } from "react";
import MainButtonComponent from "../ButtonComponents/MainButtonComponent";
import { useSearchParams, useRouter } from "next/navigation";

function ShowMoreBtn({ initialShowMore }: { initialShowMore?: number }) {
  const [showMore, setShowMore] = useState<number>(initialShowMore || 20);
  const router = useRouter();
  const pathname = useSearchParams();

  const onShowMore = () => {
    setShowMore((prev) => prev + 10);

    const q = pathname.get("q");
    const o = pathname.get("o");

    let path = "/community";

    if (q) {
      path = `/community?q=${q}&r=${showMore.toString()}`;
      router.push(path);
    }
    if (o) {
      path = `/community?o=${o}&r=${showMore.toString()}`;
      router.push(path);
    }
    if (q && o) {
      path = `/community?q=${q}&o=${o}&r=${showMore.toString()}`;
      router.push(path);
    }
    if (!q && !o) {
      router.push(`/community?r=${showMore.toString()}`);
    }
  };

  return (
    <MainButtonComponent handler={onShowMore}>Show More</MainButtonComponent>
  );
}

export default ShowMoreBtn;
