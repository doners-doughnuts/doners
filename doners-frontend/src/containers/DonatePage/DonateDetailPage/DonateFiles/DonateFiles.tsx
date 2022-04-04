import classNames from 'classnames/bind';
import styles from './DonateFiles.module.scss';
import { useEffect, useState } from 'react';
import H3 from 'assets/theme/Typography/H3/H3';
import { DontationDetailType, EvidenceType } from 'types/DonationTypes';
import FileButton from 'assets/theme/Button/FileButton/FileButton';
// import { DonationDetailType } from '../DontateDetail/DonateDetail';

const cx = classNames.bind(styles);

type DonateFIlesProps = {
  data: DontationDetailType;
};

const DonateFiles = ({ data }: DonateFIlesProps) => {
  // const [numPages, setNumPages] = useState(0);
  // const [pageNumber, setPageNumber] = useState(1);

  // const [files, setFiles] = useState<string[]>([]);

  // useEffect(() => {
  //   console.log(Object.keys(data.evidence));
  //   setFilesName(Object.keys(data.evidence));
  // }, []);
  useEffect(() => {
    console.log(data.evidence);
  }, [data]);

  // function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
  //   setNumPages(numPages);
  //   setPageNumber(1);
  // }

  return (
    <div className={cx('files-form')}>
      <div className={cx('title')}>
        <H3>증빙자료</H3>
      </div>
      {data.evidence &&
        data.evidence.map((file: EvidenceType) => {
          return <FileButton key={file.url} name={file.name} url={file.url} />;
        })}
    </div>
  );
};

export default DonateFiles;
