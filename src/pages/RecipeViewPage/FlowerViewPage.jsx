import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FlowerDetails from "../../components/FlowerDetails/FlowerDetails.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import NotFound from "../../components/NotFound/NotFound.jsx";
import { getFlowerDetails } from "../../redux/flowerDetails/operations.js";
import {
  selectFlowerDetails,
  selectFlowerDetailsError,
  selectFlowerDetailsIsLoading,
} from "../../redux/flowerDetails/selectors.js";

export default function RecipeViewPage() {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFlowerDetails(id));
  }, [dispatch, id]);

  const loading = useSelector(selectFlowerDetailsIsLoading);
  const error = useSelector(selectFlowerDetailsError);
  const flower = useSelector(selectFlowerDetails);

  return (
    <>
      {loading && !error && <Loader />}
      {(error || !flower) && !loading && <NotFound />}
      {!loading && !error && flower && <FlowerDetails flower={flower} />}
    </>
  );
}
