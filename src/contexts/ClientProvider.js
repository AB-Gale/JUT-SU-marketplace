import React from "react";
import { watchesApi } from "../helpers/const";
export const ClientContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "GET_WATCHES") {
    return {
      ...state,
      watches: action.payload,
    };
  } else if (action.type === "GET_WATCHES_FROM_BASKET") {
    return {
      ...state,
      basketWatches: action.payload,
    };
  } else if (action.type === "GET_BASKET_COUNT") {
    return {
      ...state,
      basketCount: action.payload,
    };
  }
  return state;
};

function ClientProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    watches: [],
    basketWatches: {
      products: [],
      totalPrice: 0,
    },
    basketCount: 0,
  });

  const [searchWord, setSearchWord] = React.useState("");
  const [filterByPrice, setFilterByPrice] = React.useState([0, 10000]);
  const [minMax, setMinMax] = React.useState([0, 10000]);

  const limit = 2;
  const [pagesCount, setPagesCount] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);

  // ! Math.ceil(1.2) = 2
  // ! Math.floor(1.9) = 1
  // ! Math.round(1.2) 1

  const getWatches = () => {
    fetch(
      `${watchesApi}?q=${searchWord}&price_gte=${filterByPrice[0]}&price_lte=${filterByPrice[1]}&_limit=${limit}&_page=${currentPage}`
    )
      .then((res) => {
        let count = Math.ceil(res.headers.get("X-Total-Count") / limit);
        setPagesCount(count);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        let action = {
          type: "GET_WATCHES",
          payload: data,
        };
        dispatch(action);
      });
  };

  // ! Basket functional
  const addWatchToBasket = (watch) => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      basket = {
        totalPrice: 0,
        products: [],
      };
    }
    let watchToBasket = {
      ...watch,
      count: 1,
      subPrice: watch.price,
    };

    let check = basket.products.find((item) => {
      return item.id === watchToBasket.id;
    });
    if (check) {
      basket.products = basket.products.map((item) => {
        if (item.id === watchToBasket.id) {
          item.count++;
          item.subPrice = item.count * item.price;
          return item;
        }
        return item;
      });
    } else {
      basket.products.push(watchToBasket);
    }
    basket.totalPrice = basket.products.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);
    localStorage.setItem("basket", JSON.stringify(basket));
    getBasketCount();
  };

  const getWatchesFromBasket = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    let action = {
      type: "GET_WATCHES_FROM_BASKET",
      payload: basket,
    };
    dispatch(action);
  };

  // ! Фиксим Прайсер

  const getPrices = () => {
    fetch(watchesApi)
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => a.price - b.price);
        let max = data[data.length - 1].price;
        let min = data[0].price;
        setMinMax([min, max]);
        setFilterByPrice([min, max]);
      });
  };

  // ! Фиксим кол-во товаров в навбаре
  const getBasketCount = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      basket = {
        products: [],
      };
    }
    let action = {
      type: "GET_BASKET_COUNT",
      payload: basket.products.length,
    };
    dispatch(action);
  };

  React.useEffect(() => {
    getPrices();
    getBasketCount();
  }, []);

  const data = {
    getWatches,
    setSearchWord,
    setFilterByPrice,
    setCurrentPage,
    addWatchToBasket,
    getWatchesFromBasket,
    watches: state.watches,
    minMax,
    searchWord,
    filterByPrice,
    pagesCount,
    currentPage,
    basketWatches: state.basketWatches,
    basketCount: state.basketCount,
  };

  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}

export default ClientProvider;
