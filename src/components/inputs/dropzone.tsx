import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormErrorMessageProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  FormHelperTextProps,
  Input,
  Box,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
  Avatar,
  TagRightIcon,
  TagProps,
  TagCloseButtonProps,
} from "@chakra-ui/react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import _ from "lodash";
import { MdCheck, MdEdit } from "react-icons/md";
import { ReactComponent as UploadIcon } from "assets/svg/upload.svg";
import {
  CreateCampaignPayload,
  SingleCampaignResponse,
  useUploadCampaignDocumentMutation,
  useUploadCampaignMediaFilesMutation,
} from "store/campaigns";
import { usePageNotificationProvider } from "providers";
import { resolveApiError } from "utilities";

export interface DropzoneFile {
  name: string;
  data: File;
  isEditing?: boolean;
  isUploading?: boolean;
  isDeleting?: boolean;
}

export interface PrimaryDropzoneItemProps extends PrimaryDropzoneFileProps {
  index: number;
}
export interface PrimaryDropzoneFileProps extends TagProps {
  file: DropzoneFile | any;
  onRemoveFile?: (file: DropzoneFile) => void;
  onUpdateFile?: (file: DropzoneFile) => void;
  canEditFileName?: boolean;
  extraActionComponent?: React.ReactElement;
  closeButtonProps?: TagCloseButtonProps;
}
export interface PrimaryDropzoneProp {
  inputRef?: React.LegacyRef<HTMLInputElement>;
  label?: string;
  isRequired?: boolean;
  isReadOnly?: boolean;
  labelProps?: FormLabelProps;
  formControlProps?: FormControlProps;
  value?: string;
  error?: boolean;
  dropzoneUploadItem?: (props: PrimaryDropzoneItemProps) => React.ReactElement;
  bottomText?: string | React.ReactElement;
  setValue?: (value: string) => void;
  errorTextProps?: FormErrorMessageProps;
  bottomTextProps?: FormHelperTextProps;
  dropzoneText?: string;
  canEditFileName?: boolean;
  onChange?: (files: DropzoneFile[]) => void;
  onFileRemoved?: (name: any, file: File) => void;
  dropzoneOptions?: DropzoneOptions;
  fileClass: string;
  fileName?: string;
  campaignId?: string;
  campaign?: SingleCampaignResponse;
  refetch?: () => void;
  accept?: any;
}

