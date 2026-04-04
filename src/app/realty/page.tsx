import CategoryPage from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/data/categories";
import { getBusinessesByCategory } from "@/data/businesses";

export default function RealtyPage() {
  const category = getCategoryBySlug("realty")!;
  const businesses = getBusinessesByCategory("realty");
  return <CategoryPage category={category} businesses={businesses} />;
}
