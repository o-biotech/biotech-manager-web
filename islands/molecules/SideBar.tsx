import { useEffect, useState } from "preact/hooks";
import { ComponentChildren, JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { classSet } from "@fathym/atomic";
import { Icon } from "@fathym/atomic-icons/browser";
import { MenuIcon } from "$fathym/atomic-icons";
import { OpenBiotechManagerState } from "../../src/OpenBiotechManagerState.tsx";
import { loadOoenBiotechSideBarSettings } from "../../src/eac/loadOpenBiotechSideBarMenuItems.tsx";

export type SideBarMenuItem = {
  Icon: string;

  Name: string;
};

export type SideBarMenuItemSettings = {
  Display?: ComponentChildren;

  Order: number;

  Title?: string;
};

export type SideBarProps = {
  children: ComponentChildren;

  disableToggle?: boolean;

  menuItems: SideBarMenuItem[];

  state: OpenBiotechManagerState;
} & JSX.HTMLAttributes<HTMLDivElement>;

export default function SideBar(props: SideBarProps) {
  const isSideBarClosed = (): boolean => {
    if (!IS_BROWSER) {
      return true;
    } else if (props.disableToggle) {
      return false;
    } else if ("IsSideBarClosed" in localStorage) {
      return JSON.parse(localStorage.IsSideBarClosed);
    } else {
      return true;
    }
  };

  const menuItemsSettings = loadOoenBiotechSideBarSettings(
    props.state,
    props.menuItems.map((menuItem) => menuItem.Name),
  );

  const [isClosed, setIsClosed] = useState(isSideBarClosed());

  const curMenuCheck = props.menuItems.find(
    (mi) => mi.Name === localStorage.SideBarCurrentMenu,
  );

  if (!curMenuCheck) {
    delete localStorage.SideBarCurrentMenu;
  }

  const [currentMenu, setCurrentMenu] = useState(
    localStorage.SideBarCurrentMenu || props.menuItems[0]?.Name || "",
  );

  const [currentMenuSettings, setCurrentMenuSettings] = useState(
    menuItemsSettings[currentMenu],
  );

  const sideBarCloseCheck = (eTarget: HTMLDivElement) => {
    if (!eTarget!.closest(".sidebar-wrapper") && !isSideBarClosed()) {
      toggleMenu();
    }
  };

  const outsideClickHandler = () => {
    const eventHandler = (e: MouseEvent) => {
      sideBarCloseCheck(e.target as HTMLDivElement);
    };

    window.document.addEventListener("click", eventHandler);

    return () => {
      window.document.removeEventListener("click", eventHandler);
    };
  };

  const toggleMenu = () => {
    localStorage.IsSideBarClosed = !isSideBarClosed();

    setIsClosed(isSideBarClosed());
  };

  const selectMenu = (menu: string) => {
    if (localStorage.SideBarCurrentMenu === menu) {
      toggleMenu();
    } else {
      localStorage.SideBarCurrentMenu = menu;

      setCurrentMenu(localStorage.SideBarCurrentMenu);

      setCurrentMenuSettings(
        menuItemsSettings[localStorage.SideBarCurrentMenu],
      );

      if (isClosed) {
        toggleMenu();
      }
    }
  };

  const orderedMenuItems = props.menuItems.sort(
    (a, b) => menuItemsSettings[a.Name].Order - menuItemsSettings[b.Name].Order,
  );

  useEffect(outsideClickHandler, []);

  return (
    <>
      <div
        data-closedstate={isClosed}
        class={classSet(
          [
            "sidebar-wrapper",
            "-:fixed -:z-40 -:transition-all -:data-[closedstate='false']:w-64 -:h-screen -:dark:bg-slate-950 -:bg-slate-100 -:border -:border-collapse -:border-r-[1px] -:border-slate-400 -:dark:border-slate-700 -:text-slate-700 -:dark:text-white -:flex -:flex-row -:shadow-lg -:shadow-slate-500 -:dark:shadow-black",
            props.disableToggle
              ? "-:data-[closedstate='true']:w-64"
              : "-:data-[closedstate='true']:w-12",
          ],
          props,
        )}
      >
        <div class="flex-none pb-[80px] overflow-auto">
          {!props.disableToggle && (
            <div
              onClick={() => toggleMenu()}
              data-current-menu={currentMenu}
              title="Toggle Open"
              class={classSet([
                "mt-2 mx-2 px-1 py-1 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-blue-500 dark:hover:text-blue-500",
                "cursor-pointer rounded-sm",
              ])}
            >
              <MenuIcon class="w-6 h-6" />
            </div>
          )}

          {orderedMenuItems.map((menuItem) => (
            <div
              onClick={() => selectMenu(menuItem.Name)}
              data-menu={menuItem.Name}
              title={menuItem.Name}
              class={classSet([
                "mt-2 mx-2 px-1 py-1 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-blue-500 dark:hover:text-blue-500",
                currentMenu == menuItem.Name
                  ? "bg-blue-700 text-white dark:bg-blue-600"
                  : "",
                "cursor-pointer rounded-sm",
              ])}
            >
              <Icon
                class="w-6 h-6"
                src="/./iconset/icons"
                icon={menuItem.Icon}
              />
            </div>
          ))}
        </div>

        <div
          data-closedstate={isClosed}
          class="flex-1 pt-12 pb-[80px] overflow-auto transition-opacity delay-150 duration-300 ease-out-in px-1 h-screen text-sm data-[closedstate='false']:block data-[closedstate='true']:hidden data-[closedstate='false']:opacity-100 data-[closedstate='true']:opacity-0"
        >
          <div class="mx-2 uppercase text-md">
            {currentMenuSettings?.Title || currentMenu}
          </div>

          <div class="mx-2 border-b-[1px] border-dotted border-slate-400 dark:border-slate-700">
          </div>

          <div class="mx-2">{currentMenuSettings?.Display}</div>
        </div>
      </div>

      <div class={classSet([props.disableToggle ? "ml-64" : "ml-14"])}>
        {props.children}
      </div>
    </>
  );
}
