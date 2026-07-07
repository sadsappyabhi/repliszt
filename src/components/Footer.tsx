import forgejoIcon from "../assets/forgejo-padded.svg";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer fixed bottom-0 sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
      <aside className="flex items-center gap-2">
        <p>&#127279;&nbsp;{year} Mocalabs / Abby Figueroa</p>
        <a href="https://git.mocalabs.dev/abby/repliszt" target="_blank">
          <img
            src={forgejoIcon}
            alt="RepLiszt repository on Mocalabs Forgejo"
            className="w-[1.5em] h-[1.5em] align-middle"
          />
        </a>
      </aside>
    </footer>
  );
}
