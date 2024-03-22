import JoditEditor from "jodit-react";
import React, { useMemo, useRef } from "react";
import "./style.css";

const TextEditor = ({
  placeholder,
  prodDescription,
  prodDescriptionHandler,
}) => {
  const editor = useRef(null);
  // const [content, setContent] = useState("");

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || " Write Product Description here ...",
    }),
    [placeholder],
  );

  return (
    <>
      <JoditEditor
        ref={editor}
        value={prodDescription}
        tabIndex={1} // tabIndex of textarea
        // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        config={config}
        onChange={(newContent) => {
          prodDescriptionHandler(newContent);
        }}
      />
    </>
  );
};

export default TextEditor;
