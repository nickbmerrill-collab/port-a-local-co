import CategoryPage from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/data/categories";
import { getBusinessesByCategory } from "@/data/businesses";

export default function BeachPage() {
  const category = getCategoryBySlug("beach")!;
  const businesses = getBusinessesByCategory("beach");
  return <CategoryPage category={category} businesses={businesses} />;
}
