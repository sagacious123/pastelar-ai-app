import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
  Button,
  ButtonProps,
  CloseButton,
  ModalBodyProps,
  ModalContentProps,
  ModalFooterProps,
  ModalHeaderProps,
} from "@chakra-ui/react";
import React from "react";
import { useWindowWidth } from "utilities/windowWidth";

export interface ChakraAlertDialogProps {
  title?: string;
  children?: string | React.ReactNode;
  size?: AlertDialogProps["size"];
  isOpen?: boolean;
  onClose?: () => void;
  onProceed?: () => void;
  isProceeding?: boolean;
  isCancelling?: boolean;
  headerProps?: ModalHeaderProps;
  proceedButtonProps?: ButtonProps;
  proceedButtonDefaultChild?: string | React.ReactElement;
  closeButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  cancelButtonDefaultChild?: string | React.ReactElement;
  useHeader?: boolean;
  useFooter?: boolean;
  useCancelButton?: boolean;
  useProceedButton?: boolean;
  useFloatingCancel?: boolean;
  useHeaderCancel?: boolean;
  extraHeaderComponent?: React.ReactElement;
  extraFooterComponent?: React.ReactElement;
  modalContentProps?: ModalContentProps;
  modalBodyProps?: ModalBodyProps;
  modalFooterProps?: ModalFooterProps;
  closeOnOverlayClick?: boolean;
}
export const ChakraAlertDialog: React.FC<ChakraAlertDialogProps> = ({
  title = "Sign Out",
  children = "You are about to delete this record kindly click continue to proceed.",
  isOpen = false,
  onClose = () => {},
  onProceed = () => {},
  isProceeding,
  isCancelling,
  headerProps,
  proceedButtonProps,
  closeButtonProps,
  cancelButtonProps,
  proceedButtonDefaultChild = "Continue",
  cancelButtonDefaultChild = "Cancel",
  useHeader = true,
  useFooter = true,
  useCancelButton = true,
  useProceedButton = true,
  useFloatingCancel = false,
  useHeaderCancel = true,
  extraHeaderComponent,
  extraFooterComponent,
  modalContentProps,
  modalBodyProps,
  modalFooterProps,
  closeOnOverlayClick,
  ...rest
}) => {
  const cancelRef = React.useRef<any>();
  const windowWidth = useWindowWidth();

  return (
    <AlertDialog
      {...rest}
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      closeOnOverlayClick={closeOnOverlayClick}
    >
      <AlertDialogOverlay backdropFilter={"blur(4px)"}>
        <AlertDialogContent {...modalContentProps}>
          {Boolean(useFloatingCancel) && (
            <CloseButton
              onClick={() => onClose()}
              position={"absolute"}
              background={"#fff"}
              borderRadius={"50%"}
              border={"none"}
              padding={5}
              right={{ base: 0, md: -10 }}
              top={{ base: "-50px", md: -10 }}
              zIndex={999999}
              bgImage={"../../assets/svg/cancel.svg"}
              className="float-close-btn"
            />
          )}
          {Boolean(useHeader) && (
            <AlertDialogHeader
              fontSize="2xl"
              fontWeight="bold"
              justifyContent={"space-between"}
              borderTopRadius={"md"}
              borderBottomRadius={0}
              alignItems="center"
              {...headerProps}
            >
              {title}

              {extraHeaderComponent}

              {!Boolean(useFloatingCancel) && Boolean(useHeaderCancel) && (
                <CloseButton
                  onClick={() => onClose()}
                  position={"relative"}
                  background={"#fff"}
                  borderRadius={"50%"}
                  padding={5}
                  right={0}
                  top={0}
                  zIndex={999999}
                  border={0}
                  marginLeft="auto"
                />
              )}
            </AlertDialogHeader>
          )}

          <AlertDialogBody {...modalBodyProps}>{children}</AlertDialogBody>

          {Boolean(useFooter) && (
            <AlertDialogFooter {...modalFooterProps}>
              {useCancelButton && (
                <Button
                  ref={cancelRef}
                  onClick={onClose}
                  isLoading={isCancelling}
                  {...cancelButtonProps}
                >
                  {cancelButtonDefaultChild}
                </Button>
              )}

              {useProceedButton && (
                <Button
                  // colorScheme="red"
                  onClick={onProceed}
                  ml={3}
                  isLoading={isProceeding}
                  {...proceedButtonProps}
                >
                  {proceedButtonDefaultChild}
                </Button>
              )}

              {extraFooterComponent}
            </AlertDialogFooter>
          )}
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export const BasicAlertDialog = ChakraAlertDialog;
