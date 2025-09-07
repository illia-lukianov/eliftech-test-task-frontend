import { useSelector } from "react-redux";
import Filters from "../../components/Filters/Filters";
import FlowersList from "../../components/FlowersList/FlowersList";
import Hero from "../../components/Hero/Hero";
import { selectSearchQuery } from "../../redux/filters/selectors";
import styles from "./MainPage.module.css";

export default function MainPage() {
  const searchQuery = useSelector(selectSearchQuery);

  return (
    <div>
      <Hero />
      <section className="section">
        <div className="container">
          <h2 className={styles.title}>
            {searchQuery.length > 0
              ? `Search Results for “${searchQuery}”`
              : "Flowers"}
          </h2>
          <Filters flowerType="all" />
          <FlowersList flowerType="all" />
        </div>
      </section>
    </div>
  );
}
