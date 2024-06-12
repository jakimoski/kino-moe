"use client";
import "./CommunitySearch.scss";
import SearchInput from "../SearchInputComponent/SearchInput";
import OptionIcon from "@public/assets/icons/options.png";
import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useRouter, useSearchParams } from "next/navigation";
import ModalPost from "../ModalComponent/ModallPost";

function CommunitySearch() {
  const [showModal, setShowModal] = useState(false);
  const [orderBy, setOrderBy] = useState<string>("desc");
  const router = useRouter();
  const pathname = useSearchParams();

  const onFilter = (event: React.FormEvent) => {
    event.preventDefault();

    if (orderBy === "desc") {
      setOrderBy("desc");
    } else {
      setOrderBy("asc");
    }

    const q = pathname.get("q");
    const r = pathname.get("r");

    let path = "/community";

    const encodedSearchQuery = encodeURI(orderBy);
    if (q) {
      path = `/community?q=${q}&o=${encodedSearchQuery}`;
      router.push(path);
    }
    if (r) {
      path = `/community?r=${r}&o=${encodedSearchQuery}`;
      router.push(path);
    }
    if (q && r) {
      path = `/community?q=${q}&r=${r}&o=${encodedSearchQuery}`;
      router.push(path);
    }
    if (!q && !r) {
      router.push(`/community?o=${encodedSearchQuery}`);
    }
  };

  return (
    <div className="community-search">
      <button onClick={onFilter}>
        <Image src={OptionIcon} alt="options-icon" width={30} height={30} />
      </button>
      <div>
        <SearchInput icon={false} url="community" />
      </div>
      <button
        className="community-search__discus-btn"
        onClick={() => setShowModal(true)}
      >
        Start a discursion
      </button>
      {showModal &&
        createPortal(
          <ModalPost onClose={() => setShowModal(false)}></ModalPost>,
          document.body
        )}
    </div>
  );
}

export default CommunitySearch;
