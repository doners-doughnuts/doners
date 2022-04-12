import styles from './Footer.module.scss';
import Logo from 'assets/images/footer-logo.svg';

// import GitHubIcon from '@mui/icons-material/GitHub';
// import YouTubeIcon from '@mui/icons-material/YouTube';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  const logout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('isAdmin');
  };

  return (
    <div className={styles.footer}>
      <div className={styles.innerFooter}>
        <div className={styles.footerRow}>
          <div className={styles['footer-leftside']}>
            <ul className={styles['footer-list']}>
              <li>Community</li>
              <li>Company</li>
            </ul>
          </div>
          <div className={styles['footer-center']}>
            <div className={styles.logo}>
              <img src={Logo} className={styles.logoImg} alt="logo" />
            </div>
          </div>
          <div className={styles['footer-rightside']}>
            <ul className={styles['footer-list']}>
              <li>Help desk</li>
              <li>Customer Support</li>
            </ul>
          </div>
        </div>
        <div className={styles.icons}>
          {/* <GitHubIcon
            style={{
              width: '50px',
              height: '50px',
            }}
          />
          <YouTubeIcon
            style={{
              width: '50px',
              height: '50px',
            }}
          />
          <FacebookIcon
            style={{
              width: '50px',
              height: '50px',
            }}
          />
          <InstagramIcon
            style={{
              width: '50px',
              height: '50px',
            }}
          /> */}
        </div>
        <div className={styles.copyright} onClick={logout}>
          <span>© SSAFY 6기 A404. 2022. All Copyrights reserved.</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
