import { motion } from "framer-motion";
import React, { useState } from "react";
import { styled } from "../Stitches";
import { inc } from "../utilities/Prelude";

interface DamageNumberProps {
  value: number;
  position: { top: string; left: string };
}

interface DamageNumberInfo {
  value: number;
  position: { top: string; left: string };
  id: number;
}

export const useDamageNumbers = (timeout: number) => {
  const [damageNumbers, setDamageNumbers] = useState<DamageNumberInfo[]>([]);
  const [counter, setCounter] = useState(0);

  const addDamageNumber = (value: number, position: { top: string; left: string }) => {
    let id = inc(counter);

    setCounter(id);
    setDamageNumbers((prevNumbers) => [...prevNumbers, { value, position, id }]);

    // Set a timeout to remove the damage number after animation
    setTimeout(() => setDamageNumbers((damages) => damages.filter((d) => d.id !== id)), timeout);
  };

  return { damageNumbers, addDamageNumber };
};

const DamageNumberText = styled(motion.div, {
  fontFamily: "$mono",
  fontSize: "$2",
  position: "absolute",
  color: "#EB35A4",
});

export const DamageNumber: React.FC<DamageNumberProps> = ({ value, position }) => {
  return (
    <DamageNumberText
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: -25 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.1 }}
      style={{ ...position }}
    >
      +{value}
    </DamageNumberText>
  );
};
