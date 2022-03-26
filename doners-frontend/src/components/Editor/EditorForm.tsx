import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

// code-syntax-highlight
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

// color-syntax
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import classNames from 'classnames/bind';
import styles from './EditorForm.module.scss';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

const EditorForm = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const editorRef = useRef<Editor>(null);

  const contentHandler = () => {
    setContent(editorRef.current?.getInstance().getMarkdown() || '');
    console.log(content);
  };

  return (
    <div className={cx('editor')}>
      <textarea
        className={cx('title')}
        placeholder="제목을 입력하세요."
        maxLength={50}
      />
      <Editor
        previewStyle="vertical"
        height="79vh"
        initialEditType="wysiwyg"
        // initialValue=""
        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
        onChange={contentHandler}
        ref={editorRef}
      />
    </div>
  );
};

export default EditorForm;
