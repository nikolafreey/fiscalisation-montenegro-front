const { useEffect } = require("react");
const { useSelector, useDispatch } = require("react-redux");
const { getPorezi } = require("../store/actions/UslugeActions");
const { poreziSelector } = require("../store/selectors/UslugeSelector");

export const usePorezi = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPorezi());
  }, [dispatch]);

  const porezi = useSelector(poreziSelector());

  const getStopaPerId = (porez_id) => {
    const stopa = porezi.find((porez) => porez.id === porez_id)?.stopa;
    return stopa;
  };

  const getPriceNoVat = (pdv_ukljucen, porez_id, ukupna_cijena) => {
    const stopa = getStopaPerId(porez_id);
    if (pdv_ukljucen === 0) {
      return Math.round(100 * ukupna_cijena) / 100;
    } else {
      return Math.round(100 * (ukupna_cijena / (Number(stopa) + 1))) / 100;
    }
  };

  const getPriceVat = (pdv_ukljucen, porez_id, ukupna_cijena) => {
    const stopa = getStopaPerId(porez_id);
    if (pdv_ukljucen === 0) {
      return ukupna_cijena + ukupna_cijena * +stopa;
    } else {
      return ukupna_cijena;
    }
  };

  const getVat = (pdv_ukljucen, porez_id, ukupna_cijena) => {
    const stopa = getStopaPerId(porez_id);

    if (pdv_ukljucen === 0) {
      return Math.round(100 * (ukupna_cijena * Number(stopa))) / 100;
    } else {
      return (
        Math.round(
          100 * (ukupna_cijena - ukupna_cijena / (Number(stopa) + 1))
        ) / 100
      );
    }
  };

  return {
    getStopaPerId,
    getPriceVat,
    getPriceNoVat,
    getVat,
    porezi
  };
}