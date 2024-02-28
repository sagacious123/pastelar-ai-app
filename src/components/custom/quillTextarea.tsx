import {
  PrimaryInputWrapper,
  PrimaryInputWrapperProp,
} from "components/inputs";
import { QuillOptionsStatic } from "quill";
import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

export interface CustomQuillTextareaProps extends PrimaryInputWrapperProp {
  minHeight?: string | number;
  value?: string;
  placeholder?: string;
  editorOptions?: any;
  onChange?: (value: string) => void;
}

export const CustomQuillTextarea: React.FC<CustomQuillTextareaProps> = ({
  minHeight,
  value,
  editorOptions,
  onChange = () => {},
  placeholder,
  ...rest
}) => {
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        // [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        // [{ color: [] }, { background: [] }],
        // [{ align: [] }],
        // ["blockquote", "code-block"],
        // [{ list: "ordered" }, { list: "bullet" }],
        // [{ script: "sub" }, { script: "super" }],
        // [{ indent: "-1" }, { indent: "+1" }],
        // [{ direction: "rtl" }],
        // [{ font: [] }],
        // [{ clean: "removeFormat" }],
      ],
    },
    placeholder,
    formats: [
      //   "header",
      "bold",
      "italic",
      "underline",
      //   "strike",
      //   "list",
      //   "bullet",
      //   "indent",
      //   "align",
      //   "color",
      //   "background",
    ],
    ...editorOptions,
  });

  useEffect(() => {
    // console.log(quill?.root?.innerHTML, quill?.root.innerHTML.replace(/<[^>]*>?/gm, '').length);
    if (
      value &&
      quill &&
      (!quill.root.innerHTML ||
        !quill.root.innerHTML.replace(/<[^>]*>?/gm, "").length)
    ) {
      quill.clipboard.dangerouslyPasteHTML(value);
    }
  }, [quill, value]);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta: any, oldDelta: any, source: any) => {
        //  console.log('Text change!');
        //  console.log(quill.getText()); // Get text only
        //  console.log(quill.getContents()); // Get delta contents
        //  console.log(quill.root.innerHTML); // Get innerHTML using quill
        // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
        onChange(quill.root.innerHTML);
        // onChange(quill.getText());
      });
    }
  }, [quill, onChange]);

  return (
    <PrimaryInputWrapper {...rest}>
      <div
        style={{
          height: "auto",
          minHeight,
          //   marginBottom: "65px",
          width: "100%",
        }}
      >
        <div ref={quillRef}></div>
      </div>
    </PrimaryInputWrapper>
  );
};
