import Container from "../ui/Container.tsx";
import Input from "./Input.tsx";

function Newsletter() {
  return (
    <div class="w-full bg-red-800 lg:h-[70px] lg:p-0  py-2.5">
      <Container class="flex items-center justify-between w-full h-full lg:flex-row flex-col">
        <div class="flex flex gap-2  h-full  lgMax:mb-4 lgMax:text-center">
          <h2 class="font-bold text-white flex items-center">
            CADASTRE-SE E GANHE 10% DE DESCONTO NA SUA PRIMEIRA COMPRA
          </h2>
        </div>
        <form class="flex flex-row items-center gap-2 font-body text-body gap-4  lg:gap-2.5 lg:flex-row lg:w-auto lg:px-0 flex-col w-full px-2.5">
          <Input name="name" placeholder="Nome" />
          <Input name="email" placeholder="Email" />
          <button
            class="h-[37px] px-5 bg-red-900 text-[14px] text-white font-medium uppercase focus:border-none lg:w-auto w-full"
            type="bgutton" // prevent form's default behavior
          >
            Eu Quero
          </button>
        </form>
      </Container>
    </div>
  );
}

export default Newsletter;
