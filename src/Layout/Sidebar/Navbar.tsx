import { useState, useEffect } from "react";
import { IconLogout } from "@tabler/icons-react";
import { Group, Title } from "@mantine/core";
import classes from "./Navbar.module.css";
import logo from "../../Icons/vidyamargamlogo.png";
import { Link, NavLink } from "react-router-dom";
import routes from "../../routes";

export function NavbarSimpleColored() {
  const [active, setActive] = useState("dashboard");

  useEffect(() => {
    setActive(window.location.pathname.replace("/", "").toLowerCase());
  }, []);

  const links = routes.map((item) => item.flag && (
    <NavLink
      className={classes.link}
      data-active={item.segment === active || undefined}
      to={item.ref}
      key={item.segment}
      onClick={(event) => {
        setActive(item.segment ?? "");
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.name}</span>
    </NavLink>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="flex-start">
          <img src={logo} alt="logo" width={40} />
          <Title order={4} variant="gradient">Vidyamargam</Title>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        {/* <Link to={""} className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </Link> */}

        <Link
          to={""}
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
}
