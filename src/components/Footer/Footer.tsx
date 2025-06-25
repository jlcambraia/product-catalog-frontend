import styles from "./Footer.module.css";

const Footer = () => {
  function getCurrentYear(): number {
    const today = new Date();
    const year = today.getFullYear();
    return year;
  }

  return (
    <footer className={styles.footer}>
      <p className={styles.copyrights}>
        &copy; {getCurrentYear()} João Luiz Cambraia
      </p>
    </footer>
  );
};

export default Footer;
