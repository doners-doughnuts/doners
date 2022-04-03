import Avatar from 'assets/theme/Avatar/Avatar';
import Tag from 'assets/theme/Tag/Tag';
import H4 from 'assets/theme/Typography/H4/H4';
import P from 'assets/theme/Typography/P/P';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './EpilogueEditorHeader.module.scss';
import { ReactComponent as ImageIcon } from 'assets/images/icon/image.svg';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

const EpilogueEditorHeader = ({ onChange, src }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imgFile, setImgFile] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadBtnClick = () => {
    inputRef.current?.click();
  };

  const handleUploadImage = async (event: any) => {
    setIsLoading(true);
    const file = event.target.files;
    onChange(file);
    console.log(URL.createObjectURL(file[0]));
    setImgFile(URL.createObjectURL(file[0]));
    const formData = new FormData();
    formData.append('file', file[0]);
    console.log(formData);
  };

  // useEffect(() => {
  //   console.log(src);
  //   setImgFile(src);
  // }, [src]);

  useEffect(() => {
    console.log(imgFile);
  }, [imgFile]);

  return (
    <div className={cx('header')}>
      <div className={cx('info')}>
        <div className={cx('user-info')}>
          <Avatar />
          <div className={cx('name')}>
            <P>이학성</P>
          </div>
        </div>
        <div className={cx('donation-info')}>
          <div className={cx('category-title')}>
            <div className={cx('category')}>
              <Tag color="black">CATEGORY</Tag>
            </div>
            <H4>모금제목</H4>
          </div>
          <H4>모금 진행 기간 : 21/12/24 ~ 22/03/01</H4>
          <Link to="">
            <div className={cx('detail_link')}>
              <P color="green">기부 상세 보기</P>
            </div>
          </Link>
        </div>
      </div>

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
              <P color="gray">여기를 클릭하여 파일을 선택해주세요.</P>
            </div>
          )}
        </div>
        {/* <img src={src} alt="ex" /> */}
      </div>
    </div>
  );
};

export default EpilogueEditorHeader;
