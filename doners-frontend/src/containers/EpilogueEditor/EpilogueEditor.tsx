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

import H1 from 'assets/theme/Typography/H1/H1';

import classNames from 'classnames/bind';
import styles from './EpilogueEditor.module.scss';
import Button from 'assets/theme/Button/Button';
import EpilogueEditorHeader from './EpilogueEditorHeader/EpilogueEditorHeader';
import TotalDonate from './TotalDonate/TotalDonate';
import ReceiptEditor from './ReceiptEditor/ReceiptEditor';
import { useEffect, useRef, useState } from 'react';
import {
  getEpilogueDetail,
  modifyEpilogue,
  registEpilogue,
} from 'services/api/Epilogue';
import { useNavigate, useParams } from 'react-router';

const cx = classNames.bind(styles);

type EditType = {
  modify?: boolean;
};

type historyType = {
  epilogueBudgetSequence: number;
  epilogueBudgetPlan: string;
  epilogueBudgetAmount: string;
};

function EpilogueEditor({ modify = false }: EditType) {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [imgFile, setImgFile] = useState('');
  const [initlength, SetInit] = useState(0);
  const [historyList, setHistoryList] = useState<historyType[]>([]);

  const editorRef = useRef<Editor>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);

  const { id } = useParams<string>();
  const navigate = useNavigate();

  useEffect(() => {
    if (modify && isLoading) {
      getDetail();
    }
  }, [isLoading]);

  const getDetail = async () => {
    if (typeof id === 'string') {
      const response = await getEpilogueDetail(id);
      console.log(response);
      setContent(response.data.epilogueDescription);
      setTitle(response.data.epilogueTitle);
      setImgFile(response.data.epilogueImage);
      setHistoryList(response.data.epilogueBudgetResponseDTOList);
      SetInit(response.data.epilogueBudgetResponseDTOList.length);
      setIsLoading(false);
    }
  };
  const titleHandler = () => {
    if (titleRef.current) {
      setTitle(titleRef.current.value);
    }
  };

  const contentHandler = () => {
    setContent(editorRef.current?.getInstance().getMarkdown() || '');
  };

  const handleRegistSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    registApi();
  };

  const handleModifySubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    modifyApi();
  };

  const registApi = async () => {
    const formData = new FormData();
    formData.append('multipartFile', imgFile[0]);
    console.log(imgFile[0]);
    formData.append(
      'epilogueRegisterPostDTO',
      new Blob(
        [
          JSON.stringify({
            epilogueBudgetRequestDTOList: historyList,
            epilogueDescription: content,
            epilogueTitle: title,
            donationId: id,
          }),
        ],
        {
          type: 'application/json',
        }
      )
    );
    console.log(formData);

    try {
      if (!imgFile) {
        //임시
        alert('이미지를 등록해주세요.');
      }
      if (!title || !content) {
        alert('내용을 모두 입력해주세요.');
      }

      if (imgFile && title && content) {
        const response = await registEpilogue(formData);
        console.log(response);
        navigate('/community/epilogue');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const modifyApi = async () => {
    const body = {
      epilogueBudgetRequestDTOList: historyList,
      epilogueDescription: content,
      epilogueId: id,
      epilogueTitle: title,
    };

    try {
      await modifyEpilogue(body);
      navigate(`/community/epilogue/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadImage = async (file: any) => {
    setIsLoading(true);
    setImgFile(file);
  };

  const handleUploadPlan = (data: any) => {
    setHistoryList((prev) => [...prev, data]);
  };

  const handleDeletePlan = (epilogueBudgetSequence: number) => {
    setHistoryList(
      historyList.filter(
        (history) => history.epilogueBudgetSequence !== epilogueBudgetSequence
      )
    );
  };

  // useEffect(() => {
  //   console.log(historyList);
  //   handleUploadPlan(historyList);
  // }, []);

  // useEffect(() => {
  //   console.log(imgFile);
  // }, [imgFile]);

  return (
    <>
      <div className={cx('header')}>
        {modify ? (
          <H1>후기를 수정해주세요.</H1>
        ) : (
          <H1>모금에 대한 후기를 작성해주세요.</H1>
        )}
      </div>
      <div className={cx('inner-container')}>
        <EpilogueEditorHeader
          onChange={handleUploadImage}
          src={imgFile}
          donation_id={id}
        />
        <div className={cx('editor')}>
          <textarea
            className={cx('title')}
            placeholder="제목을 입력하세요."
            maxLength={50}
            ref={titleRef}
            onChange={titleHandler}
            value={title}
          />
          {(!modify || !isLoading) && (
            <Editor
              previewStyle="vertical"
              height="79vh"
              initialEditType="wysiwyg"
              initialValue={content}
              plugins={[
                colorSyntax,
                [codeSyntaxHighlight, { highlighter: Prism }],
              ]}
              onChange={contentHandler}
              ref={editorRef}
            />
          )}
        </div>
        {/* <EditorForm /> */}
        <div className={cx('donate-receipt')}>
          <div className={cx('total-donate')}>
            <TotalDonate donation_id={id} />
          </div>
          <div className={cx('receipt-editor')}>
            <ReceiptEditor
              onDelete={handleDeletePlan}
              onChange={handleUploadPlan}
              list={historyList}
              length={initlength}
            />
          </div>
        </div>
        <div className={cx('btn-row')}>
          <div className={cx('regist-btn')}>
            {modify ? (
              <Button color="primary" fullWidth onClick={handleModifySubmit}>
                수정 완료
              </Button>
            ) : (
              <Button color="primary" fullWidth onClick={handleRegistSubmit}>
                작성 완료
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EpilogueEditor;
