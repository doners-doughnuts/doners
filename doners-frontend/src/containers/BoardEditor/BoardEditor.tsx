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
import { createRef, useEffect, useRef, useState } from 'react';
import H1 from 'assets/theme/Typography/H1/H1';

import classNames from 'classnames/bind';
import styles from './BoardEditor.module.scss';
import Button from 'assets/theme/Button/Button';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { getBoardDetail, modifyBoard, registBoard } from 'services/api/Board';

const cx = classNames.bind(styles);

type EditType = {
  modify?: boolean;
};

function BoardEditor({ modify = false }: EditType) {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const editorRef = useRef<Editor>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);

  const { community_id } = useParams<string>();
  const navigate = useNavigate();

  useEffect(() => {
    if (modify && isLoading) {
      getDetail();
    }
  }, [isLoading]);

  const getDetail = async () => {
    if (typeof community_id === 'string') {
      try {
        const response = await getBoardDetail(community_id);

        setContent(response.data.communityDescription);
        setTitle(response.data.communityTitle);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
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
    const body = {
      communityDescription: content,
      communityTitle: title,
    };

    try {
      await registBoard(body);
      navigate('/community/board');
    } catch (error) {
      console.log(error);
    }
  };

  const modifyApi = async () => {
    const body = {
      communityDescription: content,
      communityTitle: title,
      communityId: community_id,
    };

    try {
      await modifyBoard(body);
      navigate(`/community/board/${community_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={cx('header')}>
        {modify ? <H1>Modify Here...</H1> : <H1>Write Something...</H1>}
      </div>
      <div className={cx('inner-container')}>
        {/* <EditorForm /> */}
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

export default BoardEditor;
