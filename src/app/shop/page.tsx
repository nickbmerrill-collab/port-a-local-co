import CategoryPage from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/data/categories";
import { getBusinessesByCategory } from "@/data/businesses";

export default function ShopPage() {
  const category = getCategoryBySlug("shop")!;
  const businesses = getBusinessesByCategory("shop");
  return <CategoryPage category={category} businesses={businesses} />;
}
