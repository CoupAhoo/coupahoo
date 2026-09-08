import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/hold")({
  beforeLoad: () => {
    throw redirect({ to: "/chest" });
  },
});
