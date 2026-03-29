import CategoryPage from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/data/categories";
import { getBusinessesByCategory } from "@/data/businesses";

export default function DoPage() {
  const category = getCategoryBySlug("do")!;
  const businesses = getBusinessesByCategory("do");
  return <CategoryPage category={category} businesses={businesses} />;
}
