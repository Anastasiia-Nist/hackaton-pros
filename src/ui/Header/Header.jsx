import './Header.scss';
import Navigation from 'ui/Navigation/Navigation';
import { Logo } from 'ui/Logo/Logo';

export const Header = () => {
  return (
    <header className="header">
      <Logo></Logo>
      <Navigation />
    </header>
  );
};
