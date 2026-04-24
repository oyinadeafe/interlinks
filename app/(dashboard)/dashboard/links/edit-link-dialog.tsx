"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Edit3 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateLink } from "./actions";

export function EditLinkDialog({ id, title, url }: { id: string; title: string; url: string }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentUrl, setCurrentUrl] = useState(url);
  const router = useRouter();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const form = e.currentTarget;

    startTransition(async () => {
      const result = await updateLink(id, {}, formData);
      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Link updated");
      setOpen(false);
      router.refresh();
    });
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => setOpen(true)}
        aria-label="Edit link"
      >
        <Edit3 className="h-4 w-4" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit link</DialogTitle>
            <DialogDescription>Update the title or destination URL for this link.</DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor={`edit-title-${id}`}>Title</Label>
              <Input
                id={`edit-title-${id}`}
                name="title"
                value={currentTitle}
                onChange={(event) => setCurrentTitle(event.target.value)}
                required
                maxLength={80}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={`edit-url-${id}`}>URL</Label>
              <Input
                id={`edit-url-${id}`}
                name="url"
                type="url"
                value={currentUrl}
                onChange={(event) => setCurrentUrl(event.target.value)}
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={pending}>
                {pending ? "Saving…" : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
