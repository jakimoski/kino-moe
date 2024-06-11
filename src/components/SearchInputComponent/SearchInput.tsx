"use client";
import "./SearchInput.scss";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchIcon from "@public/assets/icons/search.png";
import Image from "next/image";

const SearchInput = ({ icon, url }: { icon: boolean; url: string }) => {
  // const search = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>();
  const router = useRouter();

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (typeof searchQuery !== "string") {
      return;
    }

    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/${url}?q=${encodedSearchQuery}`);
  };

  return (
    <form onSubmit={onSearch} className="search-form">
      <div className="search-form__wrapper">
        <button type="submit" className="search-form__button">
          {icon ? (
            <Image
              src={SearchIcon}
              width={30}
              height={30}
              alt="search"
              className="search-form__icon"
            />
          ) : null}
        </button>
        <input
          value={searchQuery || ""}
          onChange={(event) => setSearchQuery(event.target.value)}
          onKeyUp={onSearch}
          className="search-form__input"
          placeholder="Search..."
        />
      </div>
    </form>
  );
};

export default SearchInput;
