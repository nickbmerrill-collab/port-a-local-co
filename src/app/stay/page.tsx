import CategoryPage from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/data/categories";
import { getBusinessesByCategory } from "@/data/businesses";

export default function StayPage() {
  const category = getCategoryBySlug("stay")!;
  const businesses = getBusinessesByCategory("stay");
  return <CategoryPage category={category} businesses={businesses} />;
}
