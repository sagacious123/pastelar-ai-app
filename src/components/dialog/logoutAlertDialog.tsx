import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useLogout } from "store/auth/hooks";
import { ReactComponent as LogoutIcon } from "assets/svg/sidebar/logout.svg";

interface LogoutAlertDialogProps {
  isOpen?: boolean;
  onClose?: () => void;
}
export const LogoutAlertDialog: React.FC<LogoutAlertDialogProps> = ({
  isOpen = false,
  onClose = () => {},
}) => {
  const logout = useLogout();
  const cancelRef = React.useRef<any>();

  const initLogout = () => {
    logout();
    onClose();
    setTimeout(() => {
      window.location.replace("/login");
    }, 100);
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent className="text-center d-flex align-items-center justify-content-center p-4 br-12">
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              borderTopRadius={5}
              borderBottom={0}
              paddingTop={0}
            >
              <div className="w-45-px h-45-px bg-error-100 rounded-circle d-flex align-items-center justify-content-center">
                <LogoutIcon className="w-20-px h-auto" />
              </div>
            </AlertDialogHeader>

            <AlertDialogBody className="text-grey-500 pt-0">
              <h4 className="text-grey-900 fw-600 mb-3">Log Out</h4>
              <p className="mb-0" style={{ lineHeight: "20px" }}>
                You are about to log out from your current session you will need
                to sign in again to access your dashboard.
              </p>
            </AlertDialogBody>

            <AlertDialogFooter className="pb-0 px-0 w-100 justify-content-between">
              <Button
                ref={cancelRef}
                onClick={onClose}
                className="w-100 secondary-btn btn-md"
              >
                Cancel
              </Button>
              <Button
                borderWidth={3}
                onClick={initLogout}
                ml={3}
                className="w-100 primary-error-btn btn-md"
              >
                Continue
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