export const PrimaryDropzone: React.FC<PrimaryDropzoneProp> = ({
  inputRef,
  label,
  labelProps,
  setValue,
  error,
  bottomText,
  formControlProps,
  errorTextProps,
  bottomTextProps,
  canEditFileName,
  dropzoneUploadItem,
  dropzoneText = "Supported formats: JPEG, PNG, GIF",
  onChange = () => {},
  onFileRemoved = () => {},
  dropzoneOptions,
  fileClass,
  fileName,
  campaignId,
  campaign,
  refetch,
  accept = {
    "image/jpeg": [],
    "image/png": [],
    "image/gif": [],
  },
  ...rest
}) => {
  const { initNotification } = usePageNotificationProvider();
  const [uploadMediaFiles, { isLoading: loading }] =
    useUploadCampaignMediaFilesMutation();
  const [files, setFiles] = useState<DropzoneFile[]>([]);
  const [uploadedImgs, setUploadedImgs] = useState<string[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (new_files) => addFiles(new_files),
    accept: accept,
    ...dropzoneOptions,
  });

  // console.log(campaign);

  useEffect(() => {
    if (campaign?.data.images.length) {
      setUploadedImgs(campaign?.data.images);
    }
  }, [campaign?.data.images]);

  const handleFileUpload = (file: File) => {
    // if (errorMsg) return;
    const form = new FormData();
    form.append("files", file);

    uploadMediaFiles({
      files: form,
      fileClass: fileClass,
      campaignId: campaignId ?? ("6560776458feac1f7b90bd57" as string),
    })
      .unwrap()
      .then(
        (res: {
          error: any;
          message: any;
          data: { images: React.SetStateAction<string[]> };
        }) => {
          if (res.error) {
            initNotification({
              message: res.message,
              scheme: "error",
            });
            return;
          }
          setFiles([]);
          setUploadedImgs(res.data.images);
        }
      )
      .catch((error: any) => {
        console.log(error);
        initNotification({
          message: resolveApiError(error),
          scheme: "error",
        });
      });
    if (refetch) {
      setTimeout(() => {
        refetch();
      }, 2000);
    }
  };

  // const handleFileUpload = async (file: DropzoneFile) => {
  //   const form = new FormData();
  //   form.append("file", file);

  //   try {
  //     const response = await uploadMediaFiles(
  //       {
  //         file: form,
  //         fileClass: fileClass,
  //         campaignId: campaignId as string,
  //       }
  //       // {
  //       //   onUploadProgress: (progressEvent) => {
  //       //     const progress = Math.round(
  //       //       (progressEvent.loaded * 100) / progressEvent.total
  //       //     );
  //       //     console.log(`Upload progress: ${progress}%`);
  //       //     // You can store the progress in state if needed
  //       //   },
  //       // }
  //     );
  //     console.log("File upload successful", response);
  //     // if (response) {
  //     //   initNotification({
  //     //     message: response,
  //     //     scheme: "error",
  //     //   });
  //     //   return;
  //     // }
  //     // Handle success response here
  //   } catch (error) {
  //     console.error("File upload failed", error);
  //     initNotification({
  //       message: resolveApiError(error),
  //       scheme: "error",
  //     });
  //     // Handle error here
  //   }
  // };

  useEffect(() => {
    onChange(files);
  }, [files, onChange]);

  const addFiles = (new_files: File[]) => {
    const addedFiles = new_files.map((file) => ({
      name: file.name,
      data: file,
    }));
    setFiles([...files, ...addedFiles]);
  };

  useEffect(() => {
    // if (files.length) {
    files.forEach((file) => {
      handleFileUpload(file.data);
    });
    // }
  }, [files]);

  const onRemoveFile: any = (file: DropzoneFile, index: number) => {
    setFiles(files.filter((f, _index) => _index !== index));
    onFileRemoved(file.name, file.data);
  };

  const onUpdateFile = (file: DropzoneFile, index: number) => {
    let copy_files = [...files];
    copy_files[index] = file;
    setFiles(copy_files);
  };

  return (
    <FormControl
      isInvalid={error}
      isRequired={rest.isRequired}
      isReadOnly={rest.isReadOnly}
      {...formControlProps}
    >
      {Boolean(label) && <FormLabel {...labelProps}>{label}</FormLabel>}

      <Box
        paddingX={{ base: 2, md: 4 }}
        paddingY={{ base: 4, md: 26 }}
        textAlign={"center"}
        borderStyle={"dashed"}
        borderWidth={1}
        borderColor={"rgb(232, 232, 232)"}
        backgroundColor={"rgb(245, 245, 245)"}
        borderRadius={5}
        padding={2}
        {...getRootProps({
          className:
            "dropzone rounded rounded-3 d-flex align-items-center justify-content-center flex-column",
        })}
      >
        <div className="py-4 d-flex align-items-center justify-content-center flex-column">
          <input
            {...getInputProps({
              onChange: (e) => console.log(e),
            })}
          />
          <UploadIcon />
          <div className="mb-0 mt-3 pt-3" color={"#bdbdbd"}>
            <h5 className="text-grey-900 fw-600 mb-2 fs-15">
              Drag & drop files or{" "}
              <span
                className="text-primary-600 fw-500 cursor-pointer"
                role="button"
              >
                Browse
              </span>
            </h5>
            <span className="text-grey-600 fs-13">{dropzoneText}</span>
          </div>
        </div>
      </Box>
      {loading && (
        <p className="mb-2 mt-3 text-grey-600 fw-400 fs-15 text-center ">
          Uploading...
        </p>
      )}
      {uploadedImgs.length ? (
        <div className="mt-5">
          <p className="mb-2 text-grey-600 fw-500 fs-15">Uploaded</p>
          {uploadedImgs.map((file, index) =>
            dropzoneUploadItem ? (
              dropzoneUploadItem({
                file,
                index,
                onRemoveFile: () => onRemoveFile(file, index),
                onUpdateFile: (file: any) => onUpdateFile(file, index),
                canEditFileName,
              })
            ) : (
              <PrimaryDropzoneFile
                key={index}
                file={file}
                canEditFileName={canEditFileName}
                onRemoveFile={() => onRemoveFile(file, index)}
                onUpdateFile={(file: any) => onUpdateFile(file, index)}
                width={"100%"}
              />
            )
          )}
        </div>
      ) : null}

      {/* left component goes here  */}
      {Boolean(error && bottomText) && (
        <FormErrorMessage {...errorTextProps}>{bottomText}</FormErrorMessage>
      )}
      {Boolean(!error && bottomText) && (
        <FormHelperText {...bottomTextProps}>{bottomText}</FormHelperText>
      )}
    </FormControl>
  );
};

