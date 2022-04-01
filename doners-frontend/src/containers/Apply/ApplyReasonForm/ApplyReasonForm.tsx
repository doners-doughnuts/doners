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
import classNames from 'classnames/bind';
import styles from './ApplyReasonForm.module.scss';
import React, { useRef, useState } from 'react';
import P from 'assets/theme/Typography/P/P';
import H4 from 'assets/theme/Typography/H4/H4';
import { ReactComponent as ImageIcon } from 'assets/images/icon/image.svg';
import FileUploader from '../FileUploader/FileUploader';

interface ReasonProps {
  setApplyStep: (applyStep: number) => void;
  setTitle: (phone: string) => void;
  setCategory: (isdeputy: string) => void;
  setEndTime: (name: string) => void;
  setDescription: (email: string) => void;
  setEvidence: (relationshipFile: []) => void;
}
const cx = classNames.bind(styles);
const ApplyReasonForm = ({
  setApplyStep,
  setTitle,
  setCategory,
  setEndTime,
  setDescription,
  setEvidence,
}: ReasonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imgFile, setImgFile] = useState('');
  const [content, setContent] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<Editor>(null);
  const handleUploadBtnClick = () => {
    inputRef.current?.click();
  };
  const category = [
    { value: '1', label: '참전용사' },
    { value: '2', label: '희귀질환' },
    { value: '3', label: '미혼모' },
    { value: '4', label: '코로나19' },
  ];
  const contentHandler = () => {
    setContent(editorRef.current?.getInstance().getMarkdown() || '');
  };

  const handleUploadImage = async (event: any) => {
    setIsLoading(true);
    const file = event.target.files;
    //onChange(file);
    setImgFile(URL.createObjectURL(file[0]));
    console.log(imgFile);
    const formData = new FormData();
    formData.append('file', file[0]);
    console.log(formData);
  };

  return (
    <div className={cx('containor')}>
      <div className={cx('an')}>
        <div className={cx('title')}>모금에 대한 상세 정보를 기재해주세요</div>
        <div className={cx('subtitle')}>
          신청하시는 모금에 대한 상세정보를 기재해주세요.
        </div>
      </div>
      <div className={cx('content')}>
        <div className={cx('thumbnail')}>
          <div className={cx('default')} onClick={handleUploadBtnClick}>
            <input
              type="file"
              id="inputImage"
              className={cx('upload-image')}
              onChange={handleUploadImage}
              ref={inputRef}
              accept="image/*"
            />
            {imgFile ? (
              <div className={cx('preview-img')}>
                <img src={imgFile} alt="preview" />
              </div>
            ) : (
              <div className={cx('upload')}>
                <ImageIcon width={42} height={42} />
                <H4 color="blue">이미지를 업로드하세요.</H4>
                <P color="gray">
                  여기를 클릭하거나 파일을 마우스로 끌어보세요.
                </P>
              </div>
            )}
          </div>
        </div>
        <div className={cx('detail-data')}>
          <div className={cx('title')}>
            <Input placeholder="모금 제목(최대 30자)" />
          </div>
          <div className={cx('select-data')}>
            <div className={cx('select')}>
              <Selectbox options={category} />
            </div>
            <div className={cx('date')}>
              <Input placeholder="모금 마감일자" type="date" />
            </div>
          </div>
        </div>
      </div>
      <div className={cx('editor')}>
        <Editor
          previewStyle="vertical"
          height="80vh"
          initialEditType="wysiwyg"
          initialValue={content}
          plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
          onChange={contentHandler}
          ref={editorRef}
        />
      </div>

      <div className={cx('certificate')}>
        <div className={cx('en')}>
          <div className={cx('title')}>증빙자료 첨부</div>
          <div className={cx('subtitle')}>
            모금은 증빙 서류 검토 후 승인이 됩니다.
          </div>
          <div className={cx('subtitle')}>
            증빙자료가 불충분할 시 기부 신청이 반려될 수 있습니다.
          </div>
        </div>
        <div className={cx('file')}>
          <FileUploader />
        </div>
      </div>
      <div className={cx('nextbtn')}>
        <Button color={'alternate'}>다음단계</Button>
      </div>
    </div>
  );
};

export default ApplyReasonForm;
