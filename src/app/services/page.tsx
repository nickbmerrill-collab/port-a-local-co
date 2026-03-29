import CategoryPage from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/data/categories";
import { getBusinessesByCategory } from "@/data/businesses";

export default function ServicesPage() {
  const category = getCategoryBySlug("services")!;
  const businesses = getBusinessesByCategory("services");
  return <CategoryPage category={category} businesses={businesses} />;
}
