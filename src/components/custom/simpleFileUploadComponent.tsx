import React, { FC, useEffect, useState } from "react";
import { FileHandlerBox } from "./fileHandlerBox";
import { usePageNotificationProvider } from "providers";
import { useDispatch } from "react-redux";
import { useAuth, setCredential } from "store/auth";
import { useUploadFileMutation } from "store/profile";
import { resolveApiError } from "utilities";
import { FileUploadSchema } from "validations";
import { ReactComponent as InvalidIcon } from "assets/svg/password-error-icon.svg";
import { ReactComponent as ValidIcon } from "assets/svg/valid-input-icon.svg";
import { useUploadCampaignDocumentMutation } from "store/campaigns";
import { useFileUploadMutation } from "store/campaignUpdates";
import { useUpdateRejectedDocumentsMutation } from "store/verificationCenter";
import { useDisclosure } from "@chakra-ui/react";
import FilePreviewDialog from "./filePreview";

interface SimpleFileUploadComponentProps {
  fileClass: string;
  fileName?: string;
  label?: string;
  bottomText?: string;
  bottomTextClassName?: any;
  category: "profile" | "campaign" | "campaignUpdate" | "verification";
  uploadQuery?: string;
  fileId?: string;
  campaignId?: string;
  postId?: string;
  onFileUpload?: () => void;
  allowedFIleType?: string;
  refetch?: () => void;
}

