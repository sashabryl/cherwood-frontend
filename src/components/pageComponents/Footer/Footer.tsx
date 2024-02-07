import { NavLink } from "react-router-dom";

import "./Footer.scss"
import { useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const languageReducer = useAppSelector(state => state.language);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
      <div className="footer" id="footer">
        <NavLink
          to="/"
          className="logo footer__none"
        />
        <div className="footer__mainContainer">
          <div className="footer__container">
            <a 
              href="https://www.instagram.com/cherwoodjoinery?igsh=bmhicHduZjdkOG42" 
              className="footer__insta"
              target="_blank"
            >
              {languageReducer.language 
                ? `More about the arpenter${'\u2019'}s activities on Instagram`
                : 'Більше інформації про діяльність столяра на Instagram'
              }
            
            <p className="footer__insta--img footer__img"/>
            </a>

            <a
              target="_blank"
              href="tel:+38 (093) 170 78 67"
              className="footer__phone">
                <p className="footer__phone--img footer__img"/>
              +38 (093) 170 78 67
            </a>
          </div>

          <div className="footer__container2">
            <div className="footer__miniContainer">
              <NavLink
                to="/"
                className="footer__text"
              > 
                {languageReducer.language 
                  ?('About us')
                  :('Про нас')
                }
              </NavLink>

              {windowWidth < 780 && (
                <NavLink to="/pay" className="footer__text">
                  {languageReducer.language 
                    ? ('Delivery and pay')
                    : ('Доставка та оплата')
                  }
                </NavLink>
              )}
              <a 
                target="_blank"
                href="https://maps.app.goo.gl/Wi33AmYgTRsN23vb8"
                className="footer__text"
              >
              {languageReducer.language 
                  ?('Location')
                  :('Локація')
                }
              <p className="footer__locationImg footer__img"/>
            </a>
          </div>

          <a 
            href="mailto:romanlapicak@gmail.com"
            className="footer__gmail"
            target="_blank"
          >
            <p className="footer__gmail--img footer__img"/>
            romanlapicak@gmail.com
          </a>
          </div>
        </div>
    </div>
  );
}