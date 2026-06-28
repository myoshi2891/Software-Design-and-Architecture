import { redirect } from "next/navigation";

/**
 * Redirects the home page to the comprehensive guide.
 *
 * @returns `null` if execution continues past the redirect.
 */
export default function HomePage() {
  redirect("/general/comprehensive-guide");
  return null;
}
