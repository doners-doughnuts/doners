import classNames from 'classnames/bind';
import styles from './DonateFiles.module.scss';
import { useState } from 'react';
import H3 from 'assets/theme/Typography/H3/H3';

const cx = classNames.bind(styles);

const DonateFiles = () => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

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
