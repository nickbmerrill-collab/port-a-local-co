import CategoryPage from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/data/categories";
import { getBusinessesByCategory } from "@/data/businesses";

export default function EatPage() {
  const category = getCategoryBySlug("eat")!;
  const businesses = getBusinessesByCategory("eat");
  return <CategoryPage category={category} businesses={businesses} />;
}
