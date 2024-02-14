import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { getBooking, getCherwood} from "../../../api";
import { Modal } from "../Modal/Modal";
import img from '../../../img/e547dbac650979a00cdb494fbc168463.jpg';

import "./HistoryLogic.scss"
import { NavLink } from "react-router-dom";
import { BookingItem } from "../../../helpers/BookingInterface";
import { Cherwood } from "../../../helpers/Cherwood";

export const HistoryLogic = () => {
  const [cherwood, setCherwood] = useState<BookingItem[]>([{ id: 0, total: '', created_at: '', order_items: [
    {product: 0, quantity: 0, calculate_total: 0}
  ] }]);
  const [allcherwood, setAllCherwood] = useState<Cherwood[]>([]);
  const [isSelect, setIsSelect] = useState(false);
  const languageReducer = useAppSelector(state => state.language);
  const registrationReducer = useAppSelector(state => state.registration);

  const hendlModal = () => {
    setIsSelect(!isSelect);
  } 
 
  useEffect(() => {
    getBooking( 
       registrationReducer.registration.access)
       .then((straviFromServer) => {
        setCherwood(straviFromServer);
      })
      .catch((error) => {
        console.error("Error fetching booking:", error);
      });
  }, []);

  useEffect(() => {
    getCherwood()
      .then((straviFromServer) => {
        setAllCherwood(straviFromServer);
      })
      .catch((error) => {
        console.error("Error fetching Cherwood:", error);
      });
  }, []);

  const filteredCherwood = 
    allcherwood.filter(item => {
      return cherwood.some(cherwoodItem =>
        cherwoodItem.order_items.some(order => order.product === item.id)
      );
    }).map(item => {
      const matchingCherwoodItem = cherwood.find(cherwoodItem =>
        cherwoodItem.order_items.some(order => order.product === item.id)
      );

      let total = 0;
      let quantity = 0;
  
      if (matchingCherwoodItem) {
        matchingCherwoodItem.order_items.forEach(order => {
          total += order.calculate_total;
          quantity += order.quantity;
        });
      }
      
      return {
        ...item,
        time: matchingCherwoodItem?.created_at,
        total: total,
        quantity: quantity
      };
    });


  return (
    <div className="historyLogic">
      <h1 className="historyLogic__header">
        {languageReducer.language 
          ? 'Reservations history'
          :'Історія бронювань'
        }
      </h1>

  {filteredCherwood.length > 0 ?
        filteredCherwood.map(card => (
          <div className="historyLogic__chard" key={card.id}>
            <img 
              src={card.main_image} 
              alt="cardImg" 
              className="historyLogic__img"
              onClick={hendlModal}
            />

            <div className="historyLogic__container">
              <div className="historyLogic__minicontainer">
                <div className="historyLogic__count">
                  {languageReducer.language ? 'Was ordered:' : 'Було замовлено:'}
                </div>
                <p className="historyLogic__text">{card.time}</p>
              </div>

              <div className="historyLogic__top">
                <div className="historyLogic__name">
                  {languageReducer.language ? card.name_eng : card.name}
                </div>

                <div className="cardinChard__price">
                  {`₴${card.price}`}
                </div>
              </div>

              <div className="cardinChard___descr">
                <div className="modal__minicontainer2">
                  <p className="modal__type">
                    {languageReducer.language ? 'Length:' : 'Довжина:'}
                  </p>
                  <p className="modal__number">{card.length}</p>

                  <p className="modal__slash">/</p>

                  <p className="modal__type">
                    {languageReducer.language ? 'Wight:' : 'Bara:'}
                  </p>
                  <p className="modal__number">{card.width}</p>

                  <p className="modal__slash">/</p>

                  <p className="modal__type">
                    {languageReducer.language ? 'Height:' : 'Висота:'}
                  </p>
                  <p className="modal__number">{card.height}</p>
                </div>

                <div className="historyLogic__minicontainer">
                  <p className="modal__type">
                    {languageReducer.language ? 'Material:' : 'Матеріал:'}
                  </p>
                  <p className="modal__text">
                    {languageReducer.language ? card.material_eng : card.material}
                  </p>
                </div>

                <div className="cardinChard__top">
                  <div className="historyLogic__name">
                    {`x ${card.quantity} ${languageReducer.language ? 'pieces' : 'штук'}`}
                  </div>
              </div>

              <div className="historyLogic__top2">
                  <div className="historyLogic__name2">
                    {languageReducer.language ? 'Total:' : 'Всього:'}
                  </div>

                  <div className="historyLogic__name2">
                    {`₴${card.total}`}
                  </div>
              </div>
              </div>
            </div>

            {isSelect && <Modal card={card} hendlCloseModal={hendlModal} />}
          </div>
        ))
        : 
        <div className="historyLogic__empty">
          <p className="historyLogic__search"/>

          <h1 className="historyLogic__no">
            {languageReducer.language 
              ? 'There was no order'
              : 'Замовлень не було'
            }
          </h1>

          <NavLink to="/" className="modal__button2 modal__button">
            {languageReducer.language ? 'Go to shop' : 'Перейти в магазин'}
            <p className="modal__arrow" />
          </NavLink>
        </div>
      } 
    </div>
  );
}