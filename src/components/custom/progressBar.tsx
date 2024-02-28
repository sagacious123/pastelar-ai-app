import { Progress } from "@chakra-ui/react";

interface ProgressBarProps {
  value: number;
  width?: string;
  height?: string;
  colorScheme?: string;
  style?: React.CSSProperties;
}

export const ProgressBar = ({ value, width, height, style, ...rest }: ProgressBarProps) => {
  const getColorScheme = (value: number) => {
    if (value < 50) return "red";
    if (value < 100) return "warning";
    return "success";
  };
  return (
    <Progress
      value={value}
      borderRadius={"4px"}
      colorScheme={getColorScheme(value)}
      w={width ?? "320px"}
      // maxWidth={"350px"}
      h={height ?? "8px"}
      marginInline={"auto"}
      style={style}
      cursor={"pointer"}
      aria-label={`Progress bar at ${value}%`}
      backgroundColor={"#E1E1E1"}
      {...rest}
    />
  );
};
