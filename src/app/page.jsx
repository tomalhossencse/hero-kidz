import Banner from "@/components/home/Banner";
import Products from "@/components/home/Products";
import Container from "@/components/layouts/Container";
import Text from "@/components/Text";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="space-y-20">
      <Container>
        <Text />
      </Container>
      <Container>{JSON.stringify(session)}</Container>
      <section>
        <Banner />
      </section>

      <section>
        <Products />
      </section>
    </div>
  );
}
