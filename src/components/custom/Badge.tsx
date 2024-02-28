import {
  Alert,
  // AlertIcon,
  AlertProps,
  CloseButton,
  Heading,
  Stack,
  Flex,
  Text,
  useDisclosure,
  AlertTitleProps,
} from "@chakra-ui/react";
import { ReactComponent as WarningIcon } from "assets/svg/password-warning.svg";

export interface BadgeProps extends AlertProps {
  text: string | undefined;
  scheme?:
    | "error"
    | "success"
    | "warning"
    | "info"
    | "neutral"
    | "pending"
    | "draft"
    | "approved"
    | "completed"
    | "ongoing"
    | undefined
    | string;
  icon?: React.ReactNode;
  className?: string;
  type?: "outline" | "solid" | undefined;
}
export const Badge: React.FC<BadgeProps> = ({ text, scheme, icon, className, type = "solid", ...rest }) => {
  const getSolidBadgeBgAndTextColors = (
    scheme:
      | "error"
      | "success"
      | "warning"
      | "info"
      | "neutral"
      | "pending"
      | "draft"
      | "approved"
      | "completed"
      | "ongoing"
      | undefined
      | string
  ) => {
    let className;
    switch (scheme) {
      case "error":
        className = "bg-error-50 text-error-500";
        break;
      case "draft":
        className = "bg-error-50 text-error-500";
        break;
      case "success":
        className = "bg-primary-50 text-primary-500";
        break;
      case "approved":
        className = "bg-primary-50 text-primary-500";
        break;
      case "completed":
        className = "bg-primary-50 text-primary-500";
        break;
      case "warning":
        className = "bg-warning-50 text-warning-500";
        break;
      case "pending":
        className = "bg-warning-50 text-warning-500";
        break;
      case "ongoing":
        className = "bg-primary-50 text-primary-500";
        break;
      case "info":
        className = "bg-info-50 text-info-500";
        break;
      case "neutral":
        className = "bg-grey-100 text-grey-700";
        break;
      default:
        className = "bg-warning-50 text-warning-500";
    }
    return className;
  };

  return (
    <p className={`text-capitalize fw-600 fs-12 p-1 m-0 ${getSolidBadgeBgAndTextColors(scheme)}`}>
      {icon ? icon : null}
      {text}
    </p>
  );
};
