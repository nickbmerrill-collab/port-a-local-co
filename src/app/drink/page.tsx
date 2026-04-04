import CategoryPage from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/data/categories";
import { getBusinessesByCategory } from "@/data/businesses";

export default function DrinkPage() {
  const category = getCategoryBySlug("drink")!;
  const businesses = getBusinessesByCategory("drink");
  return <CategoryPage category={category} businesses={businesses} />;
}
