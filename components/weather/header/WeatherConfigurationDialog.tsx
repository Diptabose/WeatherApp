"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Configuration } from "@/components/weather/header/configuration/Configuration";
import { Menu } from "lucide-react";
import { useState } from "react";

export function WeatherConfigurationDialog() {
  const [open, setOpen] = useState<boolean>(false);
  function handleOpen() {
    setOpen((open) => !open);
  }
  return (
    <>
      <Button
        variant="ghost"
        size="icon-lg"
        className="active:scale-90 sm:active:scale-100 transition-transform min-h-11 min-w-11 sm:min-h-0 sm:min-w-0"
        onClick={handleOpen}
      >
        <Menu className="size-5" />
      </Button>
      <Dialog
        open={open}
        onOpenChange={(open, details) => {
          setOpen(open);
        }}
      >
        <DialogTrigger />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configuration</DialogTitle>
            <Configuration />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
