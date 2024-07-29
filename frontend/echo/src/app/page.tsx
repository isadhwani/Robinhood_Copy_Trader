// EDIT THIS PAGE, Home Page

'use client'

import Image from "next/image";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
import logo from '@/images/logo-isaac.png'
import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import Navigation from "../components/navigation"
import AnimatedText from "../components/pages/landing-page/typewriter/animatedText";
import CursorBlinker from "../components/pages/landing-page/typewriter/cursorBlinker";



{ /* Navigation Tabs */ }
const navigation = [
  { name: 'Login', href: '/login', current: false },
  { name: 'Sign Up', href: '/signin', current: false },
]

export default function Home() {
  const delay = 1

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      type: "tween",
      delay: delay,
      duration: 2,
      ease: "easeInOut",
      onComplete: () => {
        setDone(true);
      }
    });
    return controls.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [done, setDone] = useState(false);
  const baseText = "";
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest)
  );

  return (
    // <main className="flex min-h-screen flex-col justify-between">
    <>
      <Navigation currentPath={navigation} />

      <div className=" flex flex-col w-full">

        <div className="flex flex-col items-center">
          <img alt="logo" src={`https://gcdnb.pbrd.co/images/74MbLqKX2pSi.png?o=1`} />
          <span>

            <span className="pt-80">
              <AnimatedText text="Crypto Like a Pro." />
            </span>
            <CursorBlinker />
          </span>


        </div>
      </div>
    </>


    // </main >
  );
}