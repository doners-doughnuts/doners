import React, { useState, useEffect } from 'react';

// TOAST UI Editor import
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

function Write() {
  return (
    <>
      <Editor initialValue="헬로헬로 나는 에디터야" usageStatistics={false} />
    </>
  );
}

export default Write;
