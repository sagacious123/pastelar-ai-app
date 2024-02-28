// import { Upload, useAddUploadMutation } from "store/uploads";
import { Spinner } from "@chakra-ui/react";
import { useRef, useState } from "react";

export interface FileHandlerBoxProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  customID?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  textProps?: React.HTMLAttributes<HTMLDivElement>;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  childrenLoadingContent?: React.ReactNode;
  autoUploadFiles?: boolean;
  isManuallyUploading?: boolean;
  onUploadComplete?: (uploads: (any | string)[]) => void;
  onUploadFailed?: (error: string) => void;
  onFilesSelected?: (files: FileList) => void;
  className?: string;
}
export const FileHandlerBox: React.FC<FileHandlerBoxProps> = ({
  customID = "fileInput",
  inputProps,
  textProps,
  containerProps,
  children = "Upload File",
  childrenLoadingContent = "Uploading...",
  className,
  autoUploadFiles = true,
  isManuallyUploading,
  onUploadComplete = () => {},
  onUploadFailed = () => {},
  onFilesSelected = () => {},
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<FileList | null>();
  const [uploads, setUploads] = useState<(any | string)[]>([]);
  // const [requestUpload, { isLoading: isUploading }] = useAddUploadMutation();

  const isUploading = false;

  const handleUpload = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    // try {
    //   const res = await requestUpload(form).unwrap();
    //   return res.data;
    // } catch (err) {
    //   return resolveApiError(err);
    // }
  };

  const handleMultipleUploads = async (files: FileList) => {
    let uploadedFiles: (any | string)[] = [];
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const uploadedFile = await handleUpload(file);

        uploadedFiles.push(uploadedFile);

        // Clear the input field value
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        if (onUploadFailed !== undefined && typeof uploadedFile === "string") {
          onUploadFailed(uploadedFile as any);
          uploadedFiles = [];
          break;
        }
      }

      if (uploadedFiles.length) {
        setUploads((prev) => [...prev, ...uploadedFiles]);
        onUploadComplete(uploadedFiles);
      }
    }
  };

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length) {
      setFiles(files);
      onFilesSelected(files);
      if (autoUploadFiles) {
        handleMultipleUploads(files);
      }
    }
  };

  return (
    <div {...containerProps}>
      <label
        htmlFor={customID}
        className={className}
        aria-disabled={isUploading}
        style={{
          cursor: "pointer",
          pointerEvents: isUploading ? "none" : "auto",
          opacity: isUploading ? 0.7 : 1,
        }}
      >
        {/* <div {...textProps}> */}
        {isUploading || isManuallyUploading ? (
          <Spinner color={"green"} />
        ) : (
          children
        )}
        {/* </div> */}
      </label>
      <input
        ref={fileInputRef}
        type={"file"}
        id={customID}
        style={{ display: "none" }}
        onChange={({ target }) => handleFileChange(target.files)}
        {...inputProps}
      />
      {uploads.map((u, _i) => (
        <div key={_i}></div>
      ))}
    </div>
  );
};

// import { useRef, useState } from "react";
// import { resolveApiError } from "utilities";

// export interface FileHandlerBoxProps
//   extends React.LabelHTMLAttributes<HTMLLabelElement> {
//   customID?: string;
//   inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
//   textProps?: React.HTMLAttributes<HTMLDivElement>;
//   containerProps?: React.HTMLAttributes<HTMLDivElement>;
//   childrenLoadingContent?: React.ReactNode;
//   autoUploadFiles?: boolean;
//   isManuallyUploading?: boolean;
//   onUploadComplete?: (uploads: string[]) => void;
//   onUploadFailed?: (error: string) => void;
//   onFilesSelected?: (files: FileList) => void;
//   className?: string;
// }
// export const FileHandlerBox: React.FC<FileHandlerBoxProps> = ({
//   customID = "fileInput",
//   inputProps,
//   textProps,
//   containerProps,
//   children = "Upload File",
//   childrenLoadingContent = "Uploading...",
//   className,
//   autoUploadFiles = true,
//   isManuallyUploading,
//   onUploadComplete = () => {},
//   onUploadFailed = () => {},
//   onFilesSelected = () => {},
// }) => {
//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const [files, setFiles] = useState<FileList | null>();
//   const [uploads, setUploads] = useState<string[]>([]);

//   const handleFileChange = (files: FileList | null) => {
//     if (files && files.length) {
//       setFiles(files);
//       onFilesSelected(files);
//       if (autoUploadFiles) {
//         // handleMultipleUploads(files);
//       }
//     }
//   };

//   return (
//     <div {...containerProps}>
//       <label
//         htmlFor={customID}
//         className={className}
//         // aria-disabled={isUploading}
//         // style={{
//         //   cursor: 'pointer',
//         //   pointerEvents: isUploading ? "none" : "auto",
//         //   opacity: isUploading ? 0.7 : 1,
//         // }}
//       >
//         <div className="fw-normal" {...textProps}>
//           {(isUploading || isManuallyUploading) ? childrenLoadingContent : children}
//         </div>
//       </label>
//       <input
//         ref={fileInputRef}
//         type={"file"}
//         id={customID}
//         style={{ display: "none" }}
//         onChange={({ target }) => handleFileChange(target.files)}
//         {...inputProps}
//       />
//       {uploads.map((u, _i) => (
//         <div key={_i}></div>
//       ))}
//     </div>
//   );
// };