export const PrimaryDropzoneFile: React.FC<PrimaryDropzoneFileProps> = ({
  file,
  onRemoveFile = () => {},
  onUpdateFile = () => {},
  extraActionComponent,
  canEditFileName,
  closeButtonProps,
  ...rest
}) => {
  const [editFile, setEditFile] = useState<DropzoneFile>(file);
  const isEditing = editFile?.isEditing;

  // useEffect(() => {
  //   onUpdateFile({ ...file, isEditing });
  // }, [editFile, file, isEditing, onUpdateFile]);

  function extractFileNameFromUrl(url: string | URL) {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const pathSegments = pathname.split("/");
    const filenameWithParams = pathSegments[pathSegments.length - 1];
    const filenameSegments = filenameWithParams.split("?");
    const filename = filenameSegments[0];
    return filename;
  }

  const initUpdateFile = () => {
    onUpdateFile({ ...editFile, isEditing: false });
  };

  const onCancelButtonClicked = () => {
    if (!isEditing) return onRemoveFile(file);
    setEditFile({ ...file, isEditing: false });
  };

  return (
    <Tag
      size={"lg"}
      borderRadius={"md"}
      // variant="outline"
      // colorScheme="green"
      marginTop={"3"}
      marginRight={"2"}
      paddingY={"4"}
      paddingX={"4"}
      className={`text-grey-900 bg-white border border-primary-100 fw-400 justify-content-between`}
      {...rest}
    >
      <div>
        {isEditing && (
          <Input
            size={"sm"}
            value={editFile.name}
            minWidth={"130px"}
            onChange={({ target }) =>
              setEditFile({ ...editFile, name: target.value })
            }
          />
        )}
        {/* show file name and convert bytes to megabytes */}
        {!isEditing && (
          <TagLabel>
            {extractFileNameFromUrl(file)}&nbsp;
            {/* <span className="text-light fw-light">
              ({(file.data.size / 1024 ** 2).toFixed(2)}mb)
            </span> */}
          </TagLabel>
        )}
        {extraActionComponent}
        {/* show file name and convert bytes to megabytes */}
        {!isEditing && canEditFileName && (
          <TagRightIcon
            as={MdEdit}
            onClick={() => setEditFile({ ...editFile, isEditing: true })}
          />
        )}
        {isEditing && canEditFileName && (
          <TagRightIcon as={MdCheck} onClick={initUpdateFile} />
        )}
      </div>
      {/* <TagCloseButton {...closeButtonProps} onClick={onCancelButtonClicked} /> */}
    </Tag>
  );
};
