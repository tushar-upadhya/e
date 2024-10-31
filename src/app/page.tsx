import banner from "@/assets/banner.jpg";
import LoadingSkeleton from "@/components/loadingSkeleton/LoadingSkeleton";
import Product from "@/components/product/Product";
import { Button } from "@/components/ui/button";
import { delay } from "@/lib/utils";
import { getWixClient } from "@/lib/wix-client.base";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const Home = () => {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <div className="flex items-center bg-secondary md:h-96">
        <div className="space-y-7 p-10 text-center md:w-1/2">
          <h1 className="text-3xl font-bold md:text-4xl">
            Fill the void in your heart
          </h1>
          <p>
            Tough day? Credit card maxed out? Buy some expensive stuff and
            become happy again!
          </p>
          <Button asChild>
            <Link href="/shop">
              Shop Now <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>
        </div>
        <div className="relative hidden h-full w-1/2 md:block">
          <Image
            src={banner}
            alt="Flow Shop banner"
            className="h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-transparent to-transparent" />
        </div>
      </div>
      <Suspense fallback={<LoadingSkeleton />}>
        <FeaturedProducts />
      </Suspense>
    </main>
  );
};

export default Home;

async function FeaturedProducts() {
  await delay(1000);

  const wixClient = getWixClient();
  const { collection } =
    await wixClient.collections.getCollectionBySlug("featured-products");

  if (!collection?._id) {
    return null;
  }

  const featuredProducts = await wixClient.products
    .queryProducts()
    .hasSome("collectionIds", [collection._id])
    .descending("lastUpdated")
    .find();

  if (!featuredProducts.items.length) {
    return null;
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Featured Products</h2>

      <div
        className="flex flex-col sm:grid grid-cols-2
       md:grid-cols-3 lg:grid-cols-4 gap-5"
      >
        {featuredProducts.items.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <pre>{JSON.stringify(featuredProducts, null, 2)}</pre>
    </div>
  );
}
