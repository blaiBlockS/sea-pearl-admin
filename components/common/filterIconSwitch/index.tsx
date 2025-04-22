"use client";

import { UserFilterType } from "@/types/user";
import Image from "next/image";
import Button from "../button";

interface FilterIconSwitchProps {
  currentCategory: UserFilterType;
  currentOrder: "asc" | "desc";
  baseCategory: UserFilterType;
  onClick: () => void;
}

const FilterIconSwitch = ({
  currentCategory,
  currentOrder,
  baseCategory,
  onClick,
}: FilterIconSwitchProps) => {
  return (
    <Button onClick={onClick}>
      {currentCategory === baseCategory &&
        (currentOrder === "desc" ? (
          <Image //
            src={"/icons/align_focus.svg"}
            alt=""
            width={24}
            height={24}
          />
        ) : (
          <Image
            src={"/icons/align_focus.svg"}
            alt="align_icon"
            width={24}
            height={24}
            className="rotate-180"
          />
        ))}
      {currentCategory !== baseCategory && (
        <Image
          src={"/icons/align.svg"}
          alt="align_icon"
          width={24}
          height={24}
        />
      )}
    </Button>
  );
};

export default FilterIconSwitch;
