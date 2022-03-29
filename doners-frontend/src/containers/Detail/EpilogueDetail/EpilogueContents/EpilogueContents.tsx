import classNames from 'classnames/bind';
import styles from './EpilogueContents.module.scss';
import { Viewer } from '@toast-ui/react-editor';
import { useEffect, useState } from 'react';
import EpilogueDetailHeader from '../EpilogueDetailHeader/EpilogueDetailHeader';
import EpilogueDetailReceipt from '../EpilogueDetailReceipt/EpilogueDetailReceipt';
import { useNavigate, useParams } from 'react-router';
import { deleteEpilogue, getEpilogueDetail } from 'services/api/Epilogue';

const cx = classNames.bind(styles);

const EpilogueContents = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [createTime, setCreateTime] = useState('');
  const [writer, setWriter] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [historyList, setHistoryList] = useState([]);

  const [views, setViews] = useState(0);

  const { epilogue_id } = useParams<string>();

  const navigate = useNavigate();

  useEffect(() => {
    getEpilogue();
  }, []);

  const getEpilogue = async () => {
    if (typeof epilogue_id === 'string') {
      try {
        const response = await getEpilogueDetail(epilogue_id);
        console.log(response.data);
        setTitle(response.data.epilogueTitle);
        setContents(response.data.epilogueDescription);
        setCreateTime(response.data.epilogueCreateTime);
        setWriter(response.data.epilogueWriter);
        setViews(response.data.epilogueViews);
        setThumbnail(response.data.epilogueImage);
        setHistoryList(response.data.epilogueBudgetResponseDTOList);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteClick = (e: React.MouseEventHandler<HTMLButtonElement>) => {
    deleteHandler();
  };

  const handleModifyClick = (e: React.MouseEventHandler<HTMLButtonElement>) => {
    navigate(`/community/epilogue/modify/${epilogue_id}`);
  };

  const deleteHandler = async () => {
    if (typeof epilogue_id === 'string') {
      try {
        const response = await deleteEpilogue(epilogue_id);
        console.log(response);
        navigate('/community/epilogue');
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className={cx('inner-container')}>
      <EpilogueDetailHeader
        title={title}
        date={createTime}
        writer={writer}
        src={thumbnail}
        onDelete={handleDeleteClick}
        onModify={handleModifyClick}
      />
      <main className={cx('content')}>
        {contents !== '' ? <Viewer initialValue={contents} /> : null}
      </main>
      <EpilogueDetailReceipt history={historyList} />
    </div>
  );
};

export default EpilogueContents;
