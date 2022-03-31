import classNames from 'classnames/bind';
import styles from './DonateFiles.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

const DonateFiles = () => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return <div className={cx('files-form')}>hello</div>;
};

export default DonateFiles;
