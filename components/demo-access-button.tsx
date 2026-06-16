"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "poyraz-ui/atoms";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "poyraz-ui/molecules";
import { AnimatedButton } from "@/components/ui/animated-button";

const DEMO_URL = "https://demo.takeneta.com";
const DEMO_EMAIL = "test@takeneta.com";
const DEMO_PASSWORD = "123456";

type DemoAccessButtonProps = {
  className?: string;
  variant?: "primary" | "outline";
  iconPosition?: "left" | "right";
  onOpen?: () => void;
};

function CredentialRow({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="grid gap-2 rounded-sm border border-border bg-muted/40 p-3 sm:grid-cols-[5.5rem_1fr_auto] sm:items-center">
      <span className="text-xs font-bold uppercase tracking-normal text-muted-foreground">
        {label}
      </span>
      <code className="min-w-0 rounded-sm bg-background px-2.5 py-2 text-sm font-semibold text-foreground">
        {value}
      </code>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onCopy}
        className="justify-center gap-2"
      >
        <Icon
          icon={copied ? "mdi:check" : "mdi:content-copy"}
          className="h-4 w-4"
        />
        {copied ? "Kopyalandı" : "Kopyala"}
      </Button>
    </div>
  );
}

export function DemoAccessButton({
  className,
  variant = "primary",
  iconPosition = "right",
  onOpen,
}: DemoAccessButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<"email" | "password" | "all" | null>(
    null,
  );

  const copyValue = async (
    key: "email" | "password" | "all",
    value: string,
  ) => {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1600);
  };

  const openModal = () => {
    onOpen?.();
    setOpen(true);
  };

  return (
    <>
      <AnimatedButton
        type="button"
        onClick={openModal}
        icon="mdi:chevron-right"
        iconPosition={iconPosition}
        variant={variant}
        className={className}
      >
        Demo&apos;yu Gör
      </AnimatedButton>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent size="lg" className="rounded-sm">
          <ModalHeader>
            <ModalTitle>Neta Demo</ModalTitle>
            <ModalDescription>
              Demo ortamına giriş için test hesabını kullanabilirsin.
            </ModalDescription>
          </ModalHeader>

          <div className="grid gap-3">
            <CredentialRow
              label="E-posta"
              value={DEMO_EMAIL}
              copied={copied === "email"}
              onCopy={() => copyValue("email", DEMO_EMAIL)}
            />
            <CredentialRow
              label="Şifre"
              value={DEMO_PASSWORD}
              copied={copied === "password"}
              onCopy={() => copyValue("password", DEMO_PASSWORD)}
            />
          </div>

          <ModalFooter className="gap-2 sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                copyValue(
                  "all",
                  `Email: ${DEMO_EMAIL}\nŞifre: ${DEMO_PASSWORD}`,
                )
              }
              className="gap-2"
            >
              <Icon
                icon={copied === "all" ? "mdi:check" : "mdi:content-copy"}
                className="h-4 w-4"
              />
              {copied === "all" ? "Bilgiler kopyalandı" : "Bilgileri kopyala"}
            </Button>

            <Button asChild className="gap-2">
              <a href={DEMO_URL} target="_blank" rel="noopener noreferrer">
                Demo&apos;ya git
                <Icon icon="mdi:arrow-top-right" className="h-4 w-4" />
              </a>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