export const SimpleFileUploadComponent: FC<SimpleFileUploadComponentProps> = ({
  fileClass,
  fileName,
  label,
  bottomText,
  bottomTextClassName,
  category,
  campaignId,
  postId,
  fileId,
  uploadQuery,
  onFileUpload,
  allowedFIleType,
  refetch,
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { token: access_token } = useAuth();
  const dispatch = useDispatch();
  const { initNotification } = usePageNotificationProvider();
  const [uploadProfileDoc, { isLoading }] = useUploadFileMutation();
  const [uploadCampaignDoc, { isLoading: loading }] = useUploadCampaignDocumentMutation();
  const [uploadCampaignUpdateDoc, { isLoading: campaignUpdateLoading }] = useFileUploadMutation();
  const [uploadVerificationDoc, { isLoading: uploading }] = useUpdateRejectedDocumentsMutation();
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [selectedFileDataAsUrl, setSelectedFileDataAsUrl] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const validateFile = async (file: File | null): Promise<string | undefined> => {
    try {
      await FileUploadSchema.validate({ file });
      return undefined;
    } catch (error: any) {
      return error.errors[0];
    }
  };

  function fileToDataURI(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  useEffect(() => {
    validateFile(selectedFile).then((errorMessage) => {
      if (errorMessage) {
        if (errorMessage !== "file cannot be null") {
          setSuccessMsg("");
          setErrorMsg(errorMessage);
        }
      } else {
        setErrorMsg("");
        setSuccessMsg("");
      }
    });
  }, [selectedFile]);

  const handleFileUpload = (file: File, postId?: string) => {
    if (errorMsg) return;
    const form = new FormData();

    if (category === "profile") {
      form.append("file", file);
      uploadProfileDoc({ file: form, fileClass: fileClass })
        .unwrap()
        .then((res: any) => {
          if (onFileUpload) onFileUpload();
          if (res.error) {
            setErrorMsg(res.message);
            initNotification({
              message: res.message,
              scheme: "error",
            });
            return;
          }

          setSuccessMsg("Success!");
          bottomText = "Success";
          dispatch(
            setCredential({
              user: res.data,
              access_token,
            })
          );
        })
        .catch((error) => {
          console.log(error);
          initNotification({
            message: resolveApiError(error),
            scheme: "error",
          });
        });
    } else if (category === "campaign") {
      form.append("files", file);
      uploadCampaignDoc({
        files: form,
        fileClass: fileClass,
        campaignId: campaignId as string,
      })
        .unwrap()
        .then((res: any) => {
          if (onFileUpload) onFileUpload();
          if (res.error) {
            setErrorMsg(res.message);
            initNotification({
              message: res.message,
              scheme: "error",
            });
            return;
          }
          setSuccessMsg("Success!");
          bottomText = "Success";
        })
        .catch((error: any) => {
          console.log(error);
          initNotification({
            message: resolveApiError(error),
            scheme: "error",
          });
        });
    } else if (category === "campaignUpdate") {
      form.append("files", file);
      const payload = {
        files: form,
        fileClass: fileClass,
        postUpdateId: postId,
      };
      uploadCampaignUpdateDoc(payload)
        .unwrap()
        .then((res: any) => {
          if (onFileUpload) onFileUpload();
          if (res.error) {
            setErrorMsg(res.message);
            initNotification({
              message: res.message,
              scheme: "error",
            });
            return;
          }
          setSuccessMsg("Success!");
          bottomText = "Success";
        })
        .catch((error: any) => {
          console.log(error);
          initNotification({
            message: resolveApiError(error),
            scheme: "error",
          });
        });
    } else if (category === "verification") {
      form.append("files", file);
      const payload = {
        files: form,
        fileClass: fileClass,
        uploadQuery: uploadQuery,
        fileId: fileId,
      };
      uploadVerificationDoc(payload)
        .unwrap()
        .then((res: any) => {
          if (onFileUpload) onFileUpload();
          if (res.error) {
            setErrorMsg(res.message);
            initNotification({
              message: res.message,
              scheme: "error",
            });
            return;
          }
          setSuccessMsg("Success!");
          bottomText = "Success";
        })
        .catch((error: any) => {
          console.log(error);
          initNotification({
            message: resolveApiError(error),
            scheme: "error",
          });
        });
    }
    if (refetch) {
      setTimeout(() => {
        refetch();
      }, 2000);
    }
  };

  const msgClassName = errorMsg ? "text-error-500" : successMsg ? "text-primary-600" : "text-warning-500";

  const errorClassName = errorMsg ? "border-error-300" : "";
  // const innerErrorClassName = ""

  return (
    <>
      <label className='mb-7-px'>{label}</label>
      <FileHandlerBox
        customID={fileClass}
        className='w-100 h-44'
        inputProps={{
          accept: allowedFIleType ?? "image/jpg, image/jpeg, image/png, application/pdf, .pdf",
        }}
        autoUploadFiles={false}
        isManuallyUploading={isLoading || loading || uploading || campaignUpdateLoading}
        onFilesSelected={async (files) => {
          setSelectedFile(files[0]);
          const fileDataUri = await fileToDataURI(files[0]);
          setSelectedFileDataAsUrl(fileDataUri);
          setIsPreviewOpen(true);
        }}
      >
        {isPreviewOpen && (
          <FilePreviewDialog
            fileUrl={selectedFileDataAsUrl}
            isOpen={isPreviewOpen}
            title={"Preview"}
            onClose={() => {
              setIsPreviewOpen(false);
            }}
            hasProceedButton={true}
            proceedButtonAction={() => {
              handleFileUpload(selectedFile, postId);
              setIsPreviewOpen(false);
            }}
          />
        )}
        <div className={`simple-file-upload-container  ${errorClassName}`}>
          <div className={`browse-button  ${errorClassName}`}>Browse File</div>
          <div className='file-name position-relative'>
            {selectedFile?.name ?? fileName ?? "Choose file"}
            {errorMsg ? (
              <InvalidIcon className='h-14-px w-14-px position-absolute right-8 bg-white' />
            ) : successMsg ? (
              <ValidIcon className='h-20-px w-20-px position-absolute right-5 bg-white' />
            ) : null}
          </div>
        </div>
      </FileHandlerBox>
      <p className={`fs-12 mt-7-px mb-0 ${msgClassName}`}>{errorMsg || successMsg || bottomText || ""}</p>
    </>
  );
};
