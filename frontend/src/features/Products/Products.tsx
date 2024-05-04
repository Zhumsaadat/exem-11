import {Link, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../App/hooks.ts';
import {selectLoadingProducts, selectProducts} from './productsSlice.ts';
import {Card, CardContent, CardMedia, CircularProgress, Grid, styled, Typography} from '@mui/material';
import {useEffect} from 'react';
import {getProducts} from './productsThunks.ts';

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectLoadingProducts);
  const params = useParams();

  useEffect(() => {
    const fetchUrl = async () => {
      await dispatch(getProducts());
    };

    void fetchUrl();
  }, [dispatch]);

  const ImageCardMedia = styled(CardMedia)({
    paddingTop: '80%',
    width: '90%',
    height: 0,
    marginRight: 'auto',
    marginLeft: 'auto'
  });

  const productsCategory = products.filter(product => product.category === params.id);

  return (
    <>
      <Grid sx={{display: "flex", gap: 5}}>
        <Link to="/">All items</Link>
        <Link to="/cars">Cars</Link>
        <Link to="/appliances">Appliances</Link>
        <Link to="/textile">Textile</Link>
        <Link to="/other">Other</Link>
      </Grid>

      <Grid container sx={{display: 'flex', flexDirection: 'row', gap: 3, mt: '20px'}}>
        {!isLoading ? productsCategory.map((elem) => (
          <Grid item key={elem._id} sx={{mr: 'auto', ml: 'auto'}}>
            <Link to={`/product/${elem._id}`}>
              <Card sx={{width: 300}}>
                <CardContent>
                  {elem.image !== null ? <ImageCardMedia image={'http://localhost:8000' + '/' + elem.image}/> : ''}
                  <Typography component="div" sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography gutterBottom variant="h6" component="div">
                      {elem.title}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {elem.price} som
                    </Typography>
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        )) : <CircularProgress />}

        {!isLoading && !params.id ? products.map((elem) => (
          <Grid item key={elem._id} sx={{mr: 'auto', ml: 'auto'}}>
            <Link to={`/product/${elem._id}`}>
              <Card sx={{width: 300}}>
                <CardContent>
                  {elem.image !== null ? <ImageCardMedia image={'http://localhost:8000' + '/' + elem.image}/> : ''}
                  <Typography component="div" sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography gutterBottom variant="h6" component="div">
                      {elem.title}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {elem.price} som
                    </Typography>
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        )) : ''}
      </Grid>
    </>
  );
};

export default Products;