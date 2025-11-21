import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { navIcons, navLinks } from "@/constants";

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="Logo" />
        <p className="font-bold">Andrew's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name }) => (
            <li key={id}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} alt={`Icon ${id}`} className="icon" />
            </li>
          ))}
        </ul>

        <time>{currentTime.format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
