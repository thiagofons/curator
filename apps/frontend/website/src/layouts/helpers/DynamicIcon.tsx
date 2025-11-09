import React, { type FC } from "react";
import type { IconType } from "react-icons";
import * as FaIcons from "react-icons/fa6";
// import * as AiIcons from "react-icons/ai";
// import * as BsIcons from "react-icons/bs";
// import * as FiIcons from "react-icons/fi";
// import * as Io5Icons from "react-icons/io5";
// import * as RiIcons from "react-icons/ri";
// import * as TbIcons from "react-icons/tb";
// import * as TfiIcons from "react-icons/tfi";

/** Mapping of icon names to React icon components. */
type IconMap = Record<string, IconType>;

/** Props for the DynamicIcon component. */
interface IDynamicIcon extends React.SVGProps<SVGSVGElement> {
  icon: string;
  className?: string;
}

const iconLibraries: { [key: string]: IconMap } = {
  fa: FaIcons,
};

/**
 * Renders an icon from react-icons dynamically given its name.
 * Currently supports the FontAwesome v6 subset (fa...).
 */
const DynamicIcon: FC<IDynamicIcon> = ({ icon, ...props }) => {
  const IconLibrary = getIconLibrary(icon);
  const Icon = IconLibrary ? IconLibrary[icon] : undefined;

  if (!Icon) {
    return <span className="text-sm">Ícone não econtrado</span>;
  }

  return <Icon {...props} />;
};

/** Returns the icon library map based on the icon prefix (first two letters). */
const getIconLibrary = (icon: string): IconMap | undefined => {
  const libraryKey = icon.substring(0, 2).toLowerCase();

  return iconLibraries[libraryKey];
};

export default DynamicIcon;
