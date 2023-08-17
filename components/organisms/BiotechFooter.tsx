import { classSet, Footer, FooterProps } from "@fathym/atomic";

export default function BiotechFooter(props: FooterProps) {
  return (
    <Footer
      companyName="Fathym OpenBioTech"
      companyDescription="Deliver BioTech applications with ease, share with the masses."
      class={classSet(props, "![&_a]:text-white")}
      nav={[
        {
          href: "/",
          class: "px-2 py-1 text-gray-400 hover:text-white md:mx-2",
          children: "Home",
        },
        {
          href: "/products",
          class: "px-2 py-1 text-gray-400 hover:text-white md:mx-2",
          children: "Products",
        },
        {
          href: "/services",
          class: "px-2 py-1 text-gray-400 hover:text-white md:mx-2",
          children: "Services",
        },
        {
          href: "/about-us",
          class: "px-2 py-1 text-gray-400 hover:text-white md:mx-2",
          children: "About Us",
        },
        {
          href: "/contact",
          class: "px-2 py-1 text-gray-400 hover:text-white md:mx-2",
          children: "Contact",
        },
      ]}
      {...props}
    />
  );
}
