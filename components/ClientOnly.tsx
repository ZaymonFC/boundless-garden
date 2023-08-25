import React from "react";

export function ClientOnly({ children, ...props }: { children: React.ReactNode; props?: any }) {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, [setHasMounted]);

  if (!hasMounted) {
    return null;
  }

  return <div {...props}>{children}</div>;
}
