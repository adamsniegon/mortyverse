import { permanentRedirect } from "next/navigation";

export default function EpisodesRoot() {
  permanentRedirect(`/episodes/1`);
}
