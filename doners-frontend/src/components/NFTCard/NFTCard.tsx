import Avatar from 'assets/theme/Avatar/Avatar';
import classNames from 'classnames/bind';
import styles from './NFTCard.module.scss';
import Span from 'assets/theme/Typography/Span/Span';
import H5 from 'assets/theme/Typography/H5/H5';
import Tag from 'assets/theme/Tag/Tag';
import Progressbar from 'assets/theme/Progressbar/Progressbar';
import { useEffect, useState } from 'react';
import { getMetadataFromUri } from 'services/blockchain/NftApi';
import { NftMetadataType } from 'types/NftTypes';
import { fDate } from 'utils/formatTime';
import NFTDetail from 'containers/ProfilePage/NFTDetail/NFTDetail';

const cx = classNames.bind(styles);

const NftEdition: Record<string, string> = {
  corona: '코로나19',
  single: '미혼모',
  warrior: '참전용사',
  patient: '희귀병환자',
};

const NFTCard = ({ metadataUri }: any) => {
  const [metadata, setMetadata] = useState<NftMetadataType>();
  const [edition, setEdition] = useState('');

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const getMetadata = async () => {
    let response: NftMetadataType = await getMetadataFromUri(metadataUri);
    setEdition(NftEdition[response.edition]);

    // @ts-ignore
    // response.edition = NftEdition[response.edition];
    // console.log(response);
    setMetadata(response);
  };

  useEffect(() => {
    // console.log(metadataUri);
    getMetadata();
  }, []);

  return (
    <>
      <div className={cx('container')} onClick={handleOpenModal}>
        {metadata ? (
          <>
            <div className={cx('card')}>
              <div className={cx('tag')}>
                <Tag color="black">{edition}</Tag>
              </div>
              <div className={cx('img-wrap')}>
                <img src={metadata.image} alt="" />
              </div>
            </div>
            <div className={cx('detail')}>
              <div
                className={cx('nfttitle')}
              >{`${metadata.edition}#${metadata.tokenId}`}</div>
              <div className={cx('nftdate')}>
                {fDate(new Date(metadata.date).toLocaleDateString())}
              </div>
            </div>
          </>
        ) : null}
      </div>
      {modalOpen ? (
        <NFTDetail
          open={modalOpen}
          close={handleCloseModal}
          metadata={metadata}
        ></NFTDetail>
      ) : null}
    </>
  );
};

export default NFTCard;
