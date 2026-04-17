import Banner from "@/components/home/Banner";
import Products from "@/components/home/Products";
import Container from "@/components/layouts/Container";

export default function Home() {
  return (
    <div className="space-y-20">
      <section>
        <Banner />
      </section>

      <section>
        <Products />
      </section>
    </div>
  );
}
