import React from "react";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { Auth } from "@supabase/ui";
import { client } from "src/libs/supabase";
import { AuthLayout } from "src/layout/AuthLayout";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <Auth.UserContextProvider supabaseClient={client}>
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      </Auth.UserContextProvider>
    </div>
  );
};

export default MyApp;
