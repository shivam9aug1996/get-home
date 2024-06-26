// LinkButton.tsx
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Link } from "expo-router";
import { LinkButtonProps } from "@/types/detailTypes";

const LinkButton = ({ href, style, textStyle, children }: LinkButtonProps) => {
  return (
    <Link href={href} asChild>
      <TouchableOpacity style={style}>
        <Text style={textStyle}>{children}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default LinkButton;
