import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/general/comprehensive-guide");
  return null;
}
