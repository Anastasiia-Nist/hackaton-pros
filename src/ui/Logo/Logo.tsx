import './Logo.scss';
import { Link } from 'react-router-dom';
import logo from '../../images/prosept-logo.svg';
import { ENDPOINT_ROOT } from 'utils/constans';

export function Logo() {
  return (
    <Link className="logo link" to={ENDPOINT_ROOT}>
      <img className="logo__img" src={logo} alt="На главную"></img>
    </Link>
  );
}
