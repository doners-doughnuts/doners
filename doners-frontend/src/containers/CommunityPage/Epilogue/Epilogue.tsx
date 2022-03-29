import EpilogueCard from 'components/EpilogueCard/EpilogueCard';
import classNames from 'classnames/bind';
import styles from './Epilogue.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEpilogueList } from 'services/api/Epilogue';

const cx = classNames.bind(styles);

export type ListItemType = {
  epilogueCreateTime: string;
  epilogueDescription: string;
  epilogueId: string;
  epilogueTitle: string;
  epilogueViews: number;
  epilogueWriter: string;
};

const Epilogue = () => {
  const [sequence, setSequence] = useState(1);
  const [listItems, setListItems] = useState<ListItemType[]>([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const response = await getEpilogueList(sequence);
    console.log(response.data);
    const data = response.data.epilogueGetListResponseDTOList;
    // console.log(data);
    setListItems((prev) => [...prev, ...data]);
  };

  return (
    <section className={cx('container')}>
      <div className={cx('row')}>
        {listItems.map((data) => {
          return (
            <div className={cx('col-lg-4')} key={data.epilogueId}>
              <Link to={data.epilogueId}>
                <EpilogueCard data={data} />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Epilogue;
