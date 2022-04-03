import classNames from 'classnames/bind';
import styles from './DonateFiles.module.scss';
import { useEffect, useState } from 'react';
import H3 from 'assets/theme/Typography/H3/H3';
import { DontationDetailType } from 'types/DonationTypes';
// import { DonationDetailType } from '../DontateDetail/DonateDetail';

const cx = classNames.bind(styles);

type DonateFIlesProps = {
  data: DontationDetailType;
};

const DonateFiles = ({ data }: DonateFIlesProps) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const [filesName, setFilesName] = useState<string[]>([]);

  useEffect(() => {
    console.log(Object.keys(data.evidence));
    setFilesName(Object.keys(data.evidence));
  }, []);

  useEffect(() => {
    console.log(filesName);
  }, [filesName]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div className={cx('files-form')}>
      <div className={cx('title')}>
        <H3>증빙자료</H3>
      </div>
      <div className={cx('file-item')}></div>
      <div className={cx('file-item')}></div>
      <div className={cx('file-item')}></div>
      <div className={cx('file-item')}></div>
    </div>
  );
};

export default DonateFiles;
