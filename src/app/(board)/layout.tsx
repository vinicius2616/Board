import { Metadata } from "next";
import { Header } from "./header";

export const metadata: Metadata = {
  title: "Board",
};

// export const generateMetadata = async (): Promise<Metadata> => {

//   Requisição http pra pegar algum valor especifico e mostrar no title ou qualquer outra props

//   return {
//     title: 'Teste...'
//   }
// }

export default function BoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[1620px] w-full mx-auto p-10 flex flex-col gap-8 h-dvh">
      <Header />

      {children}
    </div>
  );
}
