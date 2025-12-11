import { Toaster as Sonner } from "sonner";

export const Toaster = () => {
  return (
    <Sonner
      position="top-center"
      richColors
      toastOptions={{
        classNames: {
          toast:
            "bg-card text-card-foreground border border-border shadow-lg rounded-lg",
        },
      }}
    />
  );
};

