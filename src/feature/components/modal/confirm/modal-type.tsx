"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

export function ModalHeadTitle({ title }: { title: string }) {
  return (
    <div
      className={
        "flex h-3/5 w-full items-center justify-center p-4 text-center break-keep"
      }
    >
      {title}
    </div>
  );
}

export function DialogBackDrop() {
  return (
    <motion.div
      className={
        "fixed top-0 left-0 z-9 h-full w-full bg-black/30 backdrop-blur-xs"
      }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    ></motion.div>
  );
}

export function DialogFrame({
  children,
  id,
  isOpen,
}: {
  children: ReactNode;
  id: string;
  isOpen: boolean;
}) {
  return (
    <motion.dialog
      id={id}
      className={
        "-transalte-1/2 fixed top-1/2 left-1/2 z-99 h-1/10 max-h-[145px] min-h-[120px] w-13/20 max-w-[500px] min-w-[200px] cursor-default rounded-[10px] border-[1px] border-[#e6e6e6] bg-white"
      }
      open={isOpen}
      style={{ translateX: "-50%", translateY: "-50%" }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", duration: 0.3 }}
    >
      {children}
    </motion.dialog>
  );
}

export function Button({
  onClick,
  title,
}: {
  onClick?: () => void;
  title: string;
}) {
  return (
    <button
      className={`flex h-full w-1/2 flex-1 cursor-pointer items-center justify-center text-xs text-[#808080]`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export function ButtonBox({ children }: { children: ReactNode }) {
  return (
    <nav className="flex h-2/5 w-full divide-x-[1px] divide-[#e6e6e6] border-t-[1px] border-[#e6e6e6]">
      {children}
    </nav>
  );
}
