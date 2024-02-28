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

export interface AlertDefaultBoxProps extends AlertProps {
  title?: string;
  titleProps?: AlertTitleProps;
  body?: string | React.ReactNode;
  scheme?: "error" | "success" | "warning" | "info" | "neutral" | undefined;
  icon?: React.ReactNode;
  className?: string;
  type?: "outline" | "solid" | undefined;
}
export const AlertDefaultBox: React.FC<AlertDefaultBoxProps> = ({
  title,
  titleProps,
  body,
  scheme,
  icon,
  className,
  type = "solid",
  ...rest
}) => {
  const getSolidAlertBgAndTextColors = (
    scheme: "error" | "success" | "warning" | "info" | "neutral" | undefined
  ) => {
    let className;
    switch (scheme) {
      case "error":
        className = "bg-error-50 text-error-500 custom-alert-box";
        break;
      case "success":
        className = "bg-primary-50 text-primary-500 custom-alert-box";
        break;
      case "warning":
        className = "bg-warning-50 text-warning-500 custom-alert-box";
        break;
      case "info":
        className = "bg-info-50 text-info-500 custom-alert-box";
        break;
      case "neutral":
        className = "bg-grey-100 text-grey-700 custom-alert-box";
        break;
      default:
        className = "bg-warning-50 text-warning-500 custom-alert-box";
    }
    return className;
  };

  const getOulineAlertBgAndTextColors = (
    scheme: "error" | "success" | "warning" | "info" | "neutral" | undefined
  ) => {
    let className;
    switch (scheme) {
      case "error":
        className =
          "bg-error-25 text-error-500 border-1 border-error-300 custom-alert-box";
        break;
      case "success":
        className =
          "bg-primary-25 text-primary-500 border-1 border-primary-400 custom-alert-box";
        break;
      case "warning":
        className =
          "bg-warning-25 text-warning-500 border-1 border-warning-500 custom-alert-box";
        break;
      case "info":
        className =
          "bg-info-25 text-info-400 border-1 border-info-400 custom-alert-box";
        break;
      case "neutral":
        className =
          "bg-grey-50 text-grey-700 border-1 border-grey-500 custom-alert-box";
        break;
      default:
        className =
          "bg-warning-25 text-warning-500 border-1 border-warning-500 custom-alert-box";
    }
    return className;
  };

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true });

  if (isVisible) {
    return (
      <Alert
        className={`${className} ${
          type === "solid"
            ? getSolidAlertBgAndTextColors(scheme)
            : getOulineAlertBgAndTextColors(scheme)
        }`}
        rounded="md"
        {...rest}
      >
        {Boolean(icon) ? (
          icon
        ) : typeof body === "string" ? (
          <WarningIcon />
        ) : (
          <>&nbsp;</>
        )}
        <Flex direction="column" flex={1} marginRight={"30px"}>
          {title && (
            <Heading size="xs" marginBottom={0} {...titleProps}>
              {title}
            </Heading>
          )}
          {body && typeof body === "string" ? (
            <Text fontSize="md" className="my-0 text-start">
              {body}
            </Text>
          ) : (
            body
          )}
        </Flex>
        {scheme === "neutral" && (
          <CloseButton
            alignSelf="center"
            position="absolute"
            right={4}
            border={0}
            onClick={onClose}
          />
        )}
      </Alert>
    );
  } else {
    return null;
  }
};
