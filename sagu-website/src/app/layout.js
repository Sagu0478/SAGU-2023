import "@/styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Provider from "@/contexts/Provider";

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body class="flex flex-col min-h-screen min-w-screen no-scrollbar">
        <Provider>
          <Header />
          <main className="flex-grow pt-[90px] max-w-screen-xl w-full h-full mx-auto">
            {children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;
