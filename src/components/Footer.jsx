import ToggleTheme from "./ToggleTheme";

export default function Footer() {
  return (
    <footer className="sticky bottom-0 flex flex-col items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 font-mono">
      <div className="top-4 right-4 md:top-0 md:right-0">
        <ToggleTheme />
      </div>
      <p className="mb-1">Developed by: @mhthe1</p>
      <ul className="flex space-x-4">
        <SocailLink
          link="https://github.com/MHThe1"
          icon="/icons/github-icon.png"
          platform="GitHub"
        />
        <SocailLink
          link="https://www.linkedin.com/in/mehedi-hasan-tanvir-5507b0228/"
          icon="/icons/linkedin-icon.png"
          platform="LinkedIn"
        />
        <SocailLink
          link="https://instagram.com/mhthe1"
          icon="/icons/instagram-icon.png"
          platform="Instagram"
        />
      </ul>
    </footer>
  );
}

const SocailLink = ({ link, platform, icon }) => {
  return (
    <li className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-125 ease-linear">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={icon} alt={platform} className="w-full h-full" />
      </a>
    </li>
  );
};
