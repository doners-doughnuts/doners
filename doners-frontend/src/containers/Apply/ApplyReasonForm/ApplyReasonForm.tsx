import { Editor } from '@toast-ui/react-editor';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
// color-syntax
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

// code-syntax-highlight
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import Button from 'assets/theme/Button/Button';
import Input from 'assets/theme/Input/Input';
import Selectbox from 'assets/theme/Selectbox/Selectbox';
import React, { useRef, useState } from 'react';

interface ReasonProps {
  setApplyStep: (applyStep: number) => void;
  setTitle: (phone: string) => void;
  setCategory: (isdeputy: string) => void;
  setEndTime: (name: string) => void;
  setDescription: (email: string) => void;
  setEvidence: (relationshipFile: []) => void;
}

const ApplyReasonForm = ({
  setApplyStep,
  setTitle,
  setCategory,
  setEndTime,
  setDescription,
  setEvidence,
}: ReasonProps) => {
  const [content, setContent] = useState<string>('');
  const editorRef = useRef<Editor>(null);
  const category = [
    { value: '1', label: '참전용사' },
    { value: '2', label: '희귀질환' },
    { value: '3', label: '미혼모' },
    { value: '4', label: '코로나19' },
  ];
  const contentHandler = () => {
    setContent(editorRef.current?.getInstance().getMarkdown() || '');
  };
  return (
    <div>
      기부 사유<div>모금에 대한 상세 정보를 기재해주세요</div>
      <div>신청하시는 모금에 대한 상세정보를 기재해주세요.</div>
      <Input placeholder="모금 제목(최대 30자)" />
      <Selectbox option={category} />
      <Input placeholder="모금 마감일자" type="date" />
      <Editor
        previewStyle="vertical"
        height="79vh"
        initialEditType="wysiwyg"
        initialValue={content}
        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
        onChange={contentHandler}
        ref={editorRef}
      />
      <div>증빙자료 첨부</div>
      <div>모금은 증빙 서류 검토 후 승인이 됩니다.</div>
      <div>증빙자료가 불충분할 시 기부 신청이 반려될 수 있습니다.</div>
      <Button color={'alternate'} size="large">
        다음단계
      </Button>
    </div>
  );
};

export default ApplyReasonForm;
