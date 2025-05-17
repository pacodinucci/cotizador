import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen items-center justify-center mt-8">
      {children}
    </div>
  );
};

export default AuthLayout;
