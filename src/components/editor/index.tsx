"use client";
import dynamic from "next/dynamic";
import EditorToolbar from "./EditorToolbar";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface RichTextViewerProps {
  content: string;
}

export const RichTextViewer: React.FC<RichTextViewerProps> = ({ content }) => {
  return (
    <div className="rich-text-viewer w-full">
      <ReactQuill value={content} readOnly modules={{ toolbar: false }} />
    </div>
  );
};

function undoChange(this: any) {
  this.quill.history.undo();
}

function redoChange(this: any) {
  this.quill.history.redo();
}

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  // "link",
  "image",
  "color",
  "code-block",
];

interface EditorProps {
  id?: string | number;
  value: string;
  setValue: (x: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export const QuillEditor: React.FC<EditorProps> = ({
  id = "default",
  value,
  setValue,
  placeholder = "Write about description...",
  readOnly = false,
}) => {
  const handleChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className="w-full">
      <EditorToolbar id={`ql-toolbar-${id}`} />
      <ReactQuill
        className="rounded"
        theme="snow"
        value={value || ""}
        readOnly={readOnly}
        onChange={handleChange}
        placeholder={placeholder}
        modules={{
          toolbar: {
            container: `#ql-toolbar-${id}`,
            handlers: {
              undo: undoChange,
              redo: redoChange,
            },
          },
          history: {
            delay: 500,
            maxStack: 100,
            userOnly: true,
          },
        }}
        formats={formats}
        style={{ maxHeight: "240px", height: "180px" }}
      />
    </div>
  );
};
