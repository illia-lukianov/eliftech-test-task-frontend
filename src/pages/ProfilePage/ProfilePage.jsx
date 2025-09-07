import { useParams } from "react-router-dom";
import Filters from "../../components/Filters/Filters.jsx";
import FlowersList from "../../components/FlowersList/FlowersList.jsx";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation.jsx";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const { recipeType } = useParams();
  const type = recipeType?.toLowerCase();

  return (
    <section className={styles.page}>
      <div className="container">
        <h2 className={styles.title}>My profile</h2>
        <ProfileNavigation />
        <Filters flowerType={type} />
        <FlowersList flowerType={type} />
        <LoadMoreBtn />
      </div>
    </section>
  );
}
