import React, { useState } from "react";
import "./Dropdown.scss";
import Image from "next/image";
import arrowIcon from "@public/assets/icons/DownArrow.png";

const Dropdown = ({ options }: { options: string[] }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdown__toggle" onClick={() => setIsOpen(!isOpen)}>
        Category
        <Image
          src={arrowIcon}
          alt="check"
          width={14}
          height={9}
          className={isOpen ? "dropdown__icon--open" : "dropdown__icon"}
        />
        {isOpen && (
          <ul className="dropdown__menu">
            {options.map((option) => (
              <li
                className="dropdown__menu__item"
                key={option}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </button>
    </div>
  );
};

export default Dropdown;
