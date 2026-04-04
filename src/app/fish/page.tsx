import CategoryPage from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/data/categories";
import { getBusinessesByCategory } from "@/data/businesses";

export default function FishPage() {
  const category = getCategoryBySlug("fish")!;
  const businesses = getBusinessesByCategory("fish");
  return <CategoryPage category={category} businesses={businesses} />;
}
