import React from "react";
import {
  Container,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Slider,
  Pagination,
} from "@mui/material";
import { ClientContext } from "../contexts/ClientProvider";

function MainPage() {
  const {
    getWatches,
    watches,
    setFilterByPrice,
    filterByPrice,
    pagesCount,
    setCurrentPage,
    currentPage,
    addWatchToBasket,
  } = React.useContext(ClientContext);

  React.useEffect(() => {
    getWatches();
  }, [filterByPrice, currentPage]);
  return (
    <div className="main-page">
      <Container>
        <h2>Entire Catalog</h2>
        <div className="filter-block">
          <h4>Filtration by Price</h4>
          <Slider
            max={10000}
            min={0}
            valueLabelDisplay="auto"
            value={filterByPrice}
            onChange={(e, newValue) => setFilterByPrice(newValue)}
          />
        </div>
        <div className="products">
          {watches.map((item) => (
            <Card key={item.id} className="product-card">
              <CardMedia component="img" height={140} image={item.photo} />
              <CardContent>
                <Typography
                  className="product-card-title"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {item.name}
                </Typography>
                <ul className="product-card-ul">
                  <li>
                    <span>Brand:</span>
                    <span>{item.brand}</span>
                  </li>
                  <li>
                    <span>Release date:</span>
                    <span>{item.year}</span>
                  </li>
                  <li>
                    <span>Сountry of produce:</span>
                    <span>{item.country}</span>
                  </li>
                  <li>
                    <span>Price:</span>
                    <span>{item.price}</span>
                  </li>
                </ul>
                <Button
                  onClick={() => addWatchToBasket(item)}
                  variant="outlined"
                >
                  Add to basket
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="pagination-block">
          <Pagination
            count={pagesCount}
            variant="outlined"
            shape="rounded"
            onChange={(_, newValue) => setCurrentPage(newValue)}
          />
        </div>
      </Container>
    </div>
  );
}

export default MainPage;
