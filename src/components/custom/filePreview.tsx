import React, { useState } from "react";
import { ChakraAlertDialog } from "..";

interface FilePreviewDialogProps {
  fileUrl: string;
  title: string;
  isOpen?: boolean;
  onClose?: () => void;
  hasProceedButton?: boolean;
  proceedButtonAction?: () => void;
}

const FilePreviewDialog: React.FC<FilePreviewDialogProps> = ({
  fileUrl,
  title,
  hasProceedButton,
  proceedButtonAction,
  ...rest
}) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  return (
    <ChakraAlertDialog
      useFooter={true}
      useCancelButton={false}
      useProceedButton={hasProceedButton === true ? true : false}
      proceedButtonProps={{
        className: "btn-lg primary-btn w-100 ms-0",
      }}
      useHeader={true}
      proceedButtonDefaultChild={"Upload"}
      modalFooterProps={{
        className: "justify-content-center p-0 w-70 mx-auto mt-4",
        onClick: () => {
          proceedButtonAction && proceedButtonAction();
        },
      }}
      title={title}
      size={"3xl"}
      closeOnOverlayClick={true}
      modalContentProps={{ className: "rounded-3 p-4" }}
      modalBodyProps={{ className: "p-0 d-flex justify-content-center relative" }}
      {...rest}
    >
      {!error ? (
        <object
          data={fileUrl}
          type='application/pdf'
          width='100%'
          aria-label='File preview'
          onError={handleError}
        >
          <p>
            File preview not available. You can download it <a href={fileUrl}>here</a>.
          </p>
        </object>
      ) : (
        <p>Error loading file preview.</p>
      )}
    </ChakraAlertDialog>
  );
};

export default FilePreviewDialog;
