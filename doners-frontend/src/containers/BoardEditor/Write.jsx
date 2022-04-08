import React, { useRef } from 'react';

// TOAST UI Editor import
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

function Write({ content, onChange }) {
  const editorRef = useRef();
  const handleChange = () => {
    onChange(editorRef.current.getInstance().getMarkdown() || '');
  };
  return (
    <>
      <Editor
        previewStyle="vertical"
        height="79vh"
        initialEditType="wysiwyg"
        initialValue={content}
        usageStatistics={false}
        ref={editorRef}
        onChange={handleChange}
      />
    </>
  );
}

export default Write;
