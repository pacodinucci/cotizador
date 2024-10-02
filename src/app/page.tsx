import Cotizador from "@/components/global/cotizador";
import CotizadorSteps from "@/components/global/cotizador-steps";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="md:px-96 bg-gray-100">
      {/* <Cotizador /> */}
      <CotizadorSteps />
    </div>
  );
};

export default Home;
