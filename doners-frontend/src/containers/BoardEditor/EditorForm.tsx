// TOAST UI Editor import
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useRef } from 'react';

function EditorForm({ content, onChange }: any) {
  const editorRef = useRef<Editor>(null);

  const handleChange = () => {
    onChange(editorRef.current?.getInstance().getMarkdown() || '');
  };
  return (
    <>
      <Editor
        previewStyle="vertical"
        height="79vh"
        initialEditType="wysiwyg"
        initialValue={content}
        ref={editorRef}
        onChange={handleChange}
      />
    </>
  );
}

export default EditorForm;
