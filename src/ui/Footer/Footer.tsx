import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__copywriter">
        &copy; 2002–{new Date().getFullYear()}, PROSEPT
      </p>
    </footer>
  );
};
